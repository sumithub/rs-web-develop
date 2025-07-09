import { ResendEmailVerificationSchema, ResendEmailVerificationResponseSchema } from "./ResendVerificationEmail";

describe("ResendEmailVerificationSchema", () => {
    it("should pass with a valid email", () => {
      const input = { email: "user@example.com" };
      const result = ResendEmailVerificationSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  
    it("should fail with an invalid email format", () => {
      const input = { email: "invalid-email" };
      const result = ResendEmailVerificationSchema.safeParse(input);
      expect(result.success).toBe(false);
      if (!result.success) {
      expect(result.error.flatten().fieldErrors.email).toContain("Please enter a valid email address.");
      }
    });
  
    it("should fail with an empty string", () => {
      const input = { email: "" };
      const result = ResendEmailVerificationSchema.safeParse(input);
      expect(result.success).toBe(false);
      if (!result.success) {
      expect(result.error.flatten().fieldErrors.email).toContain("Please enter a valid email address.");
      }
    });
  });
  
describe("ResendEmailVerificationResponseSchema", () => {
    const validResponse = "Verification email sent successfully";
  it("should validate correct response data", () => {
    expect(() => ResendEmailVerificationResponseSchema.parse(validResponse)).not.toThrow();
  });
    it("should fail when API responds with an object instead of a string", () => {
        const invalidResponse = { message: "Verification email sent successfully" };
      
        const result = ResendEmailVerificationResponseSchema.safeParse(invalidResponse);
      
        expect(result.success).toBe(false);
      });
      it("should pass when response is a valid string", () => {
        const response = "https://mock.dev/verify/abc123";
        const result = ResendEmailVerificationResponseSchema.safeParse(response);
        expect(result.success).toBe(true);
        expect(result.data).toBe(response);
      });
      it("should fail when response is an object", () => {
        const response = { link: "https://..." };
        const result = ResendEmailVerificationResponseSchema.safeParse(response);
        expect(result.success).toBe(false);
      });
});

