"use client"
import SecondaryButton from "../../common/SecondaryButton";
import CancelButton from "../../common/CancelButton";
import DatePicker from "../../form/DatePicker";
import Model from "../Model";
import { toast } from "react-toastify";
import { getError } from "../../../../helper";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import InputForm from "../../form/InputForm";
import Rating from "../../form/Rating";

export default function AddManualReview({ onClose, onSave, id }) {
    const { register, handleSubmit, setValue, watch, formState: { errors }, } = useForm();
    const [sending, setSending] = useState(false)
    const [date, setDate] = useState("")

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
                        />
                        {/* <InputForm label="Add Rating" isRequired={true}
                            formProps={{ ...register("addRating", { required: true }) }}
                            errors={errors}
                            setValue={setValue} /> */}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <InputForm label="First Name" isRequired={true}
                            formProps={{ ...register("firstName", { required: true }) }}
                            errors={errors}
                            setValue={setValue} />
                        <InputForm label="Last Name" isRequired={true}
                            formProps={{ ...register("lastName", { required: true }) }}
                            errors={errors}
                            setValue={setValue} />
                    </div>

                    <div>
                        <InputForm label="Add Image" placeholder="Upload Image" isRequired={true}
                            formProps={{ ...register("addImage", { required: true }) }}
                            errors={errors}
                        />
                    </div>

                    <div>
                        <InputForm label="Feedback" isRequired={true}
                            formProps={{ ...register("feedback", { required: true }) }}
                            errors={errors} />
                    </div>

                    <div>
                        <DatePicker label="Date" icon={true}
                            class_="py-3! px-2.5!"
                            isRequired={true}
                            value={date}
                            dateFormat="dd/MM/yyyy"
                            onChange={(e) => setDate(e)}
                            formProps={{ ...register("date", { required: true }) }}
                            errors={errors}
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