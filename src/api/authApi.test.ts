import {
  ResendEmailVerificationData,
  ResendEmailVerificationResponseSchema
} from "../components/schemas/ResendVerificationEmail";
import {
  SignupFormData,
  SignupResponseSchema
} from "../components/schemas/SignupSchema";
import {
  authApi,
  changeEmail,
  forgotPassword,
  resendEmailVerification,
  resetPassword
} from "./authApi";

import API_ENDPOINTS from "./endpoints";
import { ChangeEmailFormData } from "../components/schemas/ChangeEmailSchema";
import { ChangeEmailResponseSchema } from "../components/schemas/ChangeEmailSchema";
import { axiosInstance } from "./axios";
import {
  ForgotPasswordFormData,
  ForgotPasswordResponseSchema
} from "../components/schemas/ForgotPassword";
import {
  ResetPasswordFormData,
  ResetPasswordResponseSchema
} from "../components/schemas/ResetPassword";

const apisToTest = [
  {
    name: "ChangeEmail",
    api: changeEmail,
    validFormData: { email: "john@example.com", newEmail: "new@example.com" },
    validApiResponse: {
      message: "Email changed successfully",
      mockVerificationLink: "https://example.com/verify?token=123"
    }
  },
  {
    name: "ResendEmailVerification",
    api: resendEmailVerification,
    validFormData: { email: "john@example.com" },
    validApiResponse: "Verification email sent successfully"
  },
  {
    name: "ForgotPassword",
    api: forgotPassword,
    validFormData: { email: "john@example.com" },
    validApiResponse: {
      message: "Password reset link sent successfully",
      mockVerificationLink: "HTTPS"
    }
  },
  {
    name: "ResetPassword",
    api: resetPassword,
    validFormData: {
      password: "12John@example.com",
      confirmPassword: "12John@example.com"
    },
    validApiResponse: "Password has been reset successfully"
  }
];
jest.mock("axios", () => ({
  post: jest.fn().mockResolvedValue({ data: {} })
}));

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

const mockedAxios = axiosInstance as jest.Mocked<typeof axiosInstance>;

describe("authApi.signup", () => {
  const validvalidFormData: SignupFormData = {
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
      userType: "USER"
    },
    mockVerificationLink: "https://example.com/verify?token=123"
  };

  it("should return parsed data on valid response", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: validApiResponse });

    const result = await authApi.signup(validvalidFormData);

    expect(result).toEqual(SignupResponseSchema.parse(validApiResponse));
    expect(mockedAxios.post).toHaveBeenCalledWith(
      API_ENDPOINTS.register,
      validvalidFormData
    );
  });

  it("should throw error on invalid API response", async () => {
    const invalidResponse = { foo: "bar" };

    mockedAxios.post.mockResolvedValueOnce({ data: invalidResponse });

    await expect(authApi.signup(validvalidFormData)).rejects.toThrow(
      "Invalid API response format"
    );

    expect(mockedAxios.post).toHaveBeenCalledWith(
      API_ENDPOINTS.register,
      validvalidFormData
    );
  });

  it("should propagate axios error", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("Network Error"));

    await expect(authApi.signup(validvalidFormData)).rejects.toThrow(
      "Network Error"
    );

    expect(mockedAxios.post).toHaveBeenCalledWith(
      API_ENDPOINTS.register,
      validvalidFormData
    );
  });
});

describe("authApi.changeEmail", () => {
  const validvalidFormData: ChangeEmailFormData = {
    currentEmail: "newemail@example.com",
    newEmail: "updated@eample.com"
  };

  const validApiResponse = {
    message: "Email changed successfully",
    mockVerificationLink: "https://example.com/verify?token=123"
  };
  it("should return parsed data on valid response", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: validApiResponse });
    const result = await authApi.changeEmail(validvalidFormData);

    expect(result).toEqual(ChangeEmailResponseSchema.parse(validApiResponse));
    expect(mockedAxios.post).toHaveBeenCalledWith(
      API_ENDPOINTS.changeEmail,
      validvalidFormData
    );
  });
  it("should throw error on invalid API response", async () => {
    const invalidResponse = { foo: "bar" };

    mockedAxios.post.mockResolvedValueOnce({ data: invalidResponse });

    await expect(authApi.changeEmail(validvalidFormData)).rejects.toThrow(
      "Invalid API response format"
    );

    expect(mockedAxios.post).toHaveBeenCalledWith(
      API_ENDPOINTS.changeEmail,
      validvalidFormData
    );
  });
  it("should propagate axios error", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("Network Error"));

    await expect(authApi.changeEmail(validvalidFormData)).rejects.toThrow(
      "Network Error"
    );

    expect(mockedAxios.post).toHaveBeenCalledWith(
      API_ENDPOINTS.changeEmail,
      validvalidFormData
    );
  });
});

