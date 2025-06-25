import { SignupFormData, SignupResponseSchema } from "../components/schemas/SignupSchema";

import { authApi } from "./authApi";
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
