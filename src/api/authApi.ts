import { SignupFormData, SignupResponseSchema } from "../components/schemas/SignupSchema";
import { ChangeEmailFormData, ChangeEmailResponseSchema } from "../components/schemas/ChangeEmailSchema";

import API_ENDPOINTS from "./endpoints";
import { axiosInstance } from "./axios";
import { z } from "zod";
import { ResendEmailVerificationData, ResendEmailVerificationResponseSchema, VerificationEmailResponse } from "../components/schemas/ResendVerificationEmail";

export type SignupResponse = z.infer<typeof SignupResponseSchema>;
export type ChangeEmailResponse = z.infer<typeof ChangeEmailResponseSchema>;

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
export const changeEmail = async (formData: ChangeEmailFormData): Promise <ChangeEmailResponse> => {
        console.log("Changing email to:", formData);
        const response = await axiosInstance.post(API_ENDPOINTS.changeEmail, formData);
         console.log("Change Email Response:", response.data);
        const result = ChangeEmailResponseSchema.safeParse(response.data);
    if (!result.success) {  
        console.error("Validation error:", result.error.flatten());
        throw new Error("Invalid API response format");
    }
    return result.data;
}
export const resendEmailVerification = async (formData: ResendEmailVerificationData): Promise <VerificationEmailResponse> => {
    console.log("ResendVerification email received:", formData);
    const response = await axiosInstance.post(API_ENDPOINTS.resendEmail, formData);
     console.log("Resend verification Email Response:", response.data);
    const result = ResendEmailVerificationResponseSchema.safeParse(response.data);
if (!result.success) {  
    console.error("Validation error:", result.error.flatten());
    throw new Error("Invalid API response format");
}
return result.data;
}

export const authApi = {
  signup,changeEmail, resendEmailVerification
};






