import CancelButton from "../../common/CancelButton"
import SecondaryButton from "../../common/SecondaryButton"
import Input from "../../form/Input"
import Radio from "../../form/Radio"
import Select from "../../form/Select"
import Model from "../Model"

function AddCustomer({ onClose, onSave }) {
    return <Model onClose={onClose} title="Add new Customer" modalClass="w-1/2!">
        <div>
            <div className="flex items-center">
                <Radio label="manually" />
                <Radio label="import" />
            </div>
            <div>
                <Input label="Customer Name" placeholder="Enter your name" isRequired={true} class_="mt-0!" />
                <Input label="Email" placeholder="Enter email" isRequired={true} />
                <Input label="Phone" placeholder="Enter phone number" inputType="number" isRequired={true} />
                <Select label="Tag" isRequired={true} selectClass_="py-3.5! px-2.5! focus:border-primary/60!">
                    <option value="high value">High Value</option>
                </Select>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-5">
            <CancelButton title="Cancel" onClick={onClose}/>
            <SecondaryButton title=" Apply Changes" />
        </div>
    </Model>

}

export default AddCustomer