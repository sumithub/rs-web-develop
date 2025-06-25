import { SignupSchema } from "./SignupSchema";

describe("signupSchema validation", () => {
  it("passes with valid input", () => {
    const validData = {
      name: "Jane Doe",
      email: "jane@example.com",
      password: "StrongPass@1",
      termsAccepted: true,
      userType: "USER",
    };

    const result = SignupSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("fails if name is too short", () => {
    const result = SignupSchema.safeParse({
      name: "Jo",
      email: "jane@example.com",
      password: "StrongPass@1",
      termsAccepted: true,
      userType: "USER",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.name).toContain("Full Name must be at least 3 characters.");
    }
  });

  it("fails if email is invalid", () => {
    const result = SignupSchema.safeParse({
      name: "Jane Doe",
      email: "invalid-email",
      password: "StrongPass@1",
      termsAccepted: true,
      userType: "USER",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.email).toContain("Please enter a valid email address.");
    }
  });

  it("fails if password is weak", () => {
    const result = SignupSchema.safeParse({
      name: "Jane Doe",
      email: "jane@example.com",
      password: "12345678",
      termsAccepted: true,
      userType: "USER",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.password?.[0]).toMatch(/Password must/i);
    }
  });

  it("fails if terms are not accepted", () => {
    const result = SignupSchema.safeParse({
      name: "Jane Doe",
      email: "jane@example.com",
      password: "StrongPass@1",
      termsAccepted: false,
      userType: "USER",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.termsAccepted).toContain(
        "You must accept the terms and conditions"
      );
    }
  });

  it("fails if userType is invalid", () => {
    const result = SignupSchema.safeParse({
      name: "Jane Doe",
      email: "jane@example.com",
      password: "StrongPass@1",
      termsAccepted: true,
      userType: "SUPERADMIN",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.userType?.[0]).toMatch(/Invalid enum value/i);
    }
  });
});