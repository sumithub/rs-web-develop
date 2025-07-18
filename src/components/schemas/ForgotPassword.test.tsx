import {
  ForgotPasswordSchema,
  ForgotPasswordResponseSchema
} from "./ForgotPassword";

describe("ForgotPasswordSchema", () => {
  it("validates a correct email address", () => {
    const validData = { email: "test@example.com" };
    expect(() => ForgotPasswordSchema.parse(validData)).not.toThrow();
  });

  it("throws an error for an invalid email address", () => {
    const invalidData = { email: "invalid-email" };
    expect(() => ForgotPasswordSchema.parse(invalidData)).toThrow(
      "Please enter a valid email address."
    );
  });
});

describe("ForgotPasswordResponseSchema", () => {
  it("validates a correct string response", () => {
    const validResponse = {
      message: "Password reset link sent successfully",
      mockVerificationLink: "HTTPS"
    };

    expect(() =>
      ForgotPasswordResponseSchema.parse(validResponse)
    ).not.toThrow();
  });

  it("throws an error for a non-string response", () => {
    const invalidResponse = 12345;
    expect(() => ForgotPasswordResponseSchema.parse(invalidResponse)).toThrow();
  });
  it("throws an error for a response with missing fields", () => {
    const invalidResponse = { data: "Missing status field" };
    expect(() => ForgotPasswordResponseSchema.parse(invalidResponse)).toThrow();
  });
});
