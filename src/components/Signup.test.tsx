// __tests__/Signup.test.tsx
import "@testing-library/jest-dom";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import Signup from "./Signup";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

// Mocks
jest.mock("axios");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
  },
}));

describe("Signup (Happy Path)", () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    jest.clearAllMocks();
  });

  it("submits the form with valid data and navigates to verification page", async () => {
    (axios.post as jest.Mock).mockResolvedValue({ data: { success: true } });

    render(<Signup />);

    fireEvent.change(screen.getByPlaceholderText("Enter Your Full Name"), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter Your Email Address"), {
      target: { value: "jane@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Create A Password"), {
      target: { value: "StrongPass@1" },
    });

    const checkbox = screen.getByLabelText(/I Agree To The/i);
    fireEvent.click(checkbox);

    fireEvent.click(screen.getByRole("button", { name: /create account/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:8080/api/users/register',
        expect.objectContaining({
          name: "Jane Doe",
          email: "jane@example.com",
          password: "StrongPass@1",
          termsAccepted: true,
        })
      );

      expect(toast.success).toHaveBeenCalledWith(
        "Account created! Please check your email to verify your account."
      );

      expect(pushMock).toHaveBeenCalledWith("/verification-email");
    });
  });
});
