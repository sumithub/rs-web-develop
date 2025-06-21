import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Signup from "../components/Signup";
import "@testing-library/jest-dom";
import axios from "axios";

describe("Full name input field - valid scenarios", () => {
  beforeEach(() => {
    render(<Signup />);
  });

  test("accepts exactly 3 characters", async () => {
    const nameInput = screen.getByPlaceholderText("Enter Your Full Name");
    fireEvent.change(nameInput, { target: { value: "Ana" } });
    expect(nameInput).toHaveValue("Ana");
  });
  test("accepts longer valid name", async () => {
    const nameInput = screen.getByPlaceholderText("Enter Your Full Name");
    fireEvent.change(nameInput, { target: { value: "Johnny" } });
    expect(nameInput).toHaveValue("Johnny");
  });
  test("accepts name with spaces", async () => {
    const nameInput = screen.getByPlaceholderText("Enter Your Full Name");
    fireEvent.change(nameInput, { target: { value: "Ana Maria" } });
    expect(nameInput).toHaveValue("Ana Maria");
  });
  test("accepts name with hyphen", async () => {
    const nameInput = screen.getByPlaceholderText("Enter Your Full Name");
    fireEvent.change(nameInput, { target: { value: "Ana-Maria" } });
    expect(nameInput).toHaveValue("Ana-Maria");
  });
  test("accepts name with apostrophe", async () => {
    const nameInput = screen.getByPlaceholderText("Enter Your Full Name");
    fireEvent.change(nameInput, { target: { value: "Ana-Marie O'Connor" } });
    expect(nameInput).toHaveValue("Ana-Marie O'Connor");
  });
  test("accepts name with accented characters", async () => {
    const nameInput = screen.getByPlaceholderText("Enter Your Full Name");
    fireEvent.change(nameInput, { target: { value: "Ana María" } });
    expect(nameInput).toHaveValue("Ana María");
  });
  test("accepts name with umlauts", async () => {
    const nameInput = screen.getByPlaceholderText("Enter Your Full Name");
    fireEvent.change(nameInput, { target: { value: "Ana Müller" } });
    expect(nameInput).toHaveValue("Ana Müller");
  });
  test("accepts name with capital and small letters", async () => {
    const nameInput = screen.getByPlaceholderText("Enter Your Full Name");
    fireEvent.change(nameInput, { target: { value: "Ana Maria" } });
    expect(nameInput).toHaveValue("Ana Maria");
  });
});
describe("Full name input field - invalid scenarios", () => {
  beforeEach(() => {
    render(<Signup />);
  });
  test("rejects names with less than 3 characters", async () => {
    const nameInput = screen.getByPlaceholderText("Enter Your Full Name");
    fireEvent.change(nameInput, { target: { value: "An" } });
    expect(nameInput).toHaveValue("An");
    fireEvent.blur(nameInput);

    const buttonName = screen.getByRole("button", { name: /Create Account/i });
    fireEvent.click(buttonName);
    const error = await screen.findByText(/at least 3 characters/i); // partial match is safer
    expect(error).toBeInTheDocument();
  });
  test("rejects names with more than 2 consecutive spaces", async () => {
    const nameInput = screen.getByPlaceholderText("Enter Your Full Name");
    fireEvent.change(nameInput, { target: { value: "Ana   Maria" } });
    expect(nameInput).toHaveValue("Ana   Maria");
    const buttonName = screen.getByRole("button", {
      name: /Create Account/i
    });
    fireEvent.click(buttonName);
    const errorMessage = await screen.findByText(
      "Please enter a valid name (letters only)"
    );
    expect(errorMessage).toBeInTheDocument();
  });
  test("rejects names with numbers", async () => {
    const nameInput = screen.getByPlaceholderText("Enter Your Full Name");
    fireEvent.change(nameInput, { target: { value: "Ana123" } });
    expect(nameInput).toHaveValue("Ana123");
    const buttonName = screen.getByRole("button", {
      name: /Create Account/i
    });
    fireEvent.click(buttonName);
    const errorMessage = await screen.findByText(
      "Please enter a valid name (letters only)"
    );
    expect(errorMessage).toBeInTheDocument();
  });
  test("rejects names with special characters", async () => {
    const nameInput = screen.getByPlaceholderText("Enter Your Full Name");
    fireEvent.change(nameInput, { target: { value: "Ana@Maria" } });
    expect(nameInput).toHaveValue("Ana@Maria");
    const buttonName = screen.getByRole("button", {
      name: /Create Account/i
    });
    fireEvent.click(buttonName);
    const errorMessage = await screen.findByText(
      "Please enter a valid name (letters only)"
    );
    expect(errorMessage).toBeInTheDocument();
  });
  test("rejects names with only spaces", async () => {
    const nameInput = screen.getByPlaceholderText("Enter Your Full Name");
    fireEvent.change(nameInput, { target: { value: "   " } });
    expect(nameInput).toHaveValue("   ");
    const buttonName = screen.getByRole("button", {
      name: /Create Account/i
    });
    fireEvent.click(buttonName);
    const errorMessage = await screen.findByText(
      "Please enter a valid name (letters only)"
    );
    expect(errorMessage).toBeInTheDocument();
  });
  test("rejects names with only hyphens", async () => {
    const nameInput = screen.getByPlaceholderText("Enter Your Full Name");
    fireEvent.change(nameInput, { target: { value: "---" } });
    expect(nameInput).toHaveValue("---");
    const buttonName = screen.getByRole("button", {
      name: /Create Account/i
    });
    fireEvent.click(buttonName);
    const errorMessage = await screen.findByText(
      "Please enter a valid name (letters only)"
    );
    expect(errorMessage).toBeInTheDocument();
  });
});

