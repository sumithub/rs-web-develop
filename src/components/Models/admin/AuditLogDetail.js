import { useForm } from "react-hook-form";
import Model from "../Model";
import { useState } from "react";
import { toast } from "react-toastify";
import { getError } from "../../../../helper";
import axios from "axios";
import Image from "next/image";

export default function AuditLogDetail({ onClose, id }) {
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

            toast.success("Saved Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }

    return (
        <Model onClose={onClose} title="Audit Log Details" modalClass="w-1/2!">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div>
                        <div className="flex justify-between items-center">
                            <h2 className="text-base capitalize text-text3">Date</h2>
                            <h3 className="text-base font-medium capitalize">Jun 18,2024</h3>
                        </div>
                        <hr className="border-t border-border2 my-3.5" />
                    </div>
                    <div>
                        <div className="flex justify-between items-center">
                            <h2 className="text-base capitalize text-text3">Time</h2>
                            <h3 className="text-base font-medium capitalize">10:30AM</h3>
                        </div>
                        <hr className="border-t border-border2 my-3.5" />
                    </div>
                    <div>
                        <div className="flex justify-between items-center">
                            <h2 className="text-base capitalize text-text3">Client</h2>
                            <h3 className="text-base font-medium capitalize">ABC Corp</h3>
                        </div>
                        <hr className="border-t border-border2 my-3.5" />
                    </div>
                    <div>
                        <div className="flex justify-between items-center">
                            <h2 className="text-base capitalize text-text3">location</h2>
                            <h3 className="text-base font-medium capitalize">Sydney</h3>
                        </div>
                        <hr className="border-t border-border2 my-3.5" />
                    </div>
                    <div>
                        <div className="flex justify-between items-center">
                            <h2 className="text-base capitalize text-text3">user</h2>
                            <h3 className="text-base font-medium capitalize">john D.</h3>
                        </div>
                        <hr className="border-t border-border2 my-3.5" />
                    </div>
                    <div>
                        <div className="flex justify-between items-center">
                            <h2 className="text-base capitalize text-text3">Action</h2>
                            <h3 className="text-base font-medium capitalize">Edited Campaign</h3>
                        </div>
                        <hr className="border-t border-border2 my-3.5" />
                    </div>
                    <div>
                        <div className="flex justify-between items-center">
                            <h2 className="text-base capitalize text-text3">module</h2>
                            <h3 className="text-base font-medium capitalize">Campaigns</h3>
                        </div>
                    </div>
                    <h2 className="pt-5 text-lg font-semibold">Details</h2>
                    <div className="pt-3.5 flex justify-between">
                        <h2 className="text-base capitalize text-text3">Campaign Name</h2>
                        <h3 className="text-base font-medium capitalize">March Promo</h3>
                    </div>
                    <div className="flex justify-between p-2 bg-secondary2 rounded-lg mt-3.5">
                        <div>
                            <h2 className="text-sm capitalize font-medium">Nature Template</h2>
                            <h3 className="capitalize text-xs">Lorem Ipsum..</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-2.5">
                            <button className="py-1 px-2 rounded-lg bg-primary/10 text-primary flex items-center justify-center gap-1" type="button"><span><Image src="/images/eye1.svg" alt="eye1" width={12} height={12} /></span>Preview</button>
                            <button className="py-1 px-2 rounded-lg bg-primary/10 text-primary flex items-center justify-center gap-1" type="button"><span><Image src="/images/edit2.svg" alt="eye1" width={12} height={12} /></span>Edit</button>
                        </div>
                    </div>
                </div>
            </form>
        </Model>
    )
}  