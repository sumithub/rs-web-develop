import { toast } from "react-toastify";
import SecondaryButton from "../../common/SecondaryButton";
import Model from "../Model";
import { getError } from "../../../../helper";
import { useForm } from "react-hook-form";
import { useState } from "react";

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
        <Model onClose={onClose} title="Code Preview Box" modalClass="w-[60%]!">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div className="border border-border-color rounded-md bg-[#0396FF1a]">
                        <p className="mt-2 mb-2 pl-2 decoration-[#0000FF]">
                            script src="https://your-domain.com/widget.js"
                            <br />
                            data-widget-id="XYZ"
                            <br />
                            async/script
                        </p>
                    </div>

                    <div className="mt-4">
                        <SecondaryButton title="Copy Code" type="submit" disabled={sending} />
                    </div>

                    <div className="mt-4">
                        Instructions: Copy and paste the above JavaScript snippet into your website's HTML
                        <br />
                        where you want the widget to appear.
                    </div>
                </div>
            </form>
        </Model>
    )
}