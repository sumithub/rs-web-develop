"use client";

import {
  ForgotPasswordFormData,
  ForgotPasswordSchema
} from "../../components/schemas/ForgotPassword";
import React, { useEffect, useState } from "react";

import AuthLayout from "../../components/common/AuthLayout";
import Image from "next/image";
import InputForm from "../../components/form/InputForm";
import Link from "next/link";
import SecondaryButton from "../../components/common/SecondaryButton";
import { forgotPassword } from "../../api/authApi";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function ForgotPassword() {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(ForgotPasswordSchema),
    mode: "onBlur"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [sec, setSec] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  const buttonTitle = success ? "Resend Reset Password" : "Send Reset Link";

  const [mockLink, setMockLink] = useState<string | null>(null);
  useEffect(() => {
    if (sec === 60) {
      setIsTimerActive(false);
      setLoading(false);
    }
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isTimerActive && sec > 0) {
      interval = setInterval(() => {
        setSec((prev) => prev - 1);
      }, 1000);
    } else if (sec === 0) {
      setIsTimerActive(false);
      setLoading(false);
      setSec(59);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [sec, isTimerActive]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError(null);
      setIsTimerActive(true);
      setSec(59);
      setSuccess(false);
      const response = await forgotPassword(data);
      setSuccess(true);
      setSuccessMessage("Check your email to reset the password");
      toast.success(response.message || "Password reset link has been sent to your email.");
      setMockLink(response.mockVerificationLink);
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
    }
  };
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}.${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <AuthLayout dangerClass={undefined}>
      <div>
        <h2 className="text-[34px] leading-none font-semibold text-secondary capitalize text-center">
          Forgot password
        </h2>
        <p className="text-xs pt-2.5 pb-[25px] capitalize text-center text-[#616E7C]">
          No Worries, We’ll Send Your Reset Instruction.
        </p>
        {mockLink && (
          <div className="mt-5 text-center">
            <div className="text-sm text-green-600 font-medium">
              Dev:{" "}
              <a
                href={mockLink}
                target="/verification-email-success"
                className="underline text-blue-600"
              >
                Click here to verify
              </a>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <InputForm
              label="Email ID"
              clearValue={true}
              placeholder="Enter Your Email Address"
              icon="/images/close.svg"
              isRequired={true}
              errors={errors}
              formProps={{ ...register("email") }}
              setValue={setValue}
              watch={watch}
              infoIcon={null}
              labelClass=""
              disabled={loading}
              isTextArea={false}
              rows={undefined}
            />
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
          {success && (
            <div className="flex gap-2.5 justify-center mt-[15px]">
              <Image
                unoptimized={true}
                src="/images/success.svg"
                alt="error.svg"
                width={15}
                height={14}
              />
              <h2 className="text-xs text-success">{successMessage}</h2>
            </div>
          )}
          <SecondaryButton
            title={buttonTitle}
            disabled={
              Object.keys(errors).length > 0 || loading || isTimerActive
            }
            type="submit"
            class_="disabled:bg-dark! disabled:text-text3! disabled:border-dark! py-3! mt-5!"
            onClick={undefined}
          />
        </form>
        {
          <div className="flex items-center mt-5">
            <div className="text-sm text-secondary">
              {isTimerActive ? formatTime(sec) : "00.59"}
            </div>
          </div>
        }
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
    </AuthLayout>
  );
}

export default ForgotPassword;
