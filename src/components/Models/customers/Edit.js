import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import Input from "../../form/Input";
import Model from "../Model";

export default function CreateTag({ onClose, onSave }) {
    return (
        <Model onClose={onClose} title="Edit" modalClass="w-1/2! ">
            <div>
                <Input label="Tag Name" isRequired={true} placeholder="Enter Name" />
                <Input label="Color Picker" />
                <Input label="Description" isTextArea={true} />
            </div>

            <div className="grid grid-cols-2 gap-3 mt-3">
                <CancelButton title="Cancel" onClick={onClose}/>
                <SecondaryButton title="save" />
            </div>
        </Model>
    )
}