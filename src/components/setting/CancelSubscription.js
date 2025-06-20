import { useState } from "react";
import InputForm from "../form/InputForm";
import { useForm } from "react-hook-form";
import SelectForm from "../form/SelectForm";
import Model from "../Models/Model";
import { toast } from "react-toastify";
import CancelButton from "../common/CancelButton";
import SecondaryButton from "../common/SecondaryButton";
import { getError } from "../../../helper";
import axios from "axios";
import Image from "next/image";
import SubscriptionCancelled from "./SubscriptionCancelled";


export default function CancelSubscription({ onClose, id }) {
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
    const [sending, setSending] = useState(false)
    const [openCancelled, setOpenCancelled] = useState(false)

    const onSubmit = async (data) => {
        try {
            setSending(true)
            let res = null

            if (id !== "add") {
                res = await axios.put("/api", data)
            } else {
                res = await axios.post("/api", data)
            }

            toast.success("Kept Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }
    return (
        <Model onClose={onClose} title="Cancel Subscription" modalClass="w-[70%]!">

            {openCancelled &&
                <SubscriptionCancelled
                    onClose={() => { setOpenCancelled(false) }} />
            }
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-4 flex gap-2.5 p-2.5 items-center bg-custom-yellow-light/10 rounded-lg">
                    <Image unoptimized={true} src="/images/warning-2.svg" alt="warning-2" width={22} height={22} />
                    <h2 className="text-sm font-medium capitalize">Are you sure you want to cancel your subscription? You will still have access until the end of the current billing period. </h2>
                </div>

                <div className="mt-5">

                    <div className="flex justify-between mt-3">
                        <div className="text-text3">Current Plan</div>
                        <div className="font-medium">Growth Plan ($99.00/Mo)</div>
                    </div>

                    <hr className="border border-border2 my-3" />

                    <div className="flex justify-between">
                        <div className="text-text3">Nect Renewal Date</div>
                        <div className="font-medium">Jan 25, 2025</div>
                    </div>

                    <hr className="border border-border2 my-3" />

                    <div className="flex justify-between">
                        <div className="text-text3">Auto Renew</div>
                        <div className="font-medium">Enabled</div>
                    </div>

                </div>

                <div className="font-semibold text-xl mt-3">
                    Select A Reason
                </div>

                <SelectForm label=""
                    setValue={setValue} watch={watch}
                    selectClass_="py-3.5! px-2.5! focus:border-primary/60!"
                    isRequired=""
                    defaultOption="select">
                    <option value="tooExpensive">Too Expensive</option>
                    <option value="noLongerNeeded">No Longer Needed</option>
                    <option value="switchingToAnotherProvider">Switching to Another Provider</option>
                    <option value="notGettingEnoughValue">Not Getting Enough Value</option>
                    <option value="other">Other (Please specify)</option>
                </SelectForm>

                <InputForm
                    label="Additional Comments"
                    class_="mt-3! w-full!"
                    isTextArea={true} inputClass="mt-2.5"
                    formProps={{ ...register("additional", { required: false }) }}
                    errors={errors}
                    rows={5}
                    placeholder="XYZ.."
                />

                <div className="font-semibold mt-3">
                    Wait! Get 20% Off For 3 Months Instead Of Canceling, Enjoy A 20% Discount For The Next 3 Billing Cycles.
                </div>

                <div className="grid grid-cols-4 gap-5 mt-7">
                    <CancelButton title="Cancel Subscription" onClick={() => { setOpenCancelled(true) }} class_="text-danger! bg-danger/10!" />
                    <SecondaryButton title="Switch To A Lower Plan" class_="bg-white! hover:bg-primary! text-primary! hover:text-white!" />
                    <SecondaryButton title="Apply 20% Discount" class_="bg-white! hover:bg-primary! text-primary! hover:text-white!" />
                    <SecondaryButton title="keep subscription" type="submit" disabled={sending} />
                </div>
            </form>
        </Model >
    )
}