import { useForm } from "react-hook-form";
import { getError } from "../../../../helper";
import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import Model from "../Model";
import { useState } from "react";
import { toast } from "react-toastify";
import SelectForm from "../../form/SelectForm";
import axios from "axios";

export default function AdminDashboardModel({ onClose, id }) {
    const { handleSubmit, register, setValue, watch, formState: { errors }, clearErrors } = useForm();
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
            toast.success("Exported Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }

    let title = "Review Trends"

    if (id === "subscription-revenue") {
        title = "Subscription Revenue"
    } else if (id === "campaign-performance") {
        title = "Campaign Performance"
    }
    return (
        <Model onClose={onClose} title={title} modalClass="w-1/2!">
            <form onSubmit={handleSubmit(onSubmit)}>

                {id === "subscription-revenue" && <SelectForm
                    label="By Plan"
                    isRequired={false}
                    defaultOption="select"
                    formProps={{ ...register("plan", { required: false }) }}
                    errors={errors}
                    clearErrors={clearErrors}
                    setValue={setValue}
                    watch={watch}
                >
                    <option value="planA">Plan A</option>
                    <option value="planB">Plan B</option>
                    <option value="planC">Plan C</option>
                </SelectForm>}

                <SelectForm
                    label="By Client"
                    isRequired={false}
                    defaultOption="select"
                    formProps={{ ...register("client", { required: false }) }}
                    errors={errors}
                    clearErrors={clearErrors}
                    setValue={setValue}
                    watch={watch}
                >
                    <option value="clientA">Client A</option>
                    <option value="clientB">Client B</option>
                    <option value="clientC">Client C</option>
                </SelectForm>

                {id === "campaign-performance" && <SelectForm
                    label="By Engagement"
                    isRequired={false}
                    defaultOption="select"
                    formProps={{ ...register("engagement", { required: false }) }}
                    errors={errors}
                    clearErrors={clearErrors}
                    setValue={setValue}
                    watch={watch}
                >
                    <option value="xyz">XYZ..</option>
                </SelectForm>}

                {id === "campaign-performance" && <SelectForm
                    label="By Conversion"
                    isRequired={false}
                    defaultOption="select"
                    formProps={{ ...register("conversion", { required: false }) }}
                    errors={errors}
                    clearErrors={clearErrors}
                    setValue={setValue}
                    watch={watch}
                >
                    <option value="xyz">XYZ..</option>
                </SelectForm>}

                {id === "subscription-revenue" && <SelectForm
                    label="By Billing Cycle"
                    isRequired={false}
                    defaultOption="select"
                    formProps={{ ...register("billing", { required: false }) }}
                    errors={errors}
                    clearErrors={clearErrors}
                    setValue={setValue}
                    watch={watch}
                >
                    <option value="xyz">XYZ..</option>
                </SelectForm>}

                {id === "review-trends" && <SelectForm
                    label="By Location"
                    isRequired={false}
                    defaultOption="select"
                    formProps={{ ...register("location", { required: false }) }}
                    errors={errors}
                    clearErrors={clearErrors}
                    setValue={setValue}
                    watch={watch}
                >
                    <option value="locationA">Location A</option>
                    <option value="locationB">Location B</option>
                </SelectForm>}

                {id === "review-trends" && <SelectForm
                    label="By Sentiment"
                    isRequired={false}
                    defaultOption="select"
                    formProps={{ ...register("sentiment", { required: false }) }}
                    errors={errors}
                    clearErrors={clearErrors}
                    setValue={setValue}
                    watch={watch}
                >
                    <option value="positive">Positive</option>
                    <option value="negative">Negative</option>
                </SelectForm>}
                <div className="grid grid-cols-3 gap-5 mt-7">
                    <CancelButton title="View Full Report" onClick={onClose} />
                    <SecondaryButton title="Apply Filters" class_="bg-white! hover:bg-primary! font-normal! text-primary! hover:text-white!" onClick={() => {
                        onClose()
                        toast.success("Applied SuccessFully")
                    }} />
                    <SecondaryButton title="Export" type="submit" disabled={sending} />
                </div>
            </form>
        </Model>
    )
}