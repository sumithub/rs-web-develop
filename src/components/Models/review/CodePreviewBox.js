import { toast } from "react-toastify";
import SecondaryButton from "../../common/SecondaryButton";
import Model from "../Model";
import { getError } from "../../../../helper";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";

export default function CodePreviewBox({ onClose, onSave }) {
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
                        <h2 className="text-sm text-primary">&#60;script src="https://your-domain.com/widget.js"</h2>
                        <h2 className="text-sm text-primary pl-5">data-widget-id="XYZ"</h2>
                        <h2 className="text-sm text-primary pl-5">async&#62;&#60;/script&#62;</h2>
                    </div>
                    <div className="mt-[30px] flex justify-center bg-primary gap-2.5 py-3 rounded-[10px]">
                        <Image unoptimized={true} src="/images/copy1.svg" alt="copy1" width={16} height={16} />
                        <SecondaryButton title="Copy Code" type="submit" disabled={sending} class_="px-0! py-0!" />
                    </div>

                    <div className="mt-5">
                        <h2 className="text-base capitalize font-medium">Instructions: Copy and paste the above JavaScript snippet into your website's HTML where you want the widget to appear.</h2>
                    </div>
                </div>
            </form>
        </Model>
    )
}