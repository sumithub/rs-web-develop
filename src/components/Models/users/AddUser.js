import CancelButton from "../../common/CancelButton"
import SecondaryButton from "../../common/SecondaryButton"
import Input from "../../form/Input"
import Select from "../../form/Select"
import Model from "../Model"

function AddUser({ onClose }) {
    return <Model onClose={onClose} title="Invite New User" modalClass="w-1/2!">
        <div>
            <Input label="Full Name" placeholder="Enter your name" isRequired={true} class_="mt-0!" />
            <Input label="Email Address" placeholder="Enter email" isRequired={true} />
            <Input label="Phone Number" placeholder="Enter phone number" inputType="number" />
            <Select label="Status" isRequired={true} selectClass_="py-3.5! px-2.5! focus:border-primary/60!">
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="pending invite">Pending Invite</option>
            </Select>
            <Select label="Role" isRequired={true} selectClass_="py-3.5! px-2.5! focus:border-primary/60!">
                <option value="owner">Owner</option>
                <option value="manager">Manager</option>
                <option value="viewer">Viewer</option>
            </Select>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-5">
            <CancelButton title="Cancel" />
            <SecondaryButton title="Send Invite" />
        </div>
    </Model>

}

export default AddUser