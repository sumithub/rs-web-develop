import "@testing-library/jest-dom";

import AuthContext, { AuthContextType } from "../contexts/AuthContext";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import Signup from "./Signup";
import { axiosInstance } from "../api/axios";
import { signup } from "../api/authApi";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("axios", () => ({
  post: jest.fn().mockResolvedValue({ data: {} }),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));
jest.mock("axios", () => ({
  post: jest.fn().mockResolvedValue({ data: {} }),
}));
jest.mock("../api/authApi", () => ({
  signup: jest.fn(),
}));

const mockSetEmail = jest.fn();
const mockedAxios = axiosInstance as jest.Mocked<typeof axiosInstance>;
const mockAuthContext: AuthContextType = {
  unVerifiedEmail: "current@example.com",
  setEmail: mockSetEmail,
};
const renderComponent = () =>
  render(
      <AuthContext.Provider value={mockAuthContext}>
      <Signup />
    </AuthContext.Provider>
  );

  beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

describe("Signup - Validation Errors", () => {
  beforeEach(() => {
    renderComponent();
  });

  it("shows error when full name is too short", async () => {
    fireEvent.change(screen.getByPlaceholderText("Enter Your Full Name"), {
      target: { value: "J" },
    });
    fireEvent.blur(screen.getByPlaceholderText("Enter Your Full Name"));

    await waitFor(() =>
      expect(screen.getByText(/full name must be at least 3 characters/i)).toBeInTheDocument()
    );
  });

  it("shows error when email is invalid", async () => {
    fireEvent.change(screen.getByPlaceholderText("Enter Your Email Address"), {
      target: { value: "invalid-email" },
    });
    fireEvent.blur(screen.getByPlaceholderText("Enter Your Email Address"));

    await waitFor(() =>
      expect(screen.getByText(/valid email address/i)).toBeInTheDocument()
    );
  });

  it("shows error when password does not meet criteria", async () => {
    fireEvent.change(screen.getByPlaceholderText("Create A Password"), {
      target: { value: "123" },
    });
    fireEvent.blur(screen.getByPlaceholderText("Create A Password"));

    await waitFor(() =>
      expect(
        screen.getByText(/password must be at least 8 characters/i)
      ).toBeInTheDocument()
    );
  });

  it("shows error when terms checkbox is not checked", async () => {
    fireEvent.change(screen.getByPlaceholderText("Enter Your Full Name"), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter Your Email Address"), {
      target: { value: "jane@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Create A Password"), {
      target: { value: "StrongPass@1" },
    });

    fireEvent.click(screen.getByRole("button", { name: /create account/i }));

    await waitFor(() =>
      expect(
        screen.getByText(/you must accept the terms/i)
      ).toBeInTheDocument()
    );
  });
  it("should throw 400 error if the user already exists", async () => {
    (signup as jest.Mock).mockRejectedValueOnce({
      response: { status: 400, data: { message: "User already exists" } }
      });
    const nameInput = screen.getByPlaceholderText("Enter Your Full Name");
    const emailInput = screen.getByPlaceholderText("Enter Your Email Address");
    const passwordInput = screen.getByPlaceholderText("Create A Password");
    const checkbox = screen.getByRole("checkbox");
    const button = screen.getByRole("button", { name: /Create Account/i });
    fireEvent.change(nameInput, { target: { value: "Ana Maria" } });
    fireEvent.change(emailInput, { target: { value: "ana@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "Passw0rd@" } });
    fireEvent.click(checkbox);
    fireEvent.click(button);
    // Check if the mocked axios post was called with the correct endpoint and data
    await waitFor(() => {
    expect(screen.getByText(/User already exists/i)).toBeInTheDocument();
   })
})
it("should throw 401 error if we hit the wrong api", async () => {
  (signup as jest.Mock).mockRejectedValueOnce({
    response: { status: 400, data: { message: "Unauthorized" } }
    });
  const nameInput = screen.getByPlaceholderText("Enter Your Full Name");
  const emailInput = screen.getByPlaceholderText("Enter Your Email Address");
  const passwordInput = screen.getByPlaceholderText("Create A Password");
  const checkbox = screen.getByRole("checkbox");
  const button = screen.getByRole("button", { name: /Create Account/i });
  fireEvent.change(nameInput, { target: { value: "Ana Maria" } });
  fireEvent.change(emailInput, { target: { value: "ana@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "Passw0rd@" } });
  fireEvent.click(checkbox);
  fireEvent.click(button);
  // Check if the mocked axios post was called with the correct endpoint and data
  await waitFor(() => {
  expect(screen.getByText(/Unauthorized/i)).toBeInTheDocument();
 })
})
it("should update context with email after successful signup", async () => {
 
  const mockEmail = "ana@example.com";

  // Mock the API response
  (signup as jest.Mock).mockResolvedValueOnce({
    mockVerificationLink: "http://localhost/verify", // optional
  });

  const nameInput = screen.getByPlaceholderText("Enter Your Full Name");
    const emailInput = screen.getByPlaceholderText("Enter Your Email Address");
    const passwordInput = screen.getByPlaceholderText("Create A Password");
    const checkbox = screen.getByRole("checkbox");
    const button = screen.getByRole("button", { name: /Create Account/i });
    fireEvent.change(nameInput, { target: { value: "Ana Maria" } });
    fireEvent.change(emailInput, { target: { value: "ana@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "Passw0rd@" } });
    fireEvent.click(checkbox);
    fireEvent.click(button);

  // Wait for async form submit to resolve
  await waitFor(() => {
    expect(signup).toHaveBeenCalled();
    expect(mockSetEmail).toHaveBeenCalledWith(mockEmail);
  });
})
it("should throw 403 error if user is not allowed to register", async () => {
  (signup as jest.Mock).mockRejectedValueOnce({
    response: {
      status: 403,
      data: { message: "Unauthorised" },
    },
  });

  const nameInput = screen.getByPlaceholderText("Enter Your Full Name");
  const emailInput = screen.getByPlaceholderText("Enter Your Email Address");
  const passwordInput = screen.getByPlaceholderText("Create A Password");
  const checkbox = screen.getByRole("checkbox");
  const button = screen.getByRole("button", { name: /Create Account/i });

  fireEvent.change(nameInput, { target: { value: "Ana Maria" } });
  fireEvent.change(emailInput, { target: { value: "ana@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "Passw0rd@" } });
  fireEvent.click(checkbox);
  fireEvent.click(button);

  await waitFor(() => {
    expect(screen.getByText(/Unauthorised/i)).toBeInTheDocument();
  });
});

})
