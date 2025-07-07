import { useForm } from "react-hook-form";
import { getError } from "../../../../helper";
import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import Model from "../Model";
import { useState } from "react";
import { toast } from "react-toastify";
import InputForm from "../../form/InputForm";
import axios from "axios";
import RadioForm from "../../form/RadioForm";
import Switch from "../../form/Switch";
import FileInput from "../../form/FileInput";

export default function AddReviewSource({ onClose, id }) {
    const { handleSubmit, register, setValue, watch, formState: { errors }, clearErrors } = useForm();
    const [file, setFile] = useState(null)
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
            toast.success("Saved Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }
    return (
        <Model onClose={onClose} title={`${!id ? "Add" : "Edit"} Review Source`} modalClass="w-1/2!">
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputForm
                    label="Platform Name"
                    class_="mt-0!"
                    placeholder="Enter platform name"
                    isRequired={true}
                    formProps={{ ...register("name", { required: true }) }}
                    errors={errors} />

                <FileInput
                    accept=".csv, .xls , .xlsx"
                    class_="mt-3"
                    formProps={{
                        ...register('csvFile', {
                            required: true,
                        })
                    }}
                    setFile={setFile}
                    selectedFile={file}
                    errors={errors}
                    isRequired={true}
                    label="Upload Logo Here"
                    showToast={toast.error}
                />

                <InputForm
                    label="URL Validation Rule"
                    placeholder="Add URL"
                    hideOptional={true}
                    isRequired={true}
                    icon="/images/add-link.svg"
                    formProps={{ ...register("url", { required: true }) }}
                    errors={errors}
                    clearErrors={clearErrors}
                />

                <InputForm
                    label="API Key"
                    placeholder="Enter key"
                    isRequired={false}
                    formProps={{ ...register("industry", { required: false }) }}
                    errors={errors} />

                <div className="mt-3">
                    <div>Popular Platform</div>
                    <div className="flex justify-between items-center">
                        <div>Yes</div>
                        <RadioForm name="popularPlatform" />
                    </div>
                    <div className="flex justify-between items-center">
                        <div>No</div>
                        <RadioForm name="popularPlatform" />
                    </div>
                </div>

                <div className="mt-3">
                    <div>Status</div>
                    <div className="flex justify-between">
                        <div>Inactive</div>
                        <Switch />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-5 mt-7">
                    <CancelButton title="Cancel" onClick={onClose} />
                    <SecondaryButton title="Save" type="submit" disabled={sending} />
                </div>
            </form>
        </Model>
    )
}