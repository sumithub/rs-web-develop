import { ChangeEmailSchema, ChangeEmailResponseSchema } from "./ChangeEmailSchema";



describe("ChangeEmailSchema", () => {
  it("should validate correct form data", () => {
    const validData = {
      currentEmail: "current@example.com",
      newEmail: "new@example.com",
    };

    expect(() => ChangeEmailSchema.parse(validData)).not.toThrow();
  });

  it("should throw an error for invalid currentEmail", () => {
    const invalidData = {
      currentEmail: "invalid-email",
      newEmail: "new@example.com",
    };

    expect(() => ChangeEmailSchema.parse(invalidData)).toThrow("Please enter a valid email address.");
  });

  it("should throw an error for invalid newEmail", () => {
    const invalidData = {
      currentEmail: "current@example.com",
      newEmail: "invalid-email",
    };

    expect(() => ChangeEmailSchema.parse(invalidData)).toThrow("Please enter a valid email address.");
  });

  it("should throw an error for missing fields", () => {
    const invalidData = {
      currentEmail: "current@example.com",
    };

    expect(() => ChangeEmailSchema.parse(invalidData)).toThrow();
  });
});

describe("ChangeEmailResponseSchema", () => {
  it("should validate correct response data", () => {
    const validResponse = {
      message: "Email changed successfully",
      mockVerificationLink: "https://example.com/verify",
    };

    expect(() => ChangeEmailResponseSchema.parse(validResponse)).not.toThrow();
  });

  it("should validate response data without optional mockVerificationLink", () => {
    const validResponse = {
      message: "Email changed successfully",
    };

    expect(() => ChangeEmailResponseSchema.parse(validResponse)).not.toThrow();
  });

  it("should throw an error for missing message field", () => {
    const invalidResponse = {
      mockVerificationLink: "https://example.com/verify",
    };

    expect(() => ChangeEmailResponseSchema.parse(invalidResponse)).toThrow();
  });

  it("should throw an error for invalid mockVerificationLink", () => {
    const invalidResponse = {
      message: "Email changed successfully",
      mockVerificationLink: "invalid-url",
    };

    expect(() => ChangeEmailResponseSchema.parse(invalidResponse)).toThrow();
  });
});