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
import LogoUpload from "../../form/LogoUpload";

export default function AddReviewSource({ onClose, id }) {
    const { handleSubmit, register, setValue, watch, formState: { errors }, clearErrors, reset } = useForm();
    const [file, setFile] = useState(null)
    const [sending, setSending] = useState(false)
    const [enabled, setEnabled] = useState(false)

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

            // Reset form and file state after successful submission
            reset()
            setFile(null)
            setEnabled(false)

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
                    labelClass="mb-2.5!"
                    class_="mt-0!"
                    placeholder="Enter platform name"
                    isRequired={true}
                    formProps={{ ...register("name", { required: true }) }}
                    errors={errors} />

                <LogoUpload
                    accept="image/*,.csv,.xls,.xlsx"
                    class_="mt-3.5!"
                    formProps={{
                        ...register('logoFile', {
                            required: true,
                        })
                    }}
                    setFile={setFile}
                    selectedFile={file}
                    errors={errors}
                    isRequired={true}
                    label="Upload Logo Here"
                    showToast={(message) => toast.error(message)}
                />

                <InputForm
                    label="URL Validation Rule"
                    labelClass="mb-2.5!"
                    placeholder="Add URL"
                    hideOptional={true}
                    isRequired={true}
                    icon2="/images/add-link.svg"
                    formProps={{ ...register("url", { required: true }) }}
                    errors={errors}
                    clearErrors={clearErrors}
                />

                <InputForm
                    label="API Key"
                    labelClass="mb-2.5!"
                    placeholder="Enter key"
                    isRequired={false}
                    formProps={{ ...register("industry", { required: false }) }}
                    errors={errors} />

                <div className="mt-3.5">
                    <div className="text-sm pb-2.5">Popular Platform</div>
                    <div className="grid grid-cols-4 gap-2.5">
                        <div className="flex justify-between items-center bg-primary/5 rounded-lg p-2.5">
                            <div className="text-sm">Yes</div>
                            <RadioForm
                                name="popularPlatform"
                                class_="mt-0!"
                                formProps={{ ...register("popularPlatform") }}
                                value="yes"
                            />
                        </div>
                        <div className="flex justify-between items-center bg-primary/5 rounded-lg p-2.5">
                            <div className="text-sm">No</div>
                            <RadioForm
                                name="popularPlatform"
                                class_="mt-0!"
                                labelClass="ml-0!"
                                formProps={{ ...register("popularPlatform") }}
                                value="no"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-3.5">
                    <div className="text-sm pb-2.5 font-medium">Status</div>
                    <div className="bg-primary/5 rounded-lg p-2.5">
                        <div className="flex items-center gap-3.5">
                            <div className="text-sm font-medium">{enabled ? "Active" : " Inactive"}</div>
                            <Switch
                                checked={enabled}
                                onChange={setEnabled}
                                class_={`${enabled ? 'bg-green-500' : 'bg-gray-300'
                                    } relative inline-flex h-4 w-9 items-center rounded-full transition mb-0!`} />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-5 mt-7">
                    <CancelButton title="Cancel" onClick={onClose} class_="text-lg!" />
                    <SecondaryButton
                        title="Save"
                        type="submit"
                        disabled={sending}
                        class_="text-lg!"

                    />
                </div>
            </form>
        </Model>
    )
}