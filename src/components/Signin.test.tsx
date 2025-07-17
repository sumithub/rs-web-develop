const mockPush = jest.fn();

import "@testing-library/jest-dom";

import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";

import Signin from "./Signin";
import { login } from "../api/authApi";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush
  })
}));
jest.mock("../api/authApi", () => ({
  login: jest.fn()
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

describe("Signin - Validation Errors", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    render(<Signin />);
  });

  it("should render the Signin component correctly", async () => {
    await expect(
      screen.findByText(/Login To Your Account/i)
    ).resolves.toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Enter Your Email Address/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Create A Password/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
  });

  it("shows error when email is invalid", async () => {
    fireEvent.change(screen.getByPlaceholderText("Enter Your Email Address"), {
      target: { value: "invalid-email" }
    });
    fireEvent.blur(screen.getByPlaceholderText("Enter Your Email Address"));

    await waitFor(() =>
      expect(screen.getByText(/valid email address/i)).toBeInTheDocument()
    );
  });

  it("shows error when password does not meet criteria", async () => {
    fireEvent.change(screen.getByPlaceholderText("Create A Password"), {
      target: { value: "123" }
    });
    fireEvent.blur(screen.getByPlaceholderText("Create A Password"));

    await waitFor(() =>
      expect(
        screen.getByText(/password must be at least 8 characters/i)
      ).toBeInTheDocument()
    );
  });

  it("should throw 401 error if user enter wrong credentials", async () => {
    (login as jest.Mock).mockRejectedValueOnce({
      response: {
        status: 401,
        data: { message: "Invalid username or password" }
      }
    });
    const emailInput = screen.getByPlaceholderText("Enter Your Email Address");
    const passwordInput = screen.getByPlaceholderText("Create A Password");
    // const checkbox = screen.getByRole("checkbox");
    const button = screen.getByRole("button", { name: /login/i });
    fireEvent.change(emailInput, { target: { value: "ana@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "Passw0rd@" } });
    // fireEvent.click(checkbox);
    fireEvent.click(button);
    // Check if the mocked axios post was called with the correct endpoint and data
    await waitFor(() => {
      // Check that toast.error was called with the correct message
      const { toast } = require("react-toastify");
      expect(toast.error).toHaveBeenCalledWith("Invalid username or password");
    });
  });
});
