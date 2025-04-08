"use client"
import { useForm } from "react-hook-form";
import Input from "./form/Input";
import Checkbox2 from "./form/Checkbox2";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
    const {
        register,
        setValue,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const route = useRouter()
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        try {

            setLoading(true);
            route.push("/review")
        } catch (error) {
            console.error("Signup error:", error);
        } finally {
            setLoading(false);
        }
    };
    console.log(errors)

    return (
        <>
            <div>
                <Link href="/" className="mt-11 text-secondary inline-block font-semibold text-[34px]">LOGO</Link>
                <div className="mt-[114px] rounded-[15px] bg-white border border-[#F4F4F4] p-[30px] shadow-[_0px_0px_25px_0px_#00000008]">
                    <h2 className="text-[34px] leading-none font-semibold text-secondary text-center">Sign Up</h2>
                    <p className="text-xs pt-2.5 pb-[25px] capitalize text-center text-[#616E7C]">Let&#39;s get you all st up so you can access your personal account.</p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            label="Full Name"
                            name="name"
                            inputType="text"
                            placeholder="Enter Your Full Name"
                            icon="/images/close.svg"
                            formProps={{ ...register("name", { required: true, pattern: { value: /^[A-Za-z]+$/, message: "Please enter a valid first name (alphabetic characters only)." } }) }}
                            isRequired={true} errors={errors}
                            setValue={setValue}
                            watch={watch}
                        />
                        <Input
                            label="Email ID"
                            name="email"
                            placeholder="Enter Email"
                            icon="/images/close.svg"
                            isRequired={true}
                            errors={errors}
                            formProps={{
                                ...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Email is invalid."
                                    },
                                    validate: (value) =>
                                        !["test@gmail.com", "admin@gmail.com"].includes(value) ||
                                        "This email address is already in use. Please try another."
                                })
                            }}
                            setValue={setValue}
                            watch={watch}
                        />

                        <Input
                            label="Password"
                            name="password"
                            inputType="password"
                            placeholder="Create A Password"
                            formProps={{
                                ...register("password", {
                                    required: true,
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]{8,}$/,
                                        message: "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character."
                                    }
                                })
                            }} isRequired={true} errors={errors}
                            setValue={setValue}
                            watch={watch}
                        />

                        <label htmlFor="terms" className="mt-[15px] gap-1.5 flex items-center">
                            <Checkbox2
                                id="terms" />
                            <div className="text-sm text-secondary">
                                I Agree To Our{" "}
                                <Link href="/" className="text-primary">
                                    Terms & Conditions
                                </Link>{" "}
                                And{" "}
                                <Link href="/" className="text-primary">
                                    Privacy Policy
                                </Link>
                            </div>
                        </label>
                        <button
                            type="submit"
                            disabled={loading}
                            className="disabled:bg-primary/50 text-text text-lg mt-5 rounded-[10px] border border-primary hover:bg-text hover:text-primary cursor-pointer font-medium text-center py-3 px-3.5 w-full bg-primary"
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>

                        <h2 className="text-sm text-center mt-5 capitalize text-secondary">
                            Already have an account?
                            <Link href="/" className="text-primary underline underline-offset-[3px]">
                                {" "}
                                Login
                            </Link>
                        </h2>
                    </form>
                </div>
            </div>
        </>
    );
}
