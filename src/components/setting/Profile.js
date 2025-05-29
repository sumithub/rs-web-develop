"use client"
import Image from "next/image";
import InputForm from "../form/InputForm";
import SelectForm from "../form/SelectForm";
export default function Profile() {
    return (<>
        <div>
            <h2 className="text-lg font-semibold py-[11px]">My Profile</h2>
            <div className="flex items-center pt-[15px] gap-[15px]">
                <Image src="/images/profile-pic.png" alt="profile-pic" width={70} height={70} />
                <button className="bg-primary/5 text-primary p-2.5 text-sm rounded-[10px]">Upload New Picture</button>
            </div>
        </div>
        <div className="pt-[25px]">
            <h2 className="text-lg font-semibold">Basic Information</h2>
            <div className="grid grid-cols-2 gap-5 pt-[25px]">
                <InputForm
                    label="Full Name"
                    labelClass=""
                    placeholder="Johan Deo"
                    inputClass="border-primary/10"
                    class_="mt-0!"
                    isRequired={true}
                />
                <InputForm
                    label="E-Mail"
                    labelClass=""
                    placeholder="johandeo@gmail.com"
                    inputClass="border-primary/10"
                    class_="mt-0!"
                    isRequired={true}
                />
            </div>
            <div className="grid grid-cols-2 gap-5 pt-5">
                <InputForm
                    label="Phone Number (Optional)"
                    labelClass=""
                    placeholder="+91 89658 65896"
                    inputClass="border-primary/10"
                    class_="mt-0!"
                />
                <SelectForm
                    label="Time Zone (Optional)"
                    class_="mt-0!"
                    selectClass_="py-3! px-2.5! border-primary/10"
                >
                    <option value="email template">(GMT+10:00) Sydney</option>
                </SelectForm>
            </div>
            <div className="pt-5">
                <InputForm
                    label="Company"
                    labelClass=""
                    placeholder="Arora Consulting Pty Ltd"
                    inputClass="border-primary/10"
                    class_="mt-0!"
                    isRequired={true}
                />
            </div>
            <div className="grid grid-cols-2 gap-5 pt-[25px]">
                <button className="bg-secondary2 border border-secondary2 hover:bg-white rounded-[10px] py-3 px-3 text-text3 text-lg text-center capitalize cursor-pointer disabled:pointer-events-none disabled:opacity-50"
                // onClick={() => { setOpen(true) }}
                >
                    Cancel Changes</button>
                <button className="bg-primary border border-primary hover:bg-white hover:text-primary rounded-[10px] py-3 px-3 text-white text-lg text-center capitalize cursor-pointer disabled:pointer-events-none disabled:opacity-50"
                // onClick={() => { setOpen(true) }}
                >
                    Save Changes</button>
            </div>
        </div>
        <div className="pt-[25px]">
            <h2 className="text-lg font-semibold">Change Password</h2>
            <div className="grid grid-cols-2 gap-5 pt-[25px]">
                <InputForm
                    label="Current Password"
                    name="password"
                    inputType="password"
                    placeholder="********"
                    isRequired={true}
                    class_="mt-0!"
                />
                <InputForm
                    label="New Password"
                    name="password"
                    inputType="password"
                    placeholder="********"
                    isRequired={true}
                    class_="mt-0!"
                />
            </div>
            <div className="flex items-center gap-[10px] pt-[25px]">
                <Image src="/images/warning-2.svg" alt="warning-2" width={22} height={22} />
                <h2 className="capitalize text-sm font-medium">this Action Is Irreversible!</h2>
            </div>
            <div className="grid grid-cols-2 gap-5 pt-[25px] pb-8">
                <button className="bg-secondary2 border border-secondary2 hover:bg-white rounded-[10px] py-3 px-3 text-text3 text-lg text-center capitalize cursor-pointer disabled:pointer-events-none disabled:opacity-50"
                // onClick={() => { setOpen(true) }}
                >
                    Delete Account</button>
                <button className="bg-primary border border-primary hover:bg-white hover:text-primary rounded-[10px] py-3 px-3 text-white text-lg text-center capitalize cursor-pointer disabled:pointer-events-none disabled:opacity-50"
                // onClick={() => { setOpen(true) }}
                >
                    Update Password</button>
            </div>
        </div>
    </>)
}