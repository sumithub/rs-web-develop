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
    const emailInput = screen.getByPlaceholderText(/Enter Your Email Address/i);
    const button = screen.getByRole("button", {
      name: /Send Reset Link/i
    });
    fireEvent.change(emailInput, { target: { value: "ana@example.com" } });
    fireEvent.click(button);
    await waitFor(() => {
      const { toast } = require("react-toastify");
      expect(toast.success).toHaveBeenCalledWith(
        "Reset link sent! Check your inbox."
      );
      //   expect(
      //     screen.getByText(/A password reset link has been sent successfully./i)
      //   ).toBeInTheDocument();
      // success message to be finalised and added
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
});
