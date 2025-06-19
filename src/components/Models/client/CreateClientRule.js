"use client"
import { useState } from "react"
import CancelButton from "../../common/CancelButton"
import SecondaryButton from "../../common/SecondaryButton"
import InputForm from "../../form/InputForm"
import SelectForm from "../../form/SelectForm"
import Model from "../Model"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import axios from "axios"
import { getError } from "../../../../helper"
import CheckboxForm from "../../form/CheckboxForm"
import RadioForm from "../../form/RadioForm"
import Image from "next/image"
import StarRangeSlider from "../../StartRatingSlider"

function CreateClientRule({ onClose, id, isCreate }) {
    const { register, handleSubmit, clearErrors, setValue, watch, formState: { errors } } = useForm();
    const [sending, setSending] = useState(false)
    const [enabled, setEnabled] = useState(false)
    const [auto, setAuto] = useState(false)
    const [support, setSupport] = useState(false)
    const [notify, setNotify] = useState(false)
    const [emailTo, setEmailTo] = useState(false)
    const [performance, setPerformance] = useState(false)
    const [sendNotification, setSendNotification] = useState(false)
    const [escalate, setEscalate] = useState(false)
    const [audit, setAudit] = useState(false)
    const [reviewTo, setReviewTo] = useState(false)
    const [markReview, setMarkReview] = useState(false)
    const [compliance, setCompliance] = useState(false)
    const [type, setType] = useState("")

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

    let title = isCreate ? "Create Client Rule" : "Edit Client Rule"

    if (type === "positiveReview") {
        title = "Positive Review"
    } else if (type === "reviewResponseReceived") {
        title = "Review Response Received"
    } else if (type === "reviewDeleted") {
        title = "Review Deleted"
    }

    return <Model onClose={onClose} title={title} modalClass="w-1/2!">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                {!isCreate && <InputForm
                    label="Client Rule ID"
                    disabled="clientRuleId"
                    placeholder="CR-001"
                    isRequired={false}
                    class_="mt-0!"
                    inputClass="border-primary/10"
                    formProps={{ ...register("clientRuleId", { required: false }) }}
                    errors={errors}
                    setValue={setValue}
                />}

                <SelectForm label="Event Type"
                    selectClass_="py-3.5! px-2.5! border-primary/10!"
                    isRequired={true}
                    formProps={{ ...register("eventType", { required: true }) }}
                    errors={errors}
                    clearErrors={clearErrors}
                    watch={watch}
                    setValue={setValue}
                    onChange={(e) => {
                        setType(e.target.value)
                    }}>
                    <option value="negativeReview">Negative Review</option>
                    <option value="newReview">New Review</option>
                    <option value="flaggedReview">Flagged Review</option>
                    <option value="positiveReview">Positive Review</option>
                    <option value="reviewResponseReceived">Review Response Received</option>
                    <option value="reviewDeleted">Review Deleted</option>
                </SelectForm>

                {(!type) && (<>
                    <InputForm label="Condition" placeholder="Enter condition" isRequired={true} errors={errors}
                        inputClass="border-primary/10"
                        formProps={{
                            ...register("condition", {
                                required: true,
                            })
                        }}
                    />

                    <SelectForm label="Action"
                        selectClass_="py-3.5! px-2.5! border-primary/10!"
                        isRequired={true}
                        formProps={{ ...register("action", { required: true }) }}
                        errors={errors} clearErrors={clearErrors} setValue={setValue} watch={watch}>
                        <option value="sendNotification">Send Notification</option>
                        <option value="sendAlert">Send Alert</option>
                    </SelectForm>

                    <div className='flex gap-2.5 items-center mt-4'>
                        <CheckboxForm
                            checked={enabled}
                            onChange={(e) => setEnabled(e.target.checked)}
                            formProps={{ ...register("enabled") }} errors={errors} />
                        <div>
                            Enabled
                        </div>
                    </div>

                    <InputForm label="Client" placeholder="Enter client name" isRequired={true} errors={errors}
                        inputClass="border-primary/10"
                        formProps={{
                            ...register("client", {
                                required: true,
                            })
                        }}
                    />

                    <SelectForm label="Location"
                        selectClass_="py-3.5! px-2.5! border-primary/10!"
                        isRequired={true}
                        formProps={{ ...register("location", { required: true }) }}
                        errors={errors}
                        clearErrors={clearErrors}
                        setValue={setValue}
                        watch={watch}
                    >

                        <option value="nyc">NYC</option>
                        <option value="la">LA</option>
                        <option value="mgBhu">MG BHU</option>
                        <option value="ghnFtgvVftttt">GHN FTGV VFTTTT</option>
                    </SelectForm>
                </>)}
            </div>

            {(type === "flaggedReview" || type === "positiveReview" || type === "negativeReview") && (
                <SelectForm label="Rule Condition"
                    selectClass_="py-3.5! px-2.5! border-primary/10!"
                    isRequired={true}
                    defaultOption="Select Condition"
                    formProps={{ ...register("ruleCondition", { required: true }) }}
                    errors={errors}
                    clearErrors={clearErrors} setValue={setValue} watch={watch}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>

                </SelectForm>
            )}

            {(type === "positiveReview" || type === "negativeReview") && (
                <div className="mt-3 flex justify-between">
                    <div>Threshold Rating</div>
                    <StarRangeSlider />
                </div>
            )}

            {(type === "newReview") && (<div>
                <div className="mt-6 font-semibold text-xl">
                    Rule Condition
                </div>

                <div className='flex gap-2.5 items-center mt-4'>
                    <CheckboxForm
                        checked={auto}
                        onChange={(e) => setAuto(e.target.checked)}
                        formProps={{ ...register("autoApproveReview") }} errors={errors} />
                    <div>
                        Auto-Approve Review
                    </div>
                </div>
                <div className='flex gap-2.5 items-center mt-4'>
                    <CheckboxForm
                        checked={support}
                        onChange={(e) => setSupport(e.target.checked)}
                        formProps={{ ...register("supportTeam") }} errors={errors} />
                    <div>
                        Send Notification To Support Team
                    </div>
                </div>

                <div className="mt-6 font-semibold text-xl">
                    Additional Action
                </div>
                <div className='flex gap-2.5 items-center mt-4'>
                    <CheckboxForm
                        checked={emailTo}
                        onChange={(e) => setEmailTo(e.target.checked)}
                        formProps={{ ...register("emailToReviewer") }} errors={errors} />
                    <div>
                        Trigger Welcome Email To Reviewer
                    </div>
                </div>
            </div>)}

            {(type === "flaggedReview") && (<div>
                <div className="mt-6 font-semibold text-xl">
                    Additional Action
                </div>

                <RadioForm
                    label="Auto-Hide Review"
                    name="additionalAction"
                    formProps={{ ...register("additionalAction", { required: false }) }}
                    errors={errors} />

                <RadioForm
                    label="Notify Moderator Immediately"
                    name="additionalAction"
                    formProps={{ ...register("additionalAction", { required: false }) }}
                    errors={errors} />

                <RadioForm
                    label="Mark For Review"
                    name="additionalAction"
                    formProps={{ ...register("additionalAction", { required: false }) }}
                    errors={errors} />
            </div>)}

            {(type === "reviewResponseReceived") && (<div>
                <div className='flex gap-2.5 items-center mt-4'>
                    <CheckboxForm
                        checked={notify}
                        onChange={(e) => setNotify(e.target.checked)}
                        formProps={{ ...register("notifyAccountManager") }} errors={errors} />
                    <div>
                        Notify Account Manager
                    </div>
                </div>
                <div className='flex gap-2.5 items-center mt-4'>
                    <CheckboxForm
                        checked={performance}
                        onChange={(e) => setPerformance(e.target.checked)}
                        formProps={{ ...register("performanceMetrics") }} errors={errors} />
                    <div>
                        Log Response Time For Performance Metrics
                    </div>
                </div>
            </div>)}

            {(type === "reviewDeleted") && (<div>
                <div className="mt-4 flex gap-2.5 items-center  bg-custom-yellow-light/7 p-3 rounded-lg">
                    <Image unoptimized={true} src="/images/warning-2.svg" alt="warning-2" width={22} height={22} />
                    <h2 className="text-sm font-medium capitalize">This rule triggers automatically upon deletion.</h2>
                </div>

                <div className="mt-4 font-semibold text-xl">
                    Additional Action
                </div>

                <div className='flex gap-2.5 items-center mt-4'>
                    <CheckboxForm
                        checked={audit}
                        onChange={(e) => setAudit(e.target.checked)}
                        formProps={{ ...register("auditPurposes") }} errors={errors} />
                    <div>
                        Log Deletion Event For Audit Purposes
                    </div>
                </div>
                <div className='flex gap-2.5 items-center mt-4'>
                    <CheckboxForm
                        checked={compliance}
                        onChange={(e) => setCompliance(e.target.checked)}
                        formProps={{ ...register("complianceTeam") }} errors={errors} />
                    <div>
                        Notify Compliance Team
                    </div>
                </div>
            </div>)}

            {(type === "positiveReview") && (<div>
                <div className="mt-4 font-semibold text-xl">
                    Action
                </div>

                <div className='flex gap-2.5 items-center mt-4'>
                    <CheckboxForm
                        checked={reviewTo}
                        onChange={(e) => setReviewTo(e.target.checked)}
                        formProps={{ ...register("reviewToTestimonials") }} errors={errors} />
                    <div>
                        Auto-Promote Review To Testimonials
                    </div>
                </div>
                <div className='flex gap-2.5 items-center mt-4'>
                    <CheckboxForm
                        checked={markReview}
                        onChange={(e) => setMarkReview(e.target.checked)}
                        formProps={{ ...register("markReviewAsFeatured") }} errors={errors} />
                    <div>
                        Mark Review As Featured
                    </div>
                </div>
            </div>)}

            {(type === "negativeReview") && (<div>
                <div className="mt-4 font-semibold text-xl">
                    Additional Action
                </div>

                <div className='flex gap-2.5 items-center mt-4'>
                    <CheckboxForm
                        checked={sendNotification}
                        onChange={(e) => setSendNotification(e.target.checked)}
                        formProps={{ ...register("sendNotificationToSupportTeam") }} errors={errors} />
                    <div>
                        Send Notification To Support Team
                    </div>
                </div>
                <div className='flex gap-2.5 items-center mt-4'>
                    <CheckboxForm
                        checked={escalate}
                        onChange={(e) => setEscalate(e.target.checked)}
                        formProps={{ ...register("escalateAlert") }} errors={errors} />
                    <div>
                        Escalate Alert To Manager
                    </div>
                </div>
            </div>)}

            <div className="grid grid-cols-2 gap-3 mt-[30px]">
                <CancelButton title="Cancel" onClick={onClose} class_="text-lg!" />
                <SecondaryButton title={type === "newReview" || type === "flaggedReview" || type === "reviewResponseReceived" || type === "reviewDeleted" || type === "positiveReview" || type === "negativeReview" ? "Save Rule" : "Save"} type="submit" disabled={sending} class_="text-lg!" />
            </div>
        </form>
    </Model>
}

export default CreateClientRule