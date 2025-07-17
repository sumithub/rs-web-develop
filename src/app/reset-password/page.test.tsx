const mockPush = jest.fn();

import "@testing-library/jest-dom";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import ResetPasswordPage from "./page";
import { resetPassword } from "../../api/authApi";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush
  }),
  usePathname: jest.fn(() => "/reset-password"),
  useSearchParams: jest.fn(() => new URLSearchParams("status=active"))
}));
jest.mock("../../api/authApi", () => ({
  resetPassword: jest.fn()
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

describe("ResetPassword - Validation Errors", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<ResetPasswordPage />);
  });
  it("renders form fields correctly", () => {
    const headings = screen.getAllByText(/Reset Password/i);
    expect(headings[0]).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Create A Password/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Enter Confirm Password/i)
    ).toBeInTheDocument();
  });
  it("should work correctly with valid password", async () => {
    const password = screen.getByPlaceholderText(/Create A Password/i);
    const confirmPassword = screen.getByPlaceholderText(
      /Enter Confirm Password/i
    );
    const button = screen.getByRole("button", {
      name: /Reset Password/i
    });
    fireEvent.change(password, { target: { value: "aRtest123#$" } });
    fireEvent.change(confirmPassword, {
      target: { value: "aRtest123#$" }
    });
    fireEvent.click(button);
    await waitFor(() => {
      const { toast } = require("react-toastify");
      expect(toast.success).toHaveBeenCalledWith(
        "Your password has been successfully reset!"
      );
      expect(
        screen.getByText(/Your password has been successfully reset!/i)
      ).toBeInTheDocument();
    });
  });
  it("should show error for password mistmatch", async () => {
    const password = screen.getByPlaceholderText(/Create A Password/i);
    const confirmPassword = screen.getByPlaceholderText(
      /Enter Confirm Password/i
    );
    const button = screen.getByRole("button", {
      name: /Reset Password/i
    });
    fireEvent.change(password, { target: { value: "aRtest123#$" } });
    fireEvent.change(confirmPassword, {
      target: { value: "aRtest123#" }
    });
    fireEvent.click(button);
    await waitFor(() => {
      expect(
        screen.findByText(/Passwords do not match/i)
      ).resolves.toBeInTheDocument();
    });
  });
  it("should throw 400 error for invalid or expired token", async () => {
    (resetPassword as jest.Mock).mockRejectedValueOnce({
      response: {
        status: 400,
        data: { message: "Invalid or expired token" }
      }
    });
    const password = screen.getByPlaceholderText(/Create A Password/i);
    const confirmPassword = screen.getByPlaceholderText(
      /Enter Confirm Password/i
    );
    const button = screen.getByRole("button", {
      name: /Reset Password/i
    });
    fireEvent.change(password, { target: { value: "aRtest123#$" } });
    fireEvent.change(confirmPassword, {
      target: { value: "aRtest123#$" }
    });
    fireEvent.click(button);
    await waitFor(() => {
      const { toast } = require("react-toastify");
      expect(toast.error).toHaveBeenCalledWith("Invalid or expired token");
    });
  });
  it("should throw 404 error for token not found", async () => {
    (resetPassword as jest.Mock).mockRejectedValueOnce({
      response: {
        status: 404,
        data: { message: "Token not found" }
      }
    });
    const password = screen.getByPlaceholderText(/Create A Password/i);
    const confirmPassword = screen.getByPlaceholderText(
      /Enter Confirm Password/i
    );
    const button = screen.getByRole("button", {
      name: /Reset Password/i
    });
    fireEvent.change(password, { target: { value: "aRtest123#$" } });
    fireEvent.change(confirmPassword, {
      target: { value: "aRtest123#$" }
    });
    fireEvent.click(button);
    await waitFor(() => {
      const { toast } = require("react-toastify");
      expect(toast.error).toHaveBeenCalledWith("Token not found");
    });
  });
});
