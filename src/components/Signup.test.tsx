import "@testing-library/jest-dom";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import Signup from "./Signup";

// Needed mocks
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe("Signup - Validation Errors", () => {
  beforeEach(() => {
    render(<Signup />);
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
});
