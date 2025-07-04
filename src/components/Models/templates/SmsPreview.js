"use client"
import Image from "next/image";
import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import InputForm from "../../form/InputForm";
import Model from "../Model";
import { useForm } from "react-hook-form";
import { getError, validEmailRgx } from "../../../../helper";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Radio from "../../form/Radio";
import PhoneForm from "../../form/PhoneForm";

export default function SmsPreview({ onClose, id }) {
    const { register, handleSubmit, setValue, watch, clearErrors, formState: { errors } } = useForm();
    const [perView, setPerView] = useState("web")
    const [sending, setSending] = useState(false)
    const [type, setType] = useState("email")

    const handleViewChange = (event) => {
        setType(event.target.value);
        if (event.target.value === "sms")
            setPerView("mobile")
        else if (event.target.value === "email")
            setPerView("web")
    };

    const onSubmit = async (data) => {

        try {
            setSending(true)
            let res = null

            if (id !== "add") {
                res = await axios.put("/api", data)
            } else {
                res = await axios.post("/api", data)
            }

            toast.success("Saved Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }
    const getPreviewWidth = () => {
        switch (perView) {
            case 'web':
                return 'flex 1  flex-col w-[100%] max-w-full';
            case 'tablet':
                return 'w-[768px]';
            case 'mobile':
                return 'w-[375px]';
            default:
                return '';
        }
    };
    const getWidth = () => {
        console.log(perView)
        switch (perView) {
            case 'web':
                return ' w-[90%]! xl:max-w-[90%]!';
            case 'tablet':
                return ' w-[80%]!';
            case 'mobile':
                return ' w-[70%]!';
            default:
                return '';
        }
    };
    return (
        <Model onClose={onClose} title={`Test Send ${type === "email" ? "Template" : "SMS"}`}
            modalClass={getWidth()}
            modalBodyClass="bg-dark">
            {getWidth()}
            <form onSubmit={handleSubmit(onSubmit)} className="">
                <div className="flex  gap-5 ">
                    <div className="bg-white rounded-[10px] p-5 flex flex-col justify-between gap-5  w-[400px]">
                        <div>
                            <h2 className="text-sm font-medium">Send Via<span className="text-danger">*</span></h2>
                            <div className="flex items-center gap-5">
                                <Radio
                                    label="Email"
                                    labelClass="font-normal!"
                                    value="email"
                                    checked={type === 'email'}
                                    onChange={handleViewChange}
                                />

                                <Radio
                                    label="SMS"
                                    labelClass="font-normal!"
                                    value="sms"
                                    checked={type === 'sms'}
                                    onChange={handleViewChange}
                                />
                            </div>

                            {type === "email" && <InputForm
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
                            />}

                            {type === "sms" &&
                                <PhoneForm label="Mobile Number"
                                    isRequired={true}
                                    formProps={{ ...register("phone", { required: true }) }}
                                    errors={errors}
                                    clearErrors={clearErrors}
                                    setValue={setValue}
                                    watch={watch} />
                            }
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
                            <CancelButton title="Cancel" class_="text-lg!" onClick={onClose} />
                            <SecondaryButton title="Save Test" type="submit" disabled={sending} class_="text-lg!" />
                        </div>
                    </div>

                    <div className={`bg-white rounded-[10px]  ${getPreviewWidth()}`}>
                        <div className="bg-primary/10 p-5 rounded-t-[10px] flex items-center gap-2.5">
                            <Image src="/images/eye1.svg" alt="eye1" width={22} height={22} />
                            <h2 className="text-lg font-semibold">Email Preview</h2>
                        </div>
                        <div className="p-5">
                            <div className="grid grid-cols-3 gap-4 justify-between">
                                <button onClick={() => {
                                    setPerView("web")
                                }} type="button"
                                    className={`${perView === "web" ? "border-primary bg-primary/10" : "border-border-color"} border p-4 flex items-center justify-center gap-2 rounded-xl cursor-pointer ${type === "sms" ? "disabled:pointer-events-none text-secondary/50 disabled:border-border-color/40 disabled:bg-white" : "disabled:pointer-events-none"}`}
                                    disabled={type === "sms"}>
                                    <Image src="/images/web.svg" alt="web" width={30} height={30} />
                                    <h2 className="text-base">Web</h2>
                                </button>

                                <button onClick={() => {
                                    setPerView("mobile")
                                }} type="button" className={`${perView === "mobile" ? "border-primary bg-primary/10" : "border-border-color"} flex items-center justify-center gap-2 border p-4 rounded-xl cursor-pointer ${type === "email" ? "disabled:pointer-events-none text-secondary/50 disabled:border-color/40 disabled:bg-white" : ""} disabled:pointer-events-none disabled:text-secondary/50`} disabled={type === "email"}>
                                    <Image src="/images/mobile.svg" alt="mobile" width={30} height={30} />
                                    <h2 className="text-base">Mobile</h2>
                                </button>

                                <button onClick={() => {
                                    setPerView("tablet")
                                }} type="button" className={`${perView === "tablet" ? "border-primary bg-primary/10" : "border-border-color"} border flex items-center justify-center gap-2 p-4 rounded-xl cursor-pointer ${type === "sms" ? "disabled:pointer-events-none text-secondary/50 disabled:border-border-color/40 disabled:bg-white" : "disabled:pointer-events-none"}`} disabled={type === "sms"}>
                                    <Image src="/images/tablet.svg" alt="tablet" width={30} height={30} />
                                    <h2 className="text-base">Tablet</h2>
                                </button>
                            </div>
                            <div className={`mt-7 border border-dark rounded-[10px] `}>
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
        </Model >
    )
}