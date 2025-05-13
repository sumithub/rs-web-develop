import DatePicker from '../../../components/form/DatePicker'
import React from 'react'
import Model from '../Model'
import Input from '../../form/Input'
import Radio from '../../form/Radio'
import Checkbox from '../../form/Checkbox'
import CancelButton from "../../../components/common/CancelButton"
import SecondaryButton from "../../../components/common/SecondaryButton";


function ScheduleCampaign({ onClose, onSave }) {
  return (
    <Model onClose={onClose} title="schedule campaign" modalClass="w-[60%]!">
      <div>
        <div className='grid grid-cols-2 gap-3'>
          <DatePicker label='Date' />
          <Input inputType='time' label='Time' />
        </div>

        <div>
          <Input inputType='time' label='Time Zone' />
        </div>

        <div>
          <div>Preferred Sending Time</div>
          <Radio label="Morning (8 AM - 12 PM)" />
          <Radio label="Afternoon (12 PM - 4 PM)" />
          <Radio label="Evening (4 PM - 8 PM)" />
          <Radio label="Any Time (Let system decide)" />
        </div>

        <div>
          <div>Days of the Week</div>
          <div className="flex items-start gap-2">
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
            <CancelButton />
            <SecondaryButton title="confirm" />
          </div>
        </div>
      </div>
    </Model>
  )
}

export default ScheduleCampaign