"use client"
import { toast } from "react-toastify"
import Model from "../Model"
import { getError } from "../../../../helper"
import axios from "axios"
import CancelButton from "../../common/CancelButton"
import SecondaryButton from "../../common/SecondaryButton"
import { useForm } from "react-hook-form"
import { useState } from "react"

function CustomerJourney({ onClose, onSave }) {
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
            <div className="grid grid-cols-2 gap-3">
                <CancelButton title="Cancel" onClick={onClose} />
                <SecondaryButton title="Delete Event" />
                <SecondaryButton title="Edit Event" type="submit" disabled={sending} onClick={onSubmit} />
            </div>
        </form>
    </Model>
}

export default CustomerJourney