describe("resendEmail", () => {
  const validvalidFormData: ResendEmailVerificationData = {
    email: "newemail@example.com"
  };

  const validApiResponse = "Verification email sent successfully";

  it("should return parsed data on valid response", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: validApiResponse });
    const result = await authApi.resendEmailVerification(validvalidFormData);

    expect(result).toEqual(
      ResendEmailVerificationResponseSchema.parse(validApiResponse)
    );
    expect(mockedAxios.post).toHaveBeenCalledWith(
      API_ENDPOINTS.resendEmail,
      validvalidFormData
    );
  });
  it("should throw an error if the API response does not match the schema ", async () => {
    mockedAxios.post.mockResolvedValueOnce({ invalid: "data" });

    await expect(resendEmailVerification(validvalidFormData)).rejects.toThrow(
      "Invalid API response format"
    );
    expect(mockedAxios.post).toHaveBeenCalledWith(
      API_ENDPOINTS.resendEmail,
      validvalidFormData
    );
  });
  it("should handle network or server errors gracefully ", async () => {
    // Mock axios throwing an error
    mockedAxios.post.mockRejectedValueOnce(new Error("Network Error"));

    await expect(resendEmailVerification(validvalidFormData)).rejects.toThrow(
      "Network Error"
    );
    // Assertions
    expect(axiosInstance.post).toHaveBeenCalledWith(
      API_ENDPOINTS.resendEmail,
      validvalidFormData
    );
  });
});

