import Input from "./form/Input";

export default function Signup() {
    return (<>
        <div>
            <h2 className="mt-11 text-secondary font-semibold text-[34px]">LOGO</h2>
            <div className="mt-[114px] bg-white border border-[#F4F4F4] p-[30px] shadow-[_0px_0px_25px_0px_#00000008]">
                <h2 className="text-[34px] font-semibold text-secondary text-center">Sign Up</h2>
                <p className="text-xs text-center text-[#616E7C]">Let&#39;s get you all st up so you can access your personal account.</p>
                <div>
                    <Input
                        label="Full Name" />
                </div>
            </div>
        </div>
    </>)
}