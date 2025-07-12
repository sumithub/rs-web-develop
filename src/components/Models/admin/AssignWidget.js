import { useForm } from "react-hook-form";
import Model from "../Model";
import SecondaryButton from "../../common/SecondaryButton";
import SelectForm from "../../form/SelectForm";
import InputForm from "../../form/InputForm";
import CancelButton from "../../common/CancelButton";
import { useState } from "react";
import { toast } from "react-toastify";
import { getError } from "../../../../helper";
import axios from "axios";
import CheckboxForm from "../../form/CheckboxForm";
import SelectClientList from "../../Models/admin/SelectClientList"

export default function AssignWidget({ onClose, id }) {
    const { register, handleSubmit, setValue, formState: { errors }, watch, clearErrors } = useForm();
    const [sending, setSending] = useState("")
    const [openClient, setOpenClient] = useState(false)

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

    let title = "Assign Widget"

    if (id === "editWidget") {
        title = "Edit Widget"
    }

    return (
        <Model onClose={onClose} title={title} modalClass="w-1/2!">
            {openClient &&
                <SelectClientList
                    onClose={() => {
                        setOpenClient(false)
                    }}

                    onSave={() => {
                        setOpenClient(true)
                    }} />
            }
            <form onSubmit={handleSubmit(onSubmit)}>
                {(id === "assignWidget" || id === "assignWidgets") && <div className="flex justify-between items-center">
                    <div className="font-semibold text-base">Select Clients From List</div>

                    <SecondaryButton title="Add Clients" onClick={() => setOpenClient(true)} class_="text-xs! py-2.5!" />
                </div>}
                {id === "editWidget" && <InputForm
                    inputClass='border-primary/10! focus:border-primary/60! py-3.5!'
                    label="Widget Name"
                    class_="mt-0!"
                    isRequired={true}
                    placeholder="Enter widget name"
                    formProps={{ ...register("widgetName", { required: true }) }}
                    errors={errors}
                />}

                {id !== "assignWidgets" && <SelectForm
                    label="Widget Type"
                    isRequired={true}
                    selectClass_="bg-white! py-3! border-primary/10! focus:border-primary/60! py-3.5!"
                    formProps={{ ...register("widgetType", { required: true }) }} errors={errors} clearErrors={clearErrors}
                    setValue={setValue}
                    watch={watch}
                >
                    <option value="carousel">Carousel</option>
                    <option value="gridWidget">Grid Widget</option>
                    <option value="testimonialWidget">Testimonial Widget</option>
                    <option value="starBadgeWidget">Star Badge Widget</option>
                    <option value="floatingButtonWidget">Floating Button Widget</option>
                </SelectForm>}

                {id !== "assignWidgets" && <InputForm
                    inputClass='border-primary/10! focus:border-primary/60! py-3.5!'
                    label="Discription"
                    isTextArea={true}
                    rows={5}
                    isRequired={false}
                    placeholder="XYZ.."
                    formProps={{ ...register("discription", { required: false }) }}
                    errors={errors}
                />}

                {id !== "assignWidgets" && <SelectForm
                    label="Status"
                    isRequired={true}
                    selectClass_="bg-white! py-3! border-primary/10! focus:border-primary/60! py-3.5!"
                    formProps={{ ...register("status", { required: true }) }} errors={errors} clearErrors={clearErrors}
                    setValue={setValue}
                    watch={watch}
                >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                </SelectForm>}

                {id === "assignWidgets" &&
                    <div className='flex gap-2.5 items-center mt-4'>
                        <CheckboxForm
                            formProps={{ ...register("applyToAllClients") }} errors={errors} />
                        <div className="text-sm ">
                            Apply To All Clients
                        </div>
                    </div>}

                <div className="grid grid-cols-2 gap-5 mt-7">
                    <CancelButton title="Cancel" onClick={onClose} class_="text-lg!" />
                    <SecondaryButton title="Save" type="submit" disabled={sending} class_="text-lg!" />
                </div>
            </form>
        </Model>
    )
}  