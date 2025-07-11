import { toast } from "react-toastify";
import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import Model from "../Model";
import { getError } from "../../../../helper";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";

export default function DisconnectReviewSourceConfirmation({ onClose, onSave, id, data }) {
    const { handleSubmit } = useForm();
    const [sending, setSending] = useState(false)
    const { name } = data

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

                {id && <div className="flex justify-between items-center mb-3">
                    <div className="text-text3 text-base">Client Name</div>
                    <div className="text-base font-medium">John Deo</div>
                </div>}

                {id && <hr className="border border-border-color mb-3.5" />
                }
                <div>
                    <h2 className="text-lg font-semibold">Disconnect from {name}</h2>
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
                <div className="grid grid-cols-2 gap-5 mt-[30px]">
                    <CancelButton title="Cancel" onClick={onClose} class_="text-lg! font-medium!" />
                    <SecondaryButton title="confirm Disconnect" type="submit" disabled={sending} class_="text-lg! font-medium!" />
                </div>
            </form>
        </Model>
    )
}