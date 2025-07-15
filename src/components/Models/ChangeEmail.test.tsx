import "@testing-library/jest-dom";

import AuthContext, { AuthContextType } from "../../contexts/AuthContext";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import API_ENDPOINTS from "../../api/endpoints";
import ChangeEmail from "./ChangeEmail";
import { axiosInstance } from "../../api/axios";
import { changeEmail } from "../../api/authApi";
import { toast } from "react-toastify";

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("../../api/authApi", () => ({
  changeEmail: jest.fn(),
}));
jest.mock("axios", () => ({
  post: jest.fn().mockResolvedValue({ data: {} }),
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

  beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

describe("ChangeEmail Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // All good
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

  // new email is same as current
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

  // API call fails
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

  // invalid email (schema failure)
  it("prevents submission if email is invalid", async () => {
    renderComponent();

    const input = screen.getByPlaceholderText(/Enter Your Email Address/i);
    const submit = screen.getByRole("button", { name: /update email/i });

    fireEvent.change(input, { target: { value: "not-an-email" } });
    fireEvent.click(submit);

    await waitFor(() => {
        expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

  })
  it("should throq 400 error if the email is same as current email", async () => {
    (changeEmail as jest.Mock).mockRejectedValueOnce({
      response: { status: 400, data: { message: "New email must be different or Email is already verified. You cannot change a verified email address." } }
    });
    renderComponent();  

    const input = screen.getByPlaceholderText(/Enter Your Email Address/i);
    const submit = screen.getByRole("button", { name: /update email/i });

    fireEvent.change(input, { target: { value: "awe@gmail.com" } });
    fireEvent.click(submit);

    await waitFor(() => {
      expect(changeEmail).toHaveBeenCalled()
      expect(toast.error).toHaveBeenCalledWith("New email must be different or Email is already verified. You cannot change a verified email address.");
     })
  });
  it("should throw 409 error if the email is already registered", async () => {
    (changeEmail as jest.Mock).mockRejectedValueOnce({
      response: { status: 409, data: { message: "New email already exists" } }
    });
    renderComponent();  

    const input = screen.getByPlaceholderText(/Enter Your Email Address/i);
    const submit = screen.getByRole("button", { name: /update email/i });

    fireEvent.change(input, { target: { value: "awe@gmail.com" } });
    fireEvent.click(submit);

    await waitFor(() => {
      expect(changeEmail).toHaveBeenCalled()
      expect(toast.error).toHaveBeenCalledWith("New email already exists");
     })
  });
  it("should show error if user is not found (404)", async () => {
    (changeEmail as jest.Mock).mockRejectedValueOnce({
      response: {
        status: 404,
        data: {
          message: "User with current email not found"
        }
      }
    });
  
    renderComponent();
  
    const input = screen.getByPlaceholderText(/Enter Your Email Address/i);
    const submit = screen.getByRole("button", { name: /update email/i });
  
    fireEvent.change(input, { target: { value: "awe@gmail.com" } });
    fireEvent.click(submit);
  
    await waitFor(() => {
      expect(changeEmail).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith("User with current email not found");
    });
  });


});




