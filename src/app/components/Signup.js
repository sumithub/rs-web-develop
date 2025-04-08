import Input from "./form/Input";
import Checkbox2 from "./form/Checkbox2";
import Link from "next/link";

export default function Signup() {
    return (<>
        <div>
            <Link href="/" className="mt-11 text-secondary inline-block font-semibold text-[34px]">LOGO</Link>
            <div className="mt-[114px] rounded-[15px] bg-white border border-[#F4F4F4] p-[30px] shadow-[_0px_0px_25px_0px_#00000008]">
                <h2 className="text-[34px] leading-none font-semibold text-secondary text-center">Sign Up</h2>
                <p className="text-xs pt-2.5 capitalize text-center text-[#616E7C]">Let&#39;s get you all st up so you can access your personal account.</p>
                <div>
                    <Input
                        label="Full Name*"
                        type="type"
                        class_="mt-10!"
                        placeholder="Enter Name"
                        error="Please Enter A Valid First Name (Alphabetic Characters Only)."
                        icon="/images/close.svg"
                    />
                    <Input
                        label="Email ID*"
                        type="Email"
                        placeholder="Enter Email"
                        error="This Email Address Is Already In Use. Please Try Another."
                        icon="/images/close.svg"
                    />
                    <Input
                        label="Password*"
                        type="password"
                        placeholder="Enter Password"
                        error="Password Must Be At Least 8 Characters Long And Include Uppercase, lowercase, a number, and a special character."
                        icon="/images/eyes.svg"
                        iconClass="w-6 h-6"
                    />
                    <div className="mt-[15px] gap-1.5 flex items-center">
                        <Checkbox2
                        />
                        <div className="text-sm text-secondary">I Agree To Our <Link href="/" className="text-primary">Terms & Conditions</Link> And <Link href="/" className="text-primary">Privacy Policy</Link></div>
                    </div>
                    <Link href="/review" className="">
                        <button className="text-text text-lg mt-5 rounded-[10px] border border-primary hover:bg-text hover:text-primary cursor-pointer font-medium text-center py-3 px-3.5 w-full bg-primary">
                            Create Account
                        </button>
                    </Link>
                    <h2 className="text-sm text-center mt-5 capitalize text-secondary">Already have an account?<Link href="/" className="text-primary underline underline-offset-[3px]"> Login</Link></h2>
                </div>
            </div>
        </div>
    </>)
}