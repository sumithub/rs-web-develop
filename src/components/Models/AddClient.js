import Input from "../form/Input";
import Model from "./Model";

export default function AddClient({ onClose, onSave, }) {
    return <Model onClose={onClose} title="add client" modalClass="w-[60%]!">
        <div>
            <Input label="Event Type" isRequired={true} />
            <Input label="Condition" isRequired={true} />
        </div>
    </Model>
}