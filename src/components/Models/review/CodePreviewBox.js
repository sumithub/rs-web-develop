import { toast } from "react-toastify";
import SecondaryButton from "../../common/SecondaryButton";
import Model from "../Model";
import { getError } from "../../../../helper";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";

export default function CodePreviewBox({ onClose, onSave, code }) {
    const { handleSubmit } = useForm();
    const [sending, setSending] = useState(false)

    const onSubmit = async () => {
        try {
            setSending(true)
            toast.success("Copied Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }
    return (
        <Model onClose={onClose} title="Code Preview Box" modalClass="w-[50%]!">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div className="p-[15px] bg-dark rounded-[15px]">
                        {code}
                    </div>
                    <div className="mt-[30px] flex justify-center bg-primary gap-2.5 py-3 rounded-[10px]">
                        <button className="disabled:pointer-events-none">
                            <Image unoptimized={true} src="/images/copy1.svg" alt="copy1" width={16} height={16} />
                        </button>
                        <SecondaryButton title="Copy Code" type="submit" disabled={sending} class_="px-0! hover:bg-primary! hover:text-white! py-0!" />
                    </div>

                    <div className="mt-5">
                        <h2 className="text-base capitalize font-medium">Instructions: Copy and paste the above JavaScript snippet into your website's HTML where you want the widget to appear.</h2>
                    </div>
                </div>
            </form>
        </Model>
    )
}