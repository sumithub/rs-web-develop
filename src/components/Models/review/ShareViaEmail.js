import Image from "next/image";
import SecondaryButton from "../../common/SecondaryButton";
import Input from "../../form/Input";
import Model from "../Model";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { getError } from "../../../../helper";

export default function ShareViaEmail({ onClose, onSave }) {
    const { handleSubmit } = useForm();
    const [sending, setSending] = useState(false);

    const onSubmit = async () => {
        try {
            toast.success("Shared Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }

    const Copy = async () => {
        try {
            toast.success("Coped Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }

    const Code = async () => {
        try {
            toast.success("Code Embed Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }
    return (
        <Model onClose={onClose} title="Share via email" modalClass="w-[50%]!" modalBodyClass="max-h-[90vh]!">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-[4.5fr_1fr] gap-3">
                    <div>
                        <Input
                            class_="mt-0! w-full!"
                            label=""
                            icon="/images/copy2.svg"
                            inputClass="border border-primary/10"
                        />
                    </div>
                    <div className="">
                        <SecondaryButton
                            title="Search Users"
                            class_="py-[15px]! px-5!"
                            onClick={onSave}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between pt-[25px]">
                    <div className="flex gap-[15px]">
                        <Image src="/images/request.png" alt="request" width={44} height={44} />
                        <div>
                            <div className="text-base font-medium">Amelie Laurent</div>
                            <div className="text-sm text-text3 pt-2.5">amili@gmail.com</div>
                        </div>
                    </div>
                    <div className="text-lg">owner</div>
                </div>
                <hr className="mt-[15px] border border-border2" />

                <div className="flex items-center justify-between pt-[25px]">
                    <div className="flex gap-[15px]">
                        <Image src="/images/request.png" alt="request" width={44} height={44} />
                        <div>
                            <div className="text-base font-medium">Amelie Laurent</div>
                            <div className="text-sm text-text3 pt-2.5">amili@gmail.com</div>
                        </div>
                    </div>
                    <div className="text-lg">Manager</div>
                </div>
                <hr className="mt-[15px] border border-border2" />

                <div className="flex items-center justify-between pt-[25px]">
                    <div className="flex gap-[15px]">
                        <Image src="/images/request.png" alt="request" width={44} height={44} />
                        <div>
                            <div className="text-base font-medium">Amelie Laurent</div>
                            <div className="text-sm text-text3 pt-2.5">amili@gmail.com</div>
                        </div>
                    </div>
                    <div className="text-lg">owner</div>
                </div>

                <div className="flex justify-between gap-3 mt-[25px]">
                    <div className="flex gap-[15px]">
                        <button className="border border-primary flex gap-2 py-[13px] px-2.5 rounded-lg text-primary" onClick={Copy}>
                            <Image src="/images/copy3.svg" alt="copy3" unoptimized={true} width={16} height={16} />
                            Copy Link
                        </button>
                        <button className="border border-primary flex gap-2 py-[13px] px-2.5 rounded-lg text-primary" onClick={Code}>
                            <Image src="/images/arrow-3.svg" alt="arrow-3" unoptimized={true} width={16} height={16} />
                            Embed Code
                        </button>
                    </div>

                    <div className="">
                        <SecondaryButton
                            title="Done"
                            class_="text-lg! py-3! px-[80px]!"
                            type="submit"
                            disabled={sending}
                        />
                    </div>
                </div>
            </form>
        </Model>
    )
}