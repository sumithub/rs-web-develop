import Image from "next/image";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import Model from "../Model";

export default function DeleteList({ onClose, id }) {
    const { handleSubmit } = useForm();
    const [sending, setSending] = useState(false);

    const onSubmit = async () => {
        try {
            setSending(true);
            await axios.put("/api");
            toast.success(`${id ? "Alert" : "List"}  Deleted Successfully`);
            onClose();
        } catch (error) {
            toast.error(getError(error));
        } finally {
            setSending(false);
        }
    };

    let title = id ? "Alert" : "List";
    return <Model onClose={onClose} modalClass="w-[30%]!" closeButton={false} closeButton2={true} modelHeaderClass="bg-white!">
        <form onSubmit={handleSubmit(onSubmit)} className="text-center">
            <DeleteUser title={`Delete ${title}`} question={id ? "Are You Sure? You want To Delete This Alert." : "Confirmation prompt before deletion."} />

            <div className="grid grid-cols-2 gap-3 mt-5">
                <CancelButton title="Cancel" class_="border-danger2! hover:bg-danger! bg-white! text-danger2! hover:text-white!" onClick={onClose} />
                <SecondaryButton title="Yes, Delete" type="submit" disabled={sending} />
            </div>
        </form>
    </Model>
}

const DeleteUser = ({ title, question }) => {
    return <div className="flex flex-col items-center justify-center gap-y-4">
        <Image unoptimized={true} src="/images/b-delete.svg" alt="delete" height={60} width={60} />
        <div className="text-xl text-danger2 font-semibold capitalize">{title}</div>
        <div className="text-sm text-text3 capitalize">{question}</div>
    </div>
}
