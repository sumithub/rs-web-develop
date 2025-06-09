"use client"
import SecondaryButton from "../../common/SecondaryButton";
import CancelButton from "../../common/CancelButton";
import Model from "../Model";
import { toast } from "react-toastify";
import { getError } from "../../../../helper";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import InputForm from "../../form/InputForm";
import Rating from "../../form/Rating";
import DatePickerForm from "../../form/DatePickerForm";
import ImageUpload from "../../form/ImageUpload"

export default function AddManualReview({ onClose, onSave, id }) {
    const { register, handleSubmit, setValue, formState: { errors }, watch, clearErrors, trigger } = useForm();
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

            toast.success("Review Added Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }
    return (
        <Model onClose={onClose} title="Add Manual Review" modalClass="w-[60%]!">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div>
                        <Rating
                            label="Add Rating"
                            isRequired={true}
                            count={5}
                            formProps={{ ...register("rating", { required: true }) }}
                            errors={errors}
                            setValue={setValue}
                            watch={watch}
                            clearErrors={clearErrors}
                            trigger={trigger}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <InputForm label="First Name" isRequired={true}
                            formProps={{ ...register("firstName", { required: true }) }}
                            inputClass="border-primary/10!"
                            errors={errors}
                            setValue={setValue} />

                        <InputForm label="Last Name" isRequired={true}
                            formProps={{ ...register("lastName", { required: true }) }}
                            errors={errors}
                            setValue={setValue} />
                    </div>

                    <div>

                        <ImageUpload
                            label="Add Image"
                            isRequired={true}
                            formProps={{
                                ...register("profileImage", {
                                    required: true
                                }),
                                name: "profileImage"
                            }}
                            errors={errors}
                            setValue={setValue}
                            watch={watch}
                            clearErrors={clearErrors}
                            trigger={trigger}
                        />
                    </div>

                    <div>
                        <InputForm label="Feedback" isRequired={true}
                            formProps={{ ...register("feedback", { required: true }) }}
                            errors={errors} />
                    </div>

                    <div>
                        <DatePickerForm label="Date" isRequired={true} icon={true}
                            formProps={{ ...register("date", { required: true }) }}
                            errors={errors} clearErrors={clearErrors} setValue={setValue} watch={watch}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-5">
                        <CancelButton title="Cancel" onClick={onClose} />
                        <SecondaryButton title="Add Review" type="submit" disabled={sending} />
                    </div>
                </div>
            </form>
        </Model>
    )
}