import InputForm from "../../form/InputForm";
import Model from "../Model";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../../../../helper";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";

export default function RenameList({ onClose, id }) {
    const { register, handleSubmit, formState: { errors }, } = useForm();
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

            toast.success("Renamed Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }
    return (
        <Model onClose={onClose} title="Rename List" modalClass="w-1/2!">
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputForm
                    class_="mt-1!"
                    label="Add New Name"
                    isRequired={true}
                    placeholder="Enter Name"
                    formProps={{ ...register("addNewName", { required: true }) }}
                    errors={errors} />

                <div className="grid grid-cols-2 gap-3 mt-3">
                    <CancelButton title="Cancel" onClick={onClose} />
                    <SecondaryButton title="save" type="submit" disabled={sending} />
                </div>
            </form>
        </Model>
    )
}