import Image from "next/image";
import Model from "./Model";
import CancelButton from "../common/CancelButton";
import SecondaryButton from "../common/SecondaryButton";

export default function RemoveUser({ onClose }) {
    return <Model onClose={onClose} modalClass="w-[30%]!" closeButton={false} closeButton2={true} modelHeaderClass="bg-white!">
        <div className="flex flex-col items-center justify-center gap-y-4">
            <Image src="/images/b-delete.svg" alt="delete" height={60} width={60} />
            <div className="text-xl text-danger2 font-semibold">Remove User</div>
            <div className="text-sm text-text3">Are You Sure you want to Remove this user permanently?</div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-5">
            <CancelButton class_="border-danger2! bg-white! text-danger2!" />
            <SecondaryButton title="Remove permanently" />

        </div>

    </Model>
}