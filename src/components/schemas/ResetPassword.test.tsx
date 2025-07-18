import {
  ResetPasswordResponseSchema,
  ResetPasswordSchema
} from "./ResetPassword";

import { ZodError } from "zod";
import { resetPassword } from "../../api/authApi";

describe("ResetPasswordSchema", () => {
  it("validates correct scenario", () => {
    const validData = {
      token: "1Rtest@example.com",
      password: "1Rtest@example.com",
      confirmPassword: "1Rtest@example.com"
    };
    expect(() => ResetPasswordSchema.parse(validData)).not.toThrow();
  });
});
it("fails when password is too weak", () => {
  expect(() =>
    ResetPasswordSchema.parse({
      password: "short",
      token: "short"
    })
  ).toThrow(
    /Password must be at least 8 characters and include uppercase, lowercase, number, and special character./
  );
});
it("throws a Zod error for missing token", () => {
  const invalidData = {
    password: "1Rtest@example.com",
    token: ""
  };
  expect(() => ResetPasswordSchema.parse(invalidData)).toThrow(ZodError);
});

it("fails when missing uppercase", () => {
  expect(() =>
    ResetPasswordSchema.parse({
      password: "lowercase1!",
      token: "lowercase1!"
    })
  ).toThrow(
    /Password must be at least 8 characters and include uppercase, lowercase, number, and special character./
  );
});

it("fails when missing number", () => {
  expect(() =>
    ResetPasswordSchema.parse({
      password: "NoNumber!",
      token: "NoNumber!"
    })
  ).toThrow(
    /Password must be at least 8 characters and include uppercase, lowercase, number, and special character./
  );
});

it("fails when missing special character", () => {
  expect(() =>
    ResetPasswordSchema.parse({
      password: "NoSpecial1",
      token: "NoSpecial1"
    })
  ).toThrow(
    /Password must be at least 8 characters and include uppercase, lowercase, number, and special character./
  );
});

describe("ResetPasswordResponseSchema", () => {
  it("validates a correct response", () => {
    const validResponse = { message: "Password has been reset successfully"};
    expect(() =>
      ResetPasswordResponseSchema.parse(validResponse)
    ).not.toThrow();
  });

  it("throws an error for a non-string response", () => {
    const invalidResponse = {message: 12345};
    expect(() => ResetPasswordResponseSchema.parse(invalidResponse)).toThrow();
  });
  it("throws an error for a response with missing fields", () => {
    const invalidResponse = { data: "Missing status field" };
    expect(() => ResetPasswordResponseSchema.parse(invalidResponse)).toThrow();
  });
});
