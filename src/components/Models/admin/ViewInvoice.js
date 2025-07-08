import { useForm } from "react-hook-form";
import Model from "../Model";
import SecondaryButton from "../../common/SecondaryButton";
import CancelButton from "../../common/CancelButton";
import { useState } from "react";
import { toast } from "react-toastify";
import { getError } from "../../../../helper";
import axios from "axios";
import Status from "../../Status";

export default function ViewInvoice({ onClose, id }) {
    const { handleSubmit } = useForm();
    const [sending, setSending] = useState("")

    const onSubmit = async (data) => {
        try {
            setSending(true)
            let res = null

            if (id !== "add") {
                res = await axios.put("/api", data)
            } else {
                res = await axios.post("/api", data)
            }

            toast.success("Downloaded Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }

    return (
        <Model onClose={onClose} title="View Invoice" modalClass="w-1/2!">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div>
                        <div className="flex justify-between items-center">
                            <h2 className="text-text3 text-base">Invoice ID</h2>
                            <h3 className="text-base font-medium">INV123</h3>
                        </div>
                        <hr className="border-t border-border2 my-3.5" />
                    </div>
                    <div>
                        <div className="flex justify-between items-center">
                            <h2 className="text-text3 text-base">Client</h2>
                            <h3 className="text-base font-medium">ABC Corp </h3>
                        </div>
                        <hr className="border-t border-border2 my-3.5" />
                    </div>
                    <div>
                        <div className="flex justify-between items-center">
                            <h2 className="text-text3 text-base">Plan</h2>
                            <h3 className="text-base font-medium">Standard</h3>
                        </div>
                        <hr className="border-t border-border2 my-3.5" />
                    </div>
                    <div>
                        <div className="flex justify-between items-center">
                            <h2 className="text-text3 text-base">Amount</h2>
                            <h3 className="text-base font-medium">50</h3>
                        </div>
                        <hr className="border-t border-border2 my-3.5" />
                    </div>
                    <div>
                        <div className="flex justify-between items-center">
                            <h2 className="text-text3 text-base">status</h2>
                            <Status status="Paid" />
                        </div>
                        <hr className="border-t border-border2 my-3.5" />
                    </div>
                    <div>
                        <div className="flex justify-between items-center">
                            <h2 className="text-text3 text-base">Due Date</h2>
                            <h3 className="text-base font-medium">Mar 25, 2025</h3>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-5 mt-7">
                    <CancelButton title="Send Reminder" onClick={() => {
                        onClose()
                        toast.success("Sended Successfully")
                    }} class_="text-lg! bg-white! border border-primary! text-primary! hover:text-white! hover:bg-primary!" />
                    <SecondaryButton title="Download PDF" type="submit" disabled={sending} class_="text-lg!" />
                </div>
            </form>
        </Model>
    )
}  