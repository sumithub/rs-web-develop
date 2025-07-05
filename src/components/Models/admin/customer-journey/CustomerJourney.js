"use client"
import { toast } from "react-toastify"
import Model from "../../Model"
import { getError } from "../../../../../helper"
import axios from "axios"
import CancelButton from "../../../common/CancelButton"
import SecondaryButton from "../../../common/SecondaryButton"
import { useForm } from "react-hook-form"
import { useState } from "react"

function CustomerJourney({ onClose, onSave, id }) {
    const { handleSubmit } = useForm();
    const [sending, setSending] = useState(false)



    const onSubmit = async (data) => {
        try {
            setSending(true)
            let res = null

            if (id = "add") {
                res = await axios.put("/api", data)
            } else {
                res = await axios.post("/api", data)
            }
            if (onSave) {
                onSave(data)
            }
            toast.success("Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }



    return <Model onClose={onClose} title="Customer Journey" modalClass="w-1/2!">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-3 gap-5 mt-7">
                <CancelButton title="back to list" onClick={onClose} class_="text-lg! py-[8.2px]!" />
                <SecondaryButton title="Delete Event" type="submit" disabled={sending} onClick={onSubmit} class_="bg-white text-primary! hover:text-white! hover:bg-primary! text-lg! py-[8.2px]!" />
                <SecondaryButton title="Edit Event" class_="text-lg! py-[8.2px]!" />
            </div>
        </form>
    </Model>
}

export default CustomerJourney