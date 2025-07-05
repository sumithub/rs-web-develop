"use client"
import { toast } from "react-toastify"
import CancelButton from "../../common/CancelButton"
import SecondaryButton from "../../common/SecondaryButton"
import Model from "../Model"
import { getError } from "../../../../helper"
import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"

function ReviewDetails({ onClose, onSave }) {
    const { handleSubmit } = useForm();
    const [sending, setSending] = useState(false)

    const onSubmit = async (data) => {
        try {
            setSending(true)
            let res = null

            if ("add") {
                res = await axios.put("/api", data)
            } else {
                res = await axios.post("/api", data)
            }
            if (onSave) {
                onSave(data)
            }
            toast.success("Deleted Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }
    return <Model onClose={onClose} title="Review Details" modalClass="w-1/2!" >
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-3 gap-5 mt-[30px]">
                <CancelButton title="Delete" type="submit" disabled={sending} class_="text-lg!" />
                <SecondaryButton title="Manual Reply" class_="text-lg!" />
                <SecondaryButton title="view full log" onClick={onClose} class_="text-lg!" />
            </div>
        </form>
    </Model>
}

export default ReviewDetails