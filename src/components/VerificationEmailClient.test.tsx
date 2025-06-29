import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import React from "react";
import VerificationEmailClient from "./VerificationEmailClient";
import axios from "axios";

const mockUseSearchParams = jest.fn();

jest.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(""),
  usePathname: () => "/",
}));

describe("VerificationEmailClient", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    mockUseSearchParams.mockReturnValue(new URLSearchParams("")); // default case
  });

  it("renders the success block and resend button", () => {
    localStorage.setItem("mockVerificationLink", "https://mock-link.com");
    render(<VerificationEmailClient />);
    expect(screen.getByText(/verification email sent/i)).toBeInTheDocument();
    expect(screen.getByText(/Resend Verification Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Click here to verify/i)).toBeInTheDocument();
  });

  /* TODO mock issue to be fixed
  it("renders expired message when status is expired", () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams("?status=expired")); // override here

    render(<VerificationEmailClient />);
    expect(screen.getByText(/Verification Link Issue/i)).toBeInTheDocument();
    expect(screen.getByText(/Expired Token/i)).toBeInTheDocument();
  });

  it("calls resend API when button is clicked", async () => {
    mockAxios.put.mockResolvedValueOnce({ data: {} });
    mockUseSearchParams.mockReturnValue(new URLSearchParams(""));

    render(<VerificationEmailClient />);
    const button = screen.getByRole("button", { name: /resend verification email/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockAxios.put).toHaveBeenCalledWith("/api", expect.anything());
    });
  });
  */
});

