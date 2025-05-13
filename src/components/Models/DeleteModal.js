
import CancelButton from "../common/CancelButton";
import SecondaryButton from "../common/SecondaryButton";
import Image from "next/image";
import Model from "./Model";

export default function DeleteModal({ onClose, title = "user" }) {
    return <Model onClose={onClose} modalClass="w-[30%]!" closeButton={false} closeButton2={true} modelHeaderClass="bg-white!">
        <DeleteUser title={`Remove ${title}`} question={`Are You Sure you want to Remove this ${title} permanently?`} />

        {/* <DeleteUser title="remove user confirmation" question="Are You Sure you want to Remove this user permanently?" /> */}

        <div className="grid grid-cols-2 gap-3 mt-5">
            <CancelButton title="Cancel" class_="border-danger2! bg-white! text-danger2!" />
            <SecondaryButton title="Remove permanently" />
        </div>
    </Model>
}

const DeleteUser = ({ title, question }) => {
    return <div className="flex flex-col items-center justify-center gap-y-4">
        <Image src="/images/b-delete.svg" alt="delete" height={60} width={60} />
        <div className="text-xl text-danger2 font-semibold capitalize">{title}</div>
        <div className="text-sm text-text3 capitalize">{question}</div>
    </div>
}
