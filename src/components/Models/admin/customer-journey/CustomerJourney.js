"use client"
import { toast } from "react-toastify"
import Model from "../../Model"
import { getError } from "../../../../../helper"
import axios from "axios"
import CancelButton from "../../../common/CancelButton"
import SecondaryButton from "../../../common/SecondaryButton"
import { useForm } from "react-hook-form"
import { useState } from "react"
import JourneyDetails from "../../../jorney/JourneyDetails"
import Status from "../../../Status"

function CustomerJourney({ onClose, onSave, id }) {
    const { handleSubmit } = useForm();
    const [sending, setSending] = useState(false)



    const onSubmit = async (data) => {
        try {
            setSending(true)
            let res = null

            if (id !== "add") {
                res = await axios.put("/api", data)
            } else {
                res = await axios.post("/api", data)
            }
            toast.success("Deleted Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }



    return <Model onClose={onClose} title="Customer Journey" modalClass="w-1/2!">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <JourneyDetails class_="mt-0!" />

                <div>
                    <h2 className="text-lg font-semibold my-3.5">Event Details</h2>
                    <div>
                        <div className="flex justify-between items-center">
                            <h2 className="text-base text-text3">Event Type</h2>
                            <h2 className="text-base font-medium">Campaign Added</h2>
                        </div>
                        <hr className="border-t border-border2 w-full my-3.5" />
                        <div className="flex justify-between items-center">
                            <h2 className="text-base text-text3">Details</h2>
                            <h2 className="text-base font-medium">Added to the campaign &#34;Promo 2024&#34;</h2>
                        </div>
                        <hr className="border-t border-border2 w-full my-3.5" />
                        <div className="flex justify-between items-center">
                            <h2 className="text-base text-text3">Status</h2>
                            <Status status="Success" />
                        </div>
                        <hr className="border-t border-border2 w-full my-3.5" />
                        <div className="flex justify-between items-center">
                            <h2 className="text-base text-text3">Timestamp</h2>
                            <h2 className="text-base font-semibold">Jun 18,2024 | 14:20:11</h2>
                        </div>
                        <hr className="border-t border-border2 w-full my-3.5" />
                        <div className="flex justify-between items-center">
                            <h2 className="text-base text-text3">Performed By</h2>
                            <h2 className="text-base font-semibold">System Admin</h2>
                        </div>
                    </div>
                </div>

            </div>
            <div className="grid grid-cols-3 gap-5 mt-7">
                <CancelButton title="back to list" onClick={onClose} class_="text-lg! py-[8.2px]!" />
                <SecondaryButton title="Delete Event" type="submit" disabled={sending} class_="bg-white text-danger! border border-danger! hover:text-white! hover:bg-danger! text-lg! py-[8.2px]!" />
                <SecondaryButton title="Edit Event" class_="text-lg! py-[8.2px]!" />
            </div>
        </form>
    </Model>
}

export default CustomerJourney