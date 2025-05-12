import CancelButton from '../common/CancelButton'
import SecondaryButton from '../common/SecondaryButton'
import Input from '../form/Input'
import Model from './Model'
import Select from '../form/Select'

function AddTemplate({ onClose, onSave }) {
  return <Model onClose={onClose} title="Invite New User" modalClass="w-[60%]!">
    <div>
      <Select label="Template Type" isRequired={true} selectClass_="py-3.5! px-2.5! focus:border-primary/60!">
        <option value="email template">Email Template</option>
      </Select>
      <Input label="Template Name" isRequired={true} placeholder="Enter Name" />
      <Input label="Subject Line" isRequired={true} placeholder="Enter Line" />
      <Input label="Sender Name" isRequired={true} placeholder="Enter Sender Name" />
      <Input label="Sender Email" isRequired={true} placeholder="Enter Sender Email" />
    </div>

    <div className="grid grid-cols-2 gap-3 mt-5">
      <CancelButton />
      <SecondaryButton title="Save & Draft" />
      <SecondaryButton title="Save & Activate" />
    </div>
  </Model>
}

export default AddTemplate