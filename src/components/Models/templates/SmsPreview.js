"use client"
import Image from "next/image";
import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import InputForm from "../../form/InputForm";
import RadioForm from "../../form/RadioForm";
import Model from "../Model";
import { useForm } from "react-hook-form";
import { validEmailRgx } from "../../../../helper";
import { useState } from "react";

export default function SmsPreview({ onClose, type = "email" }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [perView, setPerView] = useState("web")

    const onSubmit = (data) => {
        // For now, just log the data
        console.log("Form Data:", data);
    };

    return (
        <Model onClose={onClose} title={`Test Send ${type === "email" ? "Template" : "SMS"}`}
            modalClass="w-[70%]!"
            modalBodyClass="bg-dark"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="">
                <div className="grid grid-cols-[1fr_0.7fr] gap-5">
                    <div className="bg-white rounded-[10px] p-5 flex flex-col justify-between gap-5">
                        <div>
                            <h2 className="text-sm font-medium">Send Via<span className="text-danger">*</span></h2>
                            <div className="flex items-center gap-5">
                                <RadioForm
                                    label="Email"
                                    labelClass="font-normal!"
                                    name="sendVia"
                                    formProps={{ ...register("sendVia", { required: true }) }}
                                    errors={errors}
                                />
                                <RadioForm
                                    label="SMS"
                                    labelClass="font-normal!"
                                    name="sendVia"
                                    formProps={{ ...register("sendVia", { required: true }) }}
                                    errors={errors}
                                />
                            </div>
                            <InputForm
                                label="Email Address"
                                placeholder="Enter Email Address"
                                isRequired={true}
                                errors={errors}
                                formProps={{
                                    ...register("email", {
                                        required: true,
                                        pattern: {
                                            value: validEmailRgx,
                                            message: "Email is invalid."
                                        },
                                    })
                                }}
                            />
                            <InputForm
                                label="Custom Message"
                                placeholder="Enter Custom Message"
                                isTextArea={true}
                                rows={4}
                                formProps={{ ...register("message", { required: false }) }}
                                errors={errors}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-5 mt-7">
                            <CancelButton title="Cancel" class_="text-lg!" />
                            <SecondaryButton title="Save Test" type="submit" class_="text-lg!" />
                        </div>
                    </div>
                    <div className="bg-white rounded-[10px]">
                        <div className="bg-primary/10 p-5 rounded-t-[10px] flex items-center gap-2.5">
                            <Image src="/images/eye1.svg" alt="eye1" width={22} height={22} />
                            <h2 className="text-lg font-semibold">Email Preview</h2>
                        </div>
                        <div className="p-5">
                            <div className="grid grid-cols-3 gap-4 justify-between">
                                <button onClick={() => {
                                    setPerView("web")
                                }} type="button" className={`${perView === "web" ? "border-primary bg-primary/10" : ""} p-4 flex items-center justify-center gap-3 border border-border-color rounded-xl cursor-pointer disabled:pointer-events-none`}>
                                    <Image src="/images/web.svg" alt="web" width={30} height={30} />
                                    <h2 className="text-base">Web</h2>
                                </button>

                                <button onClick={() => {
                                    setPerView("mobile")
                                }} type="button" className={`${perView === "mobile" ? "border-primary bg-primary/10" : ""} flex items-center justify-center gap-3 border border-border2/60 p-4 rounded-xl cursor-pointer disabled:pointer-events-none`}>
                                    <Image src="/images/mobile.svg" alt="mobile" width={30} height={30} />
                                    <h2 className="text-base">Mobile</h2>
                                </button>

                                <button onClick={() => {
                                    setPerView("tablet")
                                }} type="button" className={`${perView === "tablet" ? "border-primary bg-primary/10" : ""} flex items-center justify-center gap-3 border border-border2 p-4 rounded-xl cursor-pointer disabled:pointer-events-none`}>
                                    <Image src="/images/tablet.svg" alt="tablet" width={30} height={30} />
                                    <h2 className="text-base">Tablet</h2>
                                </button>
                            </div>
                            <div className="mt-7 border border-dark rounded-[10px]">
                                <div className="p-2.5">
                                    <h3 className="text-xs capitalize">Hi &#123;John Deo&#125;&#44;</h3>
                                    <h3 className="text-xs capitalize py-3.5">Thank you for your recent visit! We&#39;d love to hear your feedback.</h3>
                                    <h3 className="text-xs capitalize">Click the link below to leave a review:</h3>
                                    <h3 className="text-xs capitalize"> &#123;review_link&#125; Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took.</h3>
                                    <h3 className="text-xs pt-5">&#123;Business_name&#125;</h3>
                                </div>
                            </div>
                            <Image src="/images/template.png" alt="template" width={407} height={196} className="mt-7 w-full h-auto" />
                        </div>
                    </div>
                </div>
            </form>
        </Model>
    )
}