
import CancelButton from "../../common/CancelButton"
import Model from "../Model";
import SecondaryButton from "../../common/SecondaryButton"
import Image from "next/image";

export default function RemoveUser({ onClose }) {
    return <Model onClose={onClose} modalClass="w-[30%]!" closeButton={false} closeButton2={true} modelHeaderClass="bg-white!">
        <DeleteUser title="Remove User" question="Are You Sure you want to Remove this user permanently?" />

        {/* <DeleteUser title="remove user confirmation" question="Are You Sure you want to Remove this user permanently?" /> */}

        <div className="grid grid-cols-2 gap-3 mt-5">
            <CancelButton class_="border-danger2! bg-white! text-danger2!" />
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
