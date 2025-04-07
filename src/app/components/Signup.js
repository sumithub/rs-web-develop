import Input from "./form/Input";
import Checkbox2 from "./form/Checkbox2";

export default function Signup() {
    return (<>
        <div>
            <h2 className="mt-11 text-secondary font-semibold text-[34px]">LOGO</h2>
            <div className="mt-[114px] rounded-[15px] bg-white border border-[#F4F4F4] p-[30px] shadow-[_0px_0px_25px_0px_#00000008]">
                <h2 className="text-[34px] leading-none font-semibold text-secondary text-center">Sign Up</h2>
                <p className="text-xs pt-2.5 text-center text-[#616E7C]">Let&#39;s get you all st up so you can access your personal account.</p>
                <div>
                    <Input
                        label="Full Name*"
                        type="type"
                        class_="mt-10!"
                        placeholder="Johan 68056"
                        error="Please enter a valid first name (alphabetic characters only)."
                        icon="/images/close.svg"
                    />
                    <Input
                        label="Email ID*"
                        type="Email"
                        placeholder="gmiller@gmail.com"
                        error="This email address is already in use. Please try another."
                        icon="/images/close.svg"
                    />
                    <Input
                        label="Password*"
                        type="password"
                        placeholder="........"
                        error="Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character."
                        icon="/images/eyes.svg"
                        iconClass="w-6 h-6"
                    />
                    <div className="mt-[15px] gap-1.5 flex items-center">
                        <Checkbox2
                        />
                        <div className="text-sm text-secondary">I Agree To Our <span className="text-primary">Terms & Conditions</span> And <span className="text-primary">Privacy Policy</span></div>
                    </div>
                    <button className="text-text text-lg mt-5 rounded-[10px] border border-primary hover:bg-text hover:text-primary font-medium text-center py-3 px-3.5 w-full bg-primary">
                        Create Account
                    </button>
                    <h2 className="text-sm text-center mt-5 text-secondary">Already have an account?<span className="text-primary underline underline-offset-[3px]"> Login</span></h2>
                </div>
            </div>
        </div>
    </>)
}