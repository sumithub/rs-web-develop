"use client";

import { useContext, useEffect, useState } from "react";

import AuthLayout from "../components/common/AuthLayout";
import ChangeEmail from "../components/Models/ChangeEmail";
import Image from "next/image";
import Link from "next/link";
import SecondaryButton from "../components/common/SecondaryButton";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import AuthContext from "../contexts/AuthContext";
import { resendEmailVerification } from "../api/authApi";

function VerificationEmailClient() {
  const { handleSubmit } = useForm();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [sec, setSec] = useState(60);
  const [error, setError] = useState("");
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [mockLink, setMockLink] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const status = searchParams?.get("status");

  const { unVerifiedEmail } = useContext(AuthContext);

  useEffect(() => {
    const link = localStorage.getItem("mockVerificationLink");
    if (link) {
      setMockLink(link);
      localStorage.removeItem("mockVerificationLink");
    }
    if (status === "expired" && sec === 60) {
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
  }, [status, sec, isTimerActive]);

  const onSubmit = async () => {
    try {
      setLoading(true);
      setIsTimerActive(true);
      setSec(59);
      setMockLink(null);
      // Remove ?status=expired from the URL
      const url = new URL(window.location.href);
      url.searchParams.delete("status");
      window.history.replaceState({}, "", url.toString());

      // Calls the centralized authApi signup function
      const parsedData = await resendEmailVerification({
        email: unVerifiedEmail
      });
      toast.success(
        "Verification email sent successfully! Check your inbox or spam folder."
      );
    } catch (error) {
      const apiMessage = error?.response?.data?.message;
      const fallbackMessage =
        "Unable to resend verification email. Please try again later.";
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
      setIsTimerActive(false);
      setLoading(false);
      setSec(59);
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
      {open && <ChangeEmail onClose={() => setOpen(false)} id={undefined} />}

      {mockLink && status !== "expired" && (
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

      {status === "expired" && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-md my-4 text-center">
          <h2 className="text-lg font-semibold">Verification Link Issue</h2>
          <p className="mt-1 text-sm font-medium">Expired Token</p>
          <p className="text-sm">
            The verification link has expired. Please request a new one.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {status !== "expired" && (
            <div>
              <h2 className="text-[34px] leading-none font-semibold text-secondary capitalize text-center">
                verification email sent
              </h2>

              <div className="flex items-center justify-between mt-8">
                <div className="text-[15px] text-text3 capitalize">
                  A verification email has been sent to your email address:
                </div>
                <div className="text-[15px] text-secondary font-medium disabled">
                  {unVerifiedEmail}
                </div>
              </div>

              <div className="mt-5">
                <div className="flex gap-2">
                  <Image
                    unoptimized
                    src="images/warning.svg"
                    alt="warning"
                    height={22}
                    width={22}
                  />
                  <div className="text-sm text-secondary font-medium capitalize">
                    please check your inbox(or spam folder) and click the
                    verification link.
                  </div>
                </div>

                <div className="flex gap-2 mt-2">
                  <Image
                    unoptimized
                    src="images/warning.svg"
                    alt="warning"
                    height={22}
                    width={22}
                  />
                  <div className="text-sm text-secondary font-medium capitalize">
                    if you don't receive an email, wait 60 seconds before trying
                    again.
                  </div>
                </div>
              </div>
            </div>
          )}
          {error && (
            <div className="flex gap-2.5 justify-center mt-[15px]">
              <Image
                unoptimized={true}
                src="/images/error.svg"
                alt="error"
                width={15}
                height={14}
              />
              <h2 className="text-xs text-danger capitalize">{error}</h2>
            </div>
          )}
          <SecondaryButton
            title="Resend Verification Email"
            disabled={loading || isTimerActive}
            type="submit"
            class_="disabled:bg-dark! disabled:text-text3! disabled:border-dark! py-3! mt-5!"
            onClick={undefined}
          />
          {
            <div className="flex items-center justify-between mt-5">
              <Link
                href="#"
                onClick={() => setOpen(true)}
                className="text-sm text-primary font-medium underline underline-offset-4"
              >
                Change Email
              </Link>
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
      </form>
    </AuthLayout>
  );
}

export default VerificationEmailClient;