describe("Login form test cases", () => {
  const mockLoginFormData = {
    email: "test@example.com",
    password: "password123"
  };

  const mockLoginResponse = {
    data: "Login successful",
    status: 200,
    statusText: "OK",
    headers: { authorization: "Bearer mockToken" }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Happy Path
  it("should login successfully and return the parsed response", async () => {
    (axiosInstance.post as jest.Mock).mockResolvedValueOnce(mockLoginResponse);
    const result = await authApi.login(mockLoginFormData);
    expect(axiosInstance.post).toHaveBeenCalledWith(
      "/auth/login",
      mockLoginFormData
    );
    expect(result).toEqual({
      data: mockLoginResponse.data,
      status: mockLoginResponse.status,
      statusText: mockLoginResponse.statusText,
      headers: { authorization: mockLoginResponse.headers.authorization }
    });
  });

  it("should throw error on invalid API response", async () => {
    const invalidResponse = { foo: "bar" };

    mockedAxios.post.mockResolvedValueOnce({ data: invalidResponse });

    await expect(authApi.login(mockLoginFormData)).rejects.toThrow(
      "Invalid API response format"
    );

    expect(mockedAxios.post).toHaveBeenCalledWith(
      "/auth/login",
      mockLoginFormData
    );
  });
  it("should handle network or server errors gracefully", async () => {
    (axiosInstance.post as jest.Mock).mockRejectedValueOnce(
      new Error("Network Error")
    );

    await expect(authApi.login(mockLoginFormData)).rejects.toThrow(
      "Network Error"
    );

    expect(axiosInstance.post).toHaveBeenCalledWith(
      "/auth/login",
      mockLoginFormData
    );
  });
});
describe("ForgotPassword test cases", () => {
  const validFormData: ForgotPasswordFormData = {
    email: "test@example.com"
  };

  const validApiResponse = {
    message: "Password reset link sent successfully",
    mockVerificationLink: "HTTPS"
  };

  it("should return parsed data on valid response", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: validApiResponse });

    const result = await authApi.forgotPassword(validFormData);

    expect(result).toEqual(
      ForgotPasswordResponseSchema.parse(validApiResponse)
    );
    expect(mockedAxios.post).toHaveBeenCalledWith(
      API_ENDPOINTS.forgotPassword,
      validFormData
    );
  });
  it("should propagate axios error", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("Network Error"));

    await expect(authApi.forgotPassword(validFormData)).rejects.toThrow(
      "Network Error"
    );

    expect(mockedAxios.post).toHaveBeenCalledWith(
      API_ENDPOINTS.forgotPassword,
      validFormData
    );
  });

  it("should throw error on invalid API response", async () => {
    const invalidResponse = { foo: "bar" };

    mockedAxios.post.mockResolvedValueOnce({ data: invalidResponse });

    await expect(authApi.forgotPassword(validFormData)).rejects.toThrow(
      "Invalid API response format"
    );

    expect(mockedAxios.post).toHaveBeenCalledWith(
      API_ENDPOINTS.forgotPassword,
      validFormData
    );
  });
});
describe("ResetPassword test cases", () => {
  const validFormData: ResetPasswordFormData = {
    password: "tEst1@example.com",
    confirmPassword: "tEst1@example.com"
  };

  const validApiResponse = "Password has been reset successfully";

  it("should return parsed data on valid response", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: validApiResponse });

    const result = await authApi.resetPassword(validFormData);

    expect(result).toEqual(ResetPasswordResponseSchema.parse(validApiResponse));
    expect(mockedAxios.post).toHaveBeenCalledWith(
      API_ENDPOINTS.resetPassword,
      validFormData
    );
  });
  it("should propagate axios error", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("Network Error"));

    await expect(authApi.resetPassword(validFormData)).rejects.toThrow(
      "Network Error"
    );

    expect(mockedAxios.post).toHaveBeenCalledWith(
      API_ENDPOINTS.resetPassword,
      validFormData
    );
  });

  it("should throw error on invalid API response", async () => {
    const invalidResponse = {
      password: "bqwWE133@#ar",
      confirmPassword: "baqwWE133@#ar"
    };

    mockedAxios.post.mockResolvedValueOnce({ data: invalidResponse });

    await expect(authApi.resetPassword(validFormData)).rejects.toThrow(
      "Invalid API response format"
    );

    expect(mockedAxios.post).toHaveBeenCalledWith(
      API_ENDPOINTS.resetPassword,
      validFormData
    );
  });
});
describe.each(apisToTest)(
  "Rate-limiting tester for $name",
  ({ name, api, validFormData, validApiResponse }) => {
    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date("2025-07-08T00:00:00.000Z"));
      mockedAxios.post.mockReset();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it("should allow up to 3 requests in a 10-minute window", async () => {
      mockedAxios.post.mockResolvedValue({ data: validApiResponse });

      for (let i = 0; i < 3; i++) {
        const res = await api.call(validFormData);
        expect(res).toEqual(validApiResponse);
      }

      expect(mockedAxios.post).toHaveBeenCalledTimes(3);
    });

    it("should throw RateLimitError on 4th request within 10 minutes", async () => {
      mockedAxios.post
        .mockResolvedValueOnce({ data: validApiResponse })
        .mockResolvedValueOnce({ data: validApiResponse })
        .mockResolvedValueOnce({ data: validApiResponse })
        .mockRejectedValueOnce(
          new Error("Too many requests in 10 mins. Please try again later.")
        );

      await api.call(validFormData);
      await api.call(validFormData);
      await api.call(validFormData);

      await expect(api.call(validFormData)).rejects.toThrow(
        "Too many requests in 10 mins. Please try again later."
      );
    });

    it("should reset limit after 10 minutes", async () => {
      mockedAxios.post.mockResolvedValue({ data: validApiResponse });

      await api.call(validFormData);
      await api.call(validFormData);
      await api.call(validFormData);

      jest.advanceTimersByTime(10 * 60 * 1000 + 1000);

      const result = await api.call(validFormData);
      expect(result).toEqual(validApiResponse);
    });
  }
);
