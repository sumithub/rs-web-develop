
import Image from "next/image";
import Model from "../Model";
import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../../../../helper";
import { useState } from "react";

export default function DeletePlan({ onClose, title = "Plan" }) {
    const { handleSubmit } = useForm();
    const [sending, setSending] = useState(false);

    const onSubmit = async () => {
        try {
            setSending(true);
            await axios.put("/api");
            toast.success("Plan Deleted Successfully");
            onClose();
        } catch (error) {
            toast.error(getError(error));
        } finally {
            setSending(false);
        }
    };

    return <Model onClose={onClose} modalClass="w-[30%]!" closeButton={false} closeButton2={true} modelHeaderClass="bg-white!">
        <form onSubmit={handleSubmit(onSubmit)} className="text-center">
            <DeleteTag title={`Delete ${title}`} question="Are You Sure? You want To Delete This plan." />

            <div className="grid grid-cols-2 gap-3 mt-5">
                <CancelButton title="Cancel" class_="border-danger2! hover:bg-danger! bg-white! text-danger2! hover:text-white!" onClick={onClose}
                />
                <SecondaryButton title=" Yes, Delete" type="submit" disabled={sending} />
            </div>
        </form>
    </Model >
}

const DeleteTag = ({ title, question }) => {
    return <div className="flex flex-col items-center justify-center gap-y-4">
        <Image unoptimized={true} src="/images/b-delete.svg" alt="delete" height={60} width={60} />
        <div className="text-xl text-danger2 font-semibold capitalize">{title}</div>
        <div className="text-sm text-text3 capitalize text-center">{question}</div>
    </div>
}