describe("Email input field - valid scenarios", () => {
  beforeEach(() => {
    render(<Signup />);
  });
  const validEmails = [
    "test@gmail.com",
    "first.last@gmail.com",
    "test+alisas@gmail.com",
    "user@example.co.in",
    "user.name@Example.com"
  ];
  validEmails.forEach((email) => {
    test(`accepts valid email: ${email}`, async () => {
      const emailInput = screen.getByPlaceholderText(
        "Enter Your Email Address"
      );
      fireEvent.change(emailInput, { target: { value: email } });
      expect(emailInput).toHaveValue(email);
      const buttonName = screen.getByRole("button", {
        name: /Create Account/i
      });
      fireEvent.click(buttonName);
      await waitFor(() => {
        expect(screen.queryByText(/valid email/i)).not.toBeInTheDocument();
      });
    });
  });
});
describe("Email input field - invalid scenarios", () => {
  beforeEach(() => {
    render(<Signup />);
  });
  const invalidEmails = [
    "testexample.com",
    "test@",
    "@example.com",
    "test@examplecom",
    "test@example.",
    "test@@example.com",
    "test @example.com",
    "te!st@example.com",
    "test%example@gmail.com"
  ];
  invalidEmails.forEach((email) => {
    test(`accepts valid email: ${email}`, async () => {
      const emailInput = screen.getByPlaceholderText(
        "Enter Your Email Address"
      );
      fireEvent.change(emailInput, { target: { value: email } });
      expect(emailInput).toHaveValue(email);
      const buttonName = screen.getByRole("button", {
        name: /Create Account/i
      });
      fireEvent.click(buttonName);
      const errorMessage = await screen.findByText(
        "Please enter a valid email address."
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
describe("Password input field - valid scenarios", () => {
  beforeEach(() => {
    render(<Signup />);
  });
  const validPasswords = [
    "Passw0rd!",
    "MyStr0ngPassword!With$Lots#Of%Characters12345",
    "P1@ssw2#or3$d!"
  ];
  validPasswords.forEach((password) => {
    test(`accepts valid password: ${password}`, async () => {
      const passwordInput = screen.getByPlaceholderText("Create A Password");
      fireEvent.change(passwordInput, { target: { value: password } });
      expect(passwordInput).toHaveValue(password);
    });
  });
});
describe("Password input field - invalid scenarios", () => {
  beforeEach(() => {
    render(<Signup />);
  });
  const invalidPasswords = [
    "password",
    "12345678",
    "abcdefgh@1",
    "abcdefghP",
    "(*(*&&^&*&&**",
    "P@ssw0r",
    "P@ASSSWPRD1",
    "P@ssword!",
    "  Passw0rd!  ",
    "Ps@32",
    " "
  ];
  invalidPasswords.forEach((password) => {
    test(`rejects invalid password: ${password}`, async () => {
      const passwordInput = screen.getByPlaceholderText("Create A Password");
      fireEvent.change(passwordInput, { target: { value: password } });
      expect(passwordInput).toHaveValue(password);
      const buttonName = screen.getByRole("button", {
        name: /Create Account/i
      });
      fireEvent.click(buttonName);
      const errorMessage = await screen.findByText(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });
});

describe("Terms and Conditions checkbox", () => {
  beforeEach(() => {
    render(<Signup />);
  });
  test("Checkbox is unchecked by default", () => {
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });
  test("Checkbox can be checked and unchecked", () => {
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
  test("Checkbox shows error when not checked on form submission", async () => {
    const button = screen.getByRole("button", { name: /Create Account/i });
    fireEvent.click(button);
    const errorMessage = await screen.findByText(
      "You must agree to the terms and conditions to proceed."
    );
    expect(errorMessage).toBeInTheDocument();
  });
  test("Checkbox error disappears when checked", async () => {
    const button = screen.getByRole("button", { name: /Create Account/i });
    fireEvent.click(button);
    const errorMessage = await screen.findByText(
      "You must agree to the terms and conditions to proceed."
    );
    expect(errorMessage).toBeInTheDocument();

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    await waitFor(() => {
      expect(
        screen.queryByText(
          "You must agree to the terms and conditions to proceed."
        )
      ).not.toBeInTheDocument();
    });
  });
  test("Checkbox error remains when unchecked after form submission", async () => {
    const button = screen.getByRole("button", { name: /Create Account/i });
    fireEvent.click(button);
    const errorMessage = await screen.findByText(
      "You must agree to the terms and conditions to proceed."
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
describe("Form should have valid static text", () => {
  beforeEach(() => {
    render(<Signup />);
  });
  test("should display login link and prompt", () => {
    expect(screen.getByText(/Already Have An Account/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /login/i })).toBeInTheDocument();
  });
});
describe("Overall Form Submission", () => {
  beforeEach(() => {
    axios.post.mockResolvedValueOnce({});
    render(<Signup />);
  });
  test("submits form with valid data", async () => {
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
      expect(
        screen.queryByText(/Please enter a valid name/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/Please enter a valid email address/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(
          /Password must be at least 8 characters and include uppercase, lowercase, number, and special character./i
        )
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(
          /You must agree to the terms and conditions to proceed./i
        )
      ).not.toBeInTheDocument();
    });

    expect(global.mockPush).toHaveBeenCalledWith("/verification-email");
  });
  test("form submission fails if name is invalid", async () => {
    const nameInput = screen.getByPlaceholderText("Enter Your Full Name");
    const emailInput = screen.getByPlaceholderText("Enter Your Email Address");
    const passwordInput = screen.getByPlaceholderText("Create A Password");
    const checkbox = screen.getByRole("checkbox");
    const button = screen.getByRole("button", { name: /Create Account/i });
    fireEvent.change(nameInput, { target: { value: "An" } });
    fireEvent.change(emailInput, { target: { value: "ana@examo.com" } });
    fireEvent.change(passwordInput, { target: { value: "Passw0rd@" } });
    fireEvent.click(checkbox);
    fireEvent.click(button);
    const errorMessage = await screen.findByText(
      /Full Name must be at least 3 characters./i
    );
    expect(errorMessage).toBeInTheDocument();
  });
  test("form submission fails if email is invalid", async () => {
    const nameInput = screen.getByPlaceholderText("Enter Your Full Name");
    const emailInput = screen.getByPlaceholderText("Enter Your Email Address");
    const passwordInput = screen.getByPlaceholderText("Create A Password");
    const checkbox = screen.getByRole("checkbox");
    const button = screen.getByRole("button", { name: /Create Account/i });
    fireEvent.change(nameInput, { target: { value: "Ana Maria" } });
    fireEvent.change(emailInput, { target: { value: "ana@examo" } });
    fireEvent.change(passwordInput, { target: { value: "Passw0rd@" } });
    fireEvent.click(checkbox);
    fireEvent.click(button);
    const errorMessage = await screen.findByText(
      /Please enter a valid email address./i
    );
    expect(errorMessage).toBeInTheDocument();
  });
  test("form submission fails if password is invalid", async () => {
    const nameInput = screen.getByPlaceholderText("Enter Your Full Name");
    const emailInput = screen.getByPlaceholderText("Enter Your Email Address");
    const passwordInput = screen.getByPlaceholderText("Create A Password");
    const checkbox = screen.getByRole("checkbox");
    const button = screen.getByRole("button", { name: /Create Account/i });
    fireEvent.change(nameInput, { target: { value: "Ana Maria" } });
    fireEvent.change(emailInput, { target: { value: "ana@examo" } });
    fireEvent.change(passwordInput, { target: { value: "Passw0r" } });
    fireEvent.click(checkbox);
    fireEvent.click(button);
    const errorMessage = await screen.findByText(
      /Password must be at least 8 characters and include uppercase, lowercase, number, and special character./i
    );
    expect(errorMessage).toBeInTheDocument();
  });
  test("form submission fails if checkbox is unchecked ", async () => {
    const nameInput = screen.getByPlaceholderText("Enter Your Full Name");
    const emailInput = screen.getByPlaceholderText("Enter Your Email Address");
    const passwordInput = screen.getByPlaceholderText("Create A Password");
    const checkbox = screen.getByRole("checkbox");
    const button = screen.getByRole("button", { name: /Create Account/i });
    fireEvent.change(nameInput, { target: { value: "Ana Maria" } });
    fireEvent.change(emailInput, { target: { value: "ana@examo" } });
    fireEvent.change(passwordInput, { target: { value: "Passw0rd" } });

    fireEvent.click(button);
    const errorMessage = await screen.findByText(
      /You must agree to the terms and conditions to proceed./i
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
