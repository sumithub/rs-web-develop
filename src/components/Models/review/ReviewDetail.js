"use client"
import Image from "next/image";
import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import Model from "../Model";
import Link from "next/link";
import SelectForm from "../../form/SelectForm";
import { toast } from "react-toastify";
import axios from "axios";
import { getError } from "../../../../helper";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ReviewCard from "../../ReviewCard";
import HtmlEditor from "../../form/HtmlEditor";

export default function ReviewDetail({ onClose, onSave, id }) {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [sending, setSending] = useState(false)
    const [status, setStatus] = useState("")
    const copy = () => {
        try {
            toast.success("Copied Successfully")
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }
    const onSubmit = async (data) => {
        try {
            setSending(true)
            let res = null

            if (id !== "add") {
                res = await axios.put("/api", data)
            } else {
                res = await axios.post("/api", data)
            }

            toast.success("Responded Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }
    return (
        <Model onClose={onClose} title={status === "noActionRequired" ? "No Action Required" : "Review Detail"} modalClass="w-[60%]!">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    {status === "noActionRequired" && <div>
                        <div>
                            <ReviewCard title="Zain Levin" />
                        </div>

                        <div className="mt-3 ps-[10vw] capitalize">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the .
                        </div>
                    </div>}
                    {status !== "noActionRequired" && (<>
                        <div className="flex pt-1 items-center justify-between w-4/5">
                            <div className="flex items-start w-full gap-[15px]">
                                <Image src="/images/request.png" alt="request" width={46} height={46} />
                                <div className="w-full">
                                    <div className="flex justify-between">
                                        <div className="">
                                            <h2 className="text-base font-semibold">Zain Levin</h2>
                                            <h3 className="text-sm text-text3 pt-1.5">ZainLevin@gmail.com</h3>
                                        </div>
                                        <div className="flex items-center gap-[15px]">
                                            <div className="flex items-center gap-3">
                                                <Image src="/images/star.svg" alt="rating" height={18} width={18} unoptimized={true} />
                                                <Image src="/images/star.svg" alt="rating" height={18} width={18} unoptimized={true} />
                                                <Image src="/images/star.svg" alt="rating" height={18} width={18} unoptimized={true} />
                                                <Image src="/images/star.svg" alt="rating" height={18} width={18} unoptimized={true} />
                                                <Image src="/images/star.svg" alt="rating" height={18} width={18} unoptimized={true} />
                                            </div>
                                            <h2 className="text-sm">Jun 11,2024</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h2 className="w-4/5 ml-auto capitalize mt-[15px] text-xs">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the .</h2>
                    </>)}
                    <div>
                        <SelectForm
                            class_="mt-[15px]! w-[10%]!"
                            selectClass_="rounded-full! py-2! px-2.5!"
                            defaultOption="select"
                            formProps={{ ...register("status", { required: false }) }}
                            errors={errors}
                            onChange={(e) => {
                                setStatus(e.target.value)
                            }}
                        >
                            <option value="noActionRequired">No action Required</option>
                            <option value="actionRequired">Action required</option>
                            <option value="draft">Draft</option>
                            <option value="responded">Responded</option>
                        </SelectForm>
                        <HtmlEditor />
                    </div>

                    {status !== "noActionRequired" && (<div>
                        <h2 className="text-lg font-medium pt-[15px]">Additional Sharing Options:</h2>
                        <div className="flex gap-[18px] pt-2.5">
                            <Link href="https://www.google.com/" target="_blank" className="px-5">
                                <Image unoptimized={true} src="/images/google.svg" alt="google" width={41} height={41} className="mx-auto" />
                                <h2 className="text-sm text-center font-medium pt-[15px]">Google</h2>
                            </Link>
                            <Link href="https://www.trustpilot.com/" target="_blank" className="px-5">
                                <Image unoptimized={true} src="/images/trustpilot.svg" alt="trustpilot" width={41} height={41} className="mx-auto" />
                                <h2 className="text-sm text-center font-medium pt-[15px]">Trustpilot</h2>
                            </Link>
                        </div>
                    </div>)}
                    <div className={`grid ${status === "noActionRequired" ? "grid-cols-3" : "grid-cols-2"} gap-3 mt-[30px] justify-between"`}>
                        <CancelButton
                            title="copy reply"
                            class_="text-lg! font-medium! py-3"
                            onClick={copy}
                        />
                        {status === "noActionRequired" && <SecondaryButton
                            title="Share"
                            class_="text-lg! font-medium! py-3"
                            onClick={() => {
                                toast.success("Shared Successfully")
                                onClose()
                            }} />}
                        <SecondaryButton
                            title="mark as responded"
                            class_="text-lg! font-medium! py-3 "
                            type="submit"
                            disabled={sending}
                        />
                    </div>
                </div>
            </form>
        </Model>
    )
}