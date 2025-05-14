import DatePicker from '../../../components/form/DatePicker'
import React from 'react'
import Model from '../Model'
import Input from '../../form/Input'
import Radio from '../../form/Radio'
import Checkbox from '../../form/Checkbox'
import CancelButton from "../../../components/common/CancelButton"
import SecondaryButton from "../../../components/common/SecondaryButton";


function ScheduleCampaign({ onClose }) {
  return (
    <Model onClose={onClose} title="schedule campaign" modalClass="w-[60%]!">
      <div>
        <div className='grid grid-cols-2 gap-3'>
          <DatePicker label='Date' icon={true} />
          <Input inputType='time' label='Time' inputClass='py-2!' />
        </div>

        <div>
          <Input inputType='time' label='Time Zone' inputClass='py-2!' />
        </div>

        <div>
          <div className='text-secondary text-lg font-medium my-4'>Preferred Sending Time</div>
          <Radio label="Morning (8 AM - 12 PM)" inputClass='mb-2!' />
          <Radio label="Afternoon (12 PM - 4 PM)" inputClass='mb-2!' />
          <Radio label="Evening (4 PM - 8 PM)" inputClass='mb-2!' />
          <Radio label="Any Time (Let system decide)" />
        </div>

        <div>
          <div className='text-lg font-medium mt-3 mb-4'>Days of the Week</div>
          <div className="flex items-start gap-4">
            <Checkbox />
            <div>Monday</div>
            <Checkbox />
            <div>Tuesday</div>
            <Checkbox />
            <div>Wednesday</div>
            <Checkbox />
            <div>Thursday</div>
            <Checkbox />
            <div>Friday</div>
            <Checkbox />
            <div>Saturday</div>
            <Checkbox />
            <div>Sunday</div>
          </div>

        </div>
        <div>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <CancelButton title="Cancel" />
            <SecondaryButton title="confirm" />
          </div>
        </div>
      </div>
    </Model>
  )
}

export default ScheduleCampaign