import "@testing-library/jest-dom";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import AuthContext, { AuthContextType } from "../contexts/AuthContext";
import VerificationEmailClient from "./VerificationEmailClient";
import { axiosInstance } from "../api/axios";
import { resendEmailVerification } from "../api/authApi";
import API_ENDPOINTS from "../api/endpoints";

const mockedAxios = axiosInstance as jest.Mocked<typeof axiosInstance>;


jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: jest.fn(() => "/mocked-path"),
    useSearchParams: jest.fn(() => new URLSearchParams("status=active")),
  
}));
const mockSetEmail = jest.fn();
const mockAuthContext: AuthContextType = {
  unVerifiedEmail: "current@example.com",
  setEmail: mockSetEmail,
};
const mockResponseData = 
"Verification email sent successfully"
const mockFormData = {  email: "Ex@ge.com.au" };
const invalidMockFormData = { email: "invalid-email" };
jest.mock("axios", () => ({
  post: jest.fn().mockResolvedValue({ data: {} }),
}));

const renderComponent = () =>
  render(
      <AuthContext.Provider value={mockAuthContext}>
      <VerificationEmailClient />
    </AuthContext.Provider>
  );

describe("Verification Email Client - Validation Errors", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
it("should send a verification email and return the parsed response", async () => {
    // Mock axios POST to return the success message
    mockedAxios.post.mockResolvedValueOnce({ data: mockResponseData });

    const result = await resendEmailVerification(mockFormData);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      API_ENDPOINTS.resendEmail,
      mockFormData
    );
    expect(result).toEqual(mockResponseData);
  });
  it("should throw a 400 error for invalid email address", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      response: { status: 400, data: { message: "Invalid email provided" } }
  });

    await expect(resendEmailVerification(invalidMockFormData)).rejects.toThrow(
        	"Invalid email provided"
    );

    // Assertions
    expect(axiosInstance.post).toHaveBeenCalledWith(
        API_ENDPOINTS.resendEmail,
        invalidMockFormData
    );
});
  
it("should start with timer at 60 and button disabled", () => {
  renderComponent();
  expect(screen.getByText(/00.60|01.00/)).toBeInTheDocument(); // seconds format may vary
  expect(
    screen.getByRole("button", { name: /resend verification email/i })
  ).toBeDisabled();
});
  it("should reset timer and button state when resend is clicked", async () => {
    renderComponent();
    const button = screen.getByRole("button", {
      name: /resend verification email/i,
    });

    fireEvent.click(button);

    expect(screen.getByText(/00.59|01.00/)).toBeInTheDocument(); // Timer should reset to 59 seconds
    expect(button).toBeDisabled(); // Button should remain disabled
  });
it("should handle network or server errors gracefully ", async () => {
    // Mock axios throwing an error
    (axiosInstance.post as jest.Mock).mockRejectedValueOnce(new Error("Network Error"));
    await expect(resendEmailVerification(mockFormData)).rejects.toThrow(
        "Network Error"
    );
    // Assertions
    expect(axiosInstance.post).toHaveBeenCalledWith(
        API_ENDPOINTS.resendEmail,
        mockFormData
    );

}); 
});










