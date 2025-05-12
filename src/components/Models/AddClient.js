import Input from "../form/Input";
import Model from "./Model";
import CancelButton from "../common/CancelButton"
import SecondaryButton from "../common/SecondaryButton";

export default function AddClient({ onClose, onSave, }) {
    return <Model onClose={onClose} title="add client" modalClass="w-[60%]!">
        <div>
            <Input label="Event Type" isRequired={true} />
            <Input label="Condition" isRequired={true} />
        </div>

        <div className="grid grid-cols-2 gap-3 mt-3">
            <CancelButton />
            <SecondaryButton title="save" />
        </div>
    </Model>
}