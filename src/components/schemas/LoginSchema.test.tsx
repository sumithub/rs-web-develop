import { LoginSchema, LoginResponseSchema } from "./LoginSchema";

describe("LoginSchema", () => {
  it("should validate correct login form data", () => {
    const validData = {
      email: "test@example.com",
      password: "Password123!",
      rememberMe: true
    };

    const result = LoginSchema.safeParse(validData);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validData);
    }
  });

  it("should fail validation for an invalid email", () => {
    const invalidData = {
      email: "invalid-email",
      password: "Password123!",
      rememberMe: false
    };

    const result = LoginSchema.safeParse(invalidData);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe(
        "Please enter a valid email address."
      );
    }
  });

  it("should fail validation for an invalid password (missing special character)", () => {
    const invalidData = {
      email: "test@example.com",
      password: "Password123", // Missing special character
      rememberMe: true
    };

    const result = LoginSchema.safeParse(invalidData);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
      );
    }
  });
});

describe("LoginResponseSchema", () => {
  // Happy Path
  it("should validate a correct API response", () => {
    const validResponse = {
      data: "mockToken",
      status: 200,
      statusText: "OK",
      headers: {
        authorization: "Bearer mockToken"
      }
    };

    const result = LoginResponseSchema.safeParse(validResponse);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validResponse);
    }
  });
  // Unhappy Path
  it("should fail validation for missing authorization header", () => {
    const invalidResponse = {
      data: "mockToken",
      status: 200,
      statusText: "OK",
      headers: {}
    };

    const result = LoginResponseSchema.safeParse(invalidResponse);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe("Required");
    }
  });

  it("should fail validation for an invalid status code", () => {
    const invalidResponse = {
      data: "mockToken",
      status: 404, // Invalid status
      statusText: "Not Found",
      headers: {
        authorization: "Bearer mockToken"
      }
    };

    const result = LoginResponseSchema.safeParse(invalidResponse);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe(
        "Invalid literal value, expected 200"
      );
    }
  });
});
