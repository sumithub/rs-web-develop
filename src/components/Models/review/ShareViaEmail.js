import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import Input from "../../form/Input";
import Model from "../Model";

export default function ShareViaEmail({ onClose, onSave }) {
    return (
        <Model onClose={onClose} title="Share via email" modalClass="w-[60%]!" modalBodyClass="max-h-[90vh]!">
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <Input icon={true} />
                </div>

                <div className="mt-4">
                    <SecondaryButton title="Search Users" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-[32vw]">
                <div className="mt-4 ps-10">
                    <div>Amelie Laurent</div>
                    <div className="font-thin">amili@gmail.com</div>
                </div>

                <div className="mt-8">
                    <div>owner</div>
                </div>
            </div>

            <div>
                <hr className="mt-4" />
                <div className="grid grid-cols-2 gap-[32vw]">
                    <div className="mt-4 ps-10">
                        <div>Amelie Laurent</div>
                        <div className="font-thin">amili@gmail.com</div>
                    </div>

                    <div className="mt-8">
                        <div>owner</div>
                    </div>
                </div>
            </div>

            <div>
                <hr className="mt-4" />
                <div className="grid grid-cols-2 gap-[32vw]">
                    <div className="mt-4 ps-10">
                        <div>Amelie Laurent</div>
                        <div className="font-thin">amili@gmail.com</div>
                    </div>

                    <div className="mt-8">
                        <div>owner</div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="flex gap-3 mt-3">
                        <CancelButton title="copy link" />
                        <CancelButton title="embed code" />
                    </div>

                    <div className="mt-3">
                        <SecondaryButton title="Done" />
                    </div>
                </div>
            </div>
        </Model>
    )
}