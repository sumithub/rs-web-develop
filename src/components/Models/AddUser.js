import CancelButton from "../common/CancelButton"
import SecondaryButton from "../common/SecondaryButton"
import Input from "../form/Input"
import Select from "../form/Select"
import Model from "./Model"

function AddUser({ onClose, onSave }) {
    return <Model onClose={onClose} title="Invite New User" modalClass="w-[60%]!">
        <div>
            <Input label="Full Name" isRequired={true} />
            <Input label="Email Address" isRequired={true}/>
            <Input label="Phone Number (Optional)"/>
            <Select label="Status" isRequired={true}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
            </Select>
            <Select label="Role" isRequired={true}>
                <option value="manager">Manager</option>
                <option value="customer">Customer</option>
            </Select>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-3">
            <CancelButton />
            <SecondaryButton title="Send Invite"/>
        </div>
    </Model>

}

export default AddUser