import { SignupResponseSchema, SignupSchema } from "./SignupSchema";

describe("signupSchema validation", () => {
  it("passes with valid input", () => {
    const validData = {
      fullName: "Jane Doe",
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
      fullName: "Jo",
      email: "jane@example.com",
      password: "StrongPass@1",
      termsAccepted: true,
      userType: "USER",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.fullName).toContain("Full Name must be at least 3 characters.");
    }
  });

  it("fails if email is invalid", () => {
    const result = SignupSchema.safeParse({
      fullName: "Jane Doe",
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
      fullName: "Jane Doe",
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
      fullName: "Jane Doe",
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
      fullName: "Jane Doe",
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

describe("SignupResponseSchema", () => {
  it("validates a correct response with mockVerificationLink", () => {
    const response = {
      user: {
        id: "abc123",
        email: "john@example.com",
        fullName: "John Doe",
        userType: "USER",
      },
      mockVerificationLink: "https://example.com/verify?token=123",
    };

    const result = SignupResponseSchema.safeParse(response);
    expect(result.success).toBe(true);
  });

  it("validates a correct response without mockVerificationLink", () => {
    const response = {
      user: {
        id: "abc123",
        email: "jane@example.com",
        fullName: "Jane Doe",
        userType: "AGENCY_USER",
      },
    };

    const result = SignupResponseSchema.safeParse(response);
    expect(result.success).toBe(true);
  });

  it("fails if email is invalid", () => {
    const response = {
      user: {
        id: "abc123",
        email: "invalid-email",
        fullName: "Jane Doe",
        userType: "USER",
      },
    };

    const result = SignupResponseSchema.safeParse(response);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain("user");
    }
  });

  it("fails if userType is not one of allowed values", () => {
    const response = {
      user: {
        id: "abc123",
        email: "jane@example.com",
        fullName: "Jane Doe",
        userType: "ADMIN", // Invalid
      },
    };

    const result = SignupResponseSchema.safeParse(response);
    expect(result.success).toBe(false);
  });

  it("fails if mockVerificationLink is not a valid URL", () => {
    const response = {
      user: {
        id: "abc123",
        email: "jane@example.com",
        fullName: "Jane Doe",
        userType: "USER",
      },
      mockVerificationLink: "not-a-url",
    };

    const result = SignupResponseSchema.safeParse(response);
    expect(result.success).toBe(false);
  });
});