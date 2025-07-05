import { ChangeEmailFormData, ChangeEmailResponseSchema } from "../components/schemas/ChangeEmailSchema";
import { ResendEmailVerificationData, ResendEmailVerificationResponseSchema } from "../components/schemas/ResendVerificationEmail";
import { SignupFormData, SignupResponseSchema } from "../components/schemas/SignupSchema";

import { authApi, resendEmailVerification } from "./authApi";
import { axiosInstance } from "./axios";

jest.mock("axios", () => ({
  post: jest.fn().mockResolvedValue({ data: {} }),
}));

const mockedAxios = axiosInstance as jest.Mocked<typeof axiosInstance>;

describe("authApi.signup", () => {
  const validFormData: SignupFormData = {
      fullName: "John Doe",
      email: "john@example.com",
      password: "StrongPassword123",
      termsAccepted: true,
      userType: "USER"
  };

  const validApiResponse = {
    user: {
        id: "abc123",
        email: "john@example.com",
        fullName: "John Doe",
        userType: "USER",
      },
      mockVerificationLink: "https://example.com/verify?token=123",
    };

  it("should return parsed data on valid response", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: validApiResponse });

    const result = await authApi.signup(validFormData);

    expect(result).toEqual(SignupResponseSchema.parse(validApiResponse));
    expect(mockedAxios.post).toHaveBeenCalledWith("/users/register", validFormData);
  });

  it("should throw error on invalid API response", async () => {
    const invalidResponse = { foo: "bar" };

    mockedAxios.post.mockResolvedValueOnce({ data: invalidResponse });

    await expect(authApi.signup(validFormData)).rejects.toThrow("Invalid API response format");

    expect(mockedAxios.post).toHaveBeenCalledWith("/users/register", validFormData);
  });

  it("should propagate axios error", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("Network Error"));

    await expect(authApi.signup(validFormData)).rejects.toThrow("Network Error");

    expect(mockedAxios.post).toHaveBeenCalledWith("/users/register", validFormData);
  });
});

describe("authApi.changeEmail", () => {
  const validFormData: ChangeEmailFormData = {
      currentEmail: "newemail@example.com",
      newEmail: "updated@eample.com"
  };

  const validApiResponse = {
      message: "Email changed successfully",
      mockVerificationLink: "https://example.com/verify?token=123",
  };
  it("should return parsed data on valid response", async () => {
      mockedAxios.post.mockResolvedValueOnce({ data: validApiResponse });
      const result = await authApi.changeEmail(validFormData);

      expect(result).toEqual(ChangeEmailResponseSchema.parse(validApiResponse));
      expect(mockedAxios.post).toHaveBeenCalledWith("/users/change-signup-email", validFormData);
  })
  it("should throw error on invalid API response", async () => {
      const invalidResponse = { foo: "bar" };

      mockedAxios.post.mockResolvedValueOnce({ data: invalidResponse });

      await expect(authApi.changeEmail(validFormData)).rejects.toThrow("Invalid API response format");

      expect(mockedAxios.post).toHaveBeenCalledWith("/users/change-signup-email", validFormData);
  })
  it("should propagate axios error", async () => {
      mockedAxios.post.mockRejectedValueOnce(new Error("Network Error"));

      await expect(authApi.changeEmail(validFormData)).rejects.toThrow("Network Error");

      expect(mockedAxios.post).toHaveBeenCalledWith("/users/change-signup-email", validFormData);
  });
})


describe("resendEmail", () => {
  const validFormData: ResendEmailVerificationData = {
      email: "newemail@example.com",
  };

  const validApiResponse = "Verification email sent successfully";
  
  it("should return parsed data on valid response", async () => {
      mockedAxios.post.mockResolvedValueOnce({ data: validApiResponse });
      const result = await authApi.resendEmailVerification(validFormData);

      expect(result).toEqual(ResendEmailVerificationResponseSchema.parse(validApiResponse));
      expect(mockedAxios.post).toHaveBeenCalledWith("/auth/resend-verification", validFormData);
  })
  it("should throw an error if the API response does not match the schema ", async () => {
   
    mockedAxios.post.mockResolvedValueOnce({ invalid: "data" });

    await expect(resendEmailVerification(validFormData)).rejects.toThrow(
        "Invalid API response format"
    );
    expect(mockedAxios.post).toHaveBeenCalledWith("/auth/resend-verification", validFormData);
   
});
it("should handle network or server errors gracefully ", async () => {
  // Mock axios throwing an error
  mockedAxios.post.mockRejectedValueOnce(new Error("Network Error"));

  await expect(resendEmailVerification(validFormData)).rejects.toThrow(
      "Network Error"
  );
  // Assertions
  expect(axiosInstance.post).toHaveBeenCalledWith(
      "/auth/resend-verification",
      validFormData
  );
});
}
)



