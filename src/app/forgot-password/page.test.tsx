const mockPush = jest.fn();

import "@testing-library/jest-dom";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import ForgotPassword from "./page";
import { forgotPassword } from "../../api/authApi";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush
  }),
  usePathname: jest.fn(() => "/forgot-password")
}));
jest.mock("../../api/authApi", () => ({
  forgotPassword: jest.fn()
}));

jest.mock("axios", () => ({
  post: jest.fn().mockResolvedValue({ data: {} })
}));

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn()
  }
}));

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

describe("ForgotPassword - Validation Errors", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    render(<ForgotPassword />);
  });
  it("renders form fields correctly", () => {
    expect(screen.getByText(/Forgot password/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Enter Your Email Address/i)
    ).toBeInTheDocument();
  });
  it("should work correctly with valid email", async () => {
    (forgotPassword as jest.Mock).mockResolvedValueOnce({
    message: "Password reset link has been sent to your email."
  });
    const emailInput = screen.getByPlaceholderText(/Enter Your Email Address/i);
    const button = screen.getByRole("button", {
      name: /Send Reset Link/i
    });
    fireEvent.change(emailInput, { target: { value: "ana@example.com" } });
    fireEvent.click(button);
    await waitFor(() => {
      const { toast } = require("react-toastify");
      expect(toast.success).toHaveBeenCalledWith(
        "Password reset link has been sent to your email."
      );
    });
  });
  it("should show error for invalid email", async () => {
    const emailInput = screen.getByPlaceholderText(/Enter Your Email Address/i);
    const button = screen.getByRole("button", {
      name: /Send Reset Link/i
    });
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.getByText(/valid email address/i)).toBeInTheDocument();
    });
  });
  it("should throw 404 error if user enter wrong credentials", async () => {
    (forgotPassword as jest.Mock).mockRejectedValueOnce({
      response: {
        status: 404,
        data: { message: "Email not registered" }
      }
    });
    const emailInput = screen.getByPlaceholderText("Enter Your Email Address");
    const button = screen.getByRole("button", { name: /Send Reset Link/i });
    fireEvent.change(emailInput, { target: { value: "ana@example.com" } });
    fireEvent.click(button);
    await waitFor(() => {
      const { toast } = require("react-toastify");
      expect(toast.error).toHaveBeenCalledWith("Email not registered");
    });
  });
  it("should show 429 error if user submits more than 3 times for the same email in 10 minutes", async () => {
  // Mock the API: first 3 calls resolve, 4th call rejects with 429
  (forgotPassword as jest.Mock)
    .mockResolvedValueOnce({ message: "OK" })
    .mockResolvedValueOnce({ message: "OK" })
    .mockResolvedValueOnce({ message: "OK" })
    .mockRejectedValueOnce({
      response: {
        status: 429,
        data: { message: "Too many requests, please try again later." }
      }
    });

  const emailInput = screen.getByPlaceholderText("Enter Your Email Address");
  const button = screen.getByRole("button", { name: /Send Reset Link/i });

  // Simulate 4 submissions with the same email
  for (let i = 0; i < 4; i++) {
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.click(button);
  }

  await waitFor(() => {
    expect(
      screen.getByText(/too many requests, please try again later/i)
    ).toBeInTheDocument();
  });
});
});
