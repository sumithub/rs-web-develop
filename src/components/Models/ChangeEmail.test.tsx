import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ChangeEmail from "./ChangeEmail";
import AuthContext, { AuthContextType } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { changeEmail } from "../../api/authApi";

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("../../api/authApi", () => ({
  changeEmail: jest.fn(),
}));

const mockSetEmail = jest.fn();
const mockOnClose = jest.fn();

const mockAuthContext: AuthContextType = {
  unVerifiedEmail: "current@example.com",
  setEmail: mockSetEmail,
};

const renderComponent = () =>
  render(
      <AuthContext.Provider value={mockAuthContext}>
      <ChangeEmail onClose={mockOnClose} id="test-id" />
    </AuthContext.Provider>
  );

describe("ChangeEmail Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ✅ Happy Path
  it("successfully submits with a valid new email", async () => {
    (changeEmail as jest.Mock).mockResolvedValueOnce({
      mockVerificationLink: "http://mock-link.com",
    });

    renderComponent();

    const input = screen.getByPlaceholderText(/Enter Your Email Address/i);
    const submit = screen.getByRole("button", { name: /update email/i });

    fireEvent.change(input, { target: { value: "new@example.com" } });
    fireEvent.click(submit);

    await waitFor(() => {
      expect(changeEmail).toHaveBeenCalledWith({
        currentEmail: "current@example.com",
        newEmail: "new@example.com",
      });

      expect(localStorage.getItem("mockVerificationLink")).toBe("http://mock-link.com");
      expect(toast.success).toHaveBeenCalledWith(expect.stringContaining("Email updated"));
      expect(mockSetEmail).toHaveBeenCalledWith("new@example.com");
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  // ❌ Unhappy: new email is same as current
  it("shows error if new email is same as current", async () => {
    renderComponent();
    const input = screen.getByPlaceholderText(/Enter Your Email Address/i);
    const submit = screen.getByRole("button", { name: /update email/i });

    fireEvent.change(input, { target: { value: "current@example.com" } });
    fireEvent.click(submit);

    await waitFor(() => {
      expect(changeEmail).not.toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith("This is your current email. Please enter a different one.");
    });
  });

  // ❌ Unhappy: API call fails
  it("shows error if API throws", async () => {
    (changeEmail as jest.Mock).mockRejectedValueOnce({
      response: { data: { message: "Something went wrong" } },
    });

    renderComponent();

    const input = screen.getByPlaceholderText(/Enter Your Email Address/i);
    const submit = screen.getByRole("button", { name: /update email/i });

    fireEvent.change(input, { target: { value: "error@example.com" } });
    fireEvent.click(submit);

    await waitFor(() => {
      expect(changeEmail).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith("Something went wrong");
    });
  });

  // ❌ Unhappy: invalid email (schema failure)
  it("prevents submission if email is invalid", async () => {
    renderComponent();

    const input = screen.getByPlaceholderText(/Enter Your Email Address/i);
    const submit = screen.getByRole("button", { name: /update email/i });

    fireEvent.change(input, { target: { value: "not-an-email" } });
    fireEvent.click(submit);

    await waitFor(() => {
        expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

  });
});


