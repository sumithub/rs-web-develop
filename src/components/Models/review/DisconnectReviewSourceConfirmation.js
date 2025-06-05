import { toast } from "react-toastify";
import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import Model from "../Model";
import { getError } from "../../../../helper";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Input from "../../form/Input";

export default function DisconnectReviewSourceConfirmation({ onClose, onSave }) {
    const { handleSubmit } = useForm();
    const [sending, setSending] = useState(false)

    const onSubmit = async () => {
        try {
            toast.success("Disconnected Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }
    return (
        <Model onClose={onClose} title="Disconnect Review Source Confirmation" modalClass="w-[50%]!">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <h2 className="text-lg font-semibold">Disconnect from Yelp</h2>
                    <Image unoptimized={true} src="/images/yelp-logo.svg" alt="yelp-logo" width={116} height={47} className="pt-2.5" />
                </div>
                {/* <Input
                    label="Business Profile URL"
                    placeholder="https//www.google.com"
                    hideOptional={true}
                    isRequired={true}
                    icon="/images/add-link.svg"
                    infoIcon="/images/url.svg"
                /> */}
                <div className="flex items-center gap-2.5 bg-danger/10 p-2.5 rounded-[7px] mt-[15px]">
                    <Image unoptimized={true} src="/images/warning.svg" alt="warning" width={22} height={22} className="" />
                    <h2 className="text-sm">Are you sure you want to disconnect This will stop fetching new reviews</h2>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-[30px]">
                    <CancelButton title="Cancel" onClick={onClose} class_="text-lg! font-medium! py-3!" />
                    <SecondaryButton title="confirm Disconnect" type="submit" disabled={sending} class_="text-lg! font-medium! py-3!" />
                </div>
            </form>
        </Model>
    )
}