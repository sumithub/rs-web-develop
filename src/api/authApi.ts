import { SignupFormData, SignupResponseSchema } from "../components/schemas/SignupSchema";

import API_ENDPOINTS from "./endpoints";
import { axiosInstance } from "./axios";
import { z } from "zod";

export type SignupResponse = z.infer<typeof SignupResponseSchema>;

export const signup = async (
    formData: SignupFormData
): Promise<SignupResponse> => {
    const response = await axiosInstance.post(API_ENDPOINTS.register, formData);

    const result = SignupResponseSchema.safeParse(response.data);
    if (!result.success) {
        console.error("Validation error:", result.error.flatten());
        throw new Error("Invalid API response format");
    }

    return result.data;
};

export const authApi = {
  signup,
};
