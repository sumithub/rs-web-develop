"use client";

import { LoginFormData, LoginSchema } from "./schemas/LoginSchema";
import { useEffect, useState } from "react";

import Checkbox2 from "./form/Checkbox2";
import Image from "next/image";
import InputForm from "./form/InputForm";
import Link from "next/link";
import Verify from "./form/Verify";
import { login } from "../api/authApi";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Signin() {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    mode: "onBlur"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState<
    boolean | null
  >(false);
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (verificationSuccess) {
      setTimeout(() => {
        setVerificationSuccess(null);
      }, 5000);
    }
  }, [verificationSuccess, checked]);
  const onSubmit = async (formData: LoginFormData) => {
    try {
      setLoading(true);
      const { email, password } = formData;
      const payload = { email, password, rememberMe: checked };
      const parsedData = await login(payload);
      if (parsedData?.headers?.authorization) {
        localStorage.setItem(
          "mockVerificationLink",
          parsedData?.headers?.authorization
        );
      }
      console.log(JSON.stringify(parsedData));

      router.push("/dashboard");
    } catch (error: any) {
      // Check if the error response has the expected shape
      console.error("Login error:", error);
      const apiMessage = error?.response?.data?.message;
      const timeoutError = error?.message;
      const fallbackMessage =
        "An error occurred while logging in. Please try again.";
      setError(apiMessage || timeoutError || fallbackMessage);
      toast.error(apiMessage || timeoutError || fallbackMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-[34px] leading-none font-semibold text-secondary text-center">
        Login To Your Account
      </h2>
      <p className="text-xs sm:pt-1.5 pt-2.5 pb-2.5 capitalize text-center text-[#616E7C]">
        Hey! We soar you working welcome back!
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        {verificationSuccess !== null && (
          <Verify
            verificationSuccess={verificationSuccess}
            onClick={() => {
              setVerificationSuccess(true);
            }}
          />
        )}
        <div className="flex justify-between mt-5">
          <label className="flex gap-1.5 items-center" htmlFor="remember">
            <Checkbox2
              class_="border-text-3"
              id="remember"
              checked={checked}
              onChange={(checked) => setChecked(checked)}
              required={false}
            />

            <h2 className="text-sm capitalize text-secondary">Remember me</h2>
          </label>
          <Link href="/forgot-password">
            <h2 className="text-sm capitalize text-primary">
              Forgot Password ?
            </h2>
          </Link>
        </div>
        <div>
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
            disabled={Object.keys(errors).length > 0 || loading}
            className="disabled:bg-primary/50 text-text text-lg mt-3 rounded-[10px] border border-primary hover:bg-text hover:text-primary cursor-pointer font-medium text-center py-3 px-3.5 w-full bg-primary"
          >
            Login
          </button>
          <h2 className="text-sm capitalize text-secondary pt-2.5 text-center">
            Don&#39;t have an account?{" "}
            <Link
              href="/register"
              className="text-primary underline underline-offset-3"
            >
              Sign Up
            </Link>
          </h2>
        </div>
      </form>
    </div>
  );
}
