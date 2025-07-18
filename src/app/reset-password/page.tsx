"use client";

import {
  ResetPasswordFormData,
  ResetPasswordSchema
} from "../../components/schemas/ResetPassword";

import AuthLayout from "../../components/common/AuthLayout";
import Image from "next/image";
import InputForm from "../../components/form/InputForm";
import Link from "next/link";
import Success from "../../components/common/Success";
import { resetPassword } from "../../api/authApi";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ResetPasswordPage() {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: "onBlur"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  // const searchParams = useSearchParams();
  // const status = searchParams?.get("status");
  // const token = searchParams?.get("token");

  // token & status are pending, will be updated once, the mockverification link is ready
  const token = "291b98c2-9c22-44cd-8d6e-7a4dcdadc93";

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      setLoading(true);
      const payload = {
        token: token,
        password: data.password,
        confirmPassword: data.confirmPassword
      };
      const response = await resetPassword(payload);
      setSuccess(true);
      toast.success(response.message || "Password has been reset successfully.");
    } catch (error) {
      const apiMessage = error?.response?.data?.message;
      const fallbackMessage = "Something went wrong. Please try again.";
      setError(
        apiMessage ||
          (error?.message.includes("timeout") &&
            "Timeout reached, please try again later") ||
          fallbackMessage
      );
      toast.error(
        apiMessage ||
          (error?.message.includes("timeout") &&
            "Timeout reached, please try again later") ||
          fallbackMessage
      );

      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthLayout dangerClass={undefined}>
      {success ? (
        <Success
          message="Your password has been successfully reset!"
          buttonTitle="Return to Login" link={undefined} desc={undefined}/>
      ) : (
        <div>
          <h2 className="text-[34px] leading-none font-semibold text-secondary capitalize text-center">
            Reset Password
          </h2>

          {/* <p className="text-xs pt-2.5 pb-[25px] capitalize text-center text-[#616E7C]">
            A password reset link has been sent to your email
             commented it out as it did not make sense in the context of resetting password
          </p> */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <InputForm
                label="Password"
                inputType="password"
                placeholder="Create A Password"
                formProps={{ ...register("password") }}
                isRequired={true}
                errors={errors}
                setValue={setValue}
                watch={watch}
                infoIcon={null}
                labelClass=""
                icon="/images/close.svg"
                disabled={loading}
                clearValue={true}
                isTextArea={false}
                rows={undefined}
              />
              <InputForm
                label="Confirm Password"
                inputType="password"
                placeholder="Enter Confirm Password"
                formProps={{ ...register("confirmPassword") }}
                isRequired={true}
                errors={errors}
                setValue={setValue}
                watch={watch}
                infoIcon={null}
                labelClass=""
                icon="/images/close.svg"
                disabled={loading}
                clearValue={true}
                isTextArea={false}
                rows={undefined}
              />
              <input type="hidden" {...register("token")} value={token} />
            </div>
            {error && (
              <div className="flex gap-2.5 justify-center mt-[15px]">
                <Image
                  unoptimized={true}
                  src="/images/error.svg"
                  alt="error.svg"
                  width={15}
                  height={14}
                />
                <h2 className="text-xs text-danger capitalize">{error}</h2>
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="text-white text-lg font-medium bg-primary hover:bg-white hover:text-primary w-full mt-5 py-3 rounded-[10px] border border-primary cursor-pointer capitalize"
            >
              reset password
            </button>
          </form>
          <div className="flex justify-center mt-5">
            <Link href="/login" className="flex gap-[15px]">
              <Image
                unoptimized={true}
                src="/images/arrow.svg"
                alt="arrow.svg"
                width={20}
                height={20}
              />
              <h2 className="text-sm text-secondary">Back To Login</h2>
            </Link>
          </div>
        </div>
      )}
    </AuthLayout>
  );
}
