import DatePicker from '../../../components/form/DatePicker'
import React, { useState } from 'react'
import Model from '../Model'
import Radio from '../../form/Radio'
import Checkbox from '../../form/Checkbox'
import CancelButton from "../../../components/common/CancelButton"
import SecondaryButton from "../../../components/common/SecondaryButton";
import InputForm from '../../form/InputForm'
import { toast } from 'react-toastify'
import axios from 'axios'
import { getError } from "../../../../helper"
import { useForm } from 'react-hook-form'


function ScheduleCampaign({ onClose }) {
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const [sending, setSending] = useState(false)
  const [date, setDate] = useState("")

  const onSubmit = async (data) => {
    try {
      setSending(true)
      let res = null

      if (id !== "add") {
        res = await axios.put("/" + id, data)
      } else {
        res = await axios.post("/", data)
      }

      toast.success("Updated Successfully")
      setSending(false)
      onClose()
    } catch (error) {
      toast.error(getError(error))
      setSending(false)
    }
  }

  return (
    <Model onClose={onClose} title="schedule campaign" modalClass="w-[60%]!">
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid grid-cols-2 gap-3 items-start 2xl:mt-0 mt-3'>
            <DatePicker
              label='Date'
              icon={true} mainClass="mt-0!"
              value={date}
              dateFormat="dd/MM/yyyy"
              onChange={(e) => setDate(e)} />
            <InputForm inputType='time' label='Time' inputClass='py-2!'
              formProps={{ ...register("time", { required: false }) }}
              errors={errors}
            />
          </div>

          <div>
            <InputForm inputType='time' label='Time Zone' inputClass='py-2!'
              formProps={{ ...register("time-zone", { required: false }) }}
              errors={errors}
            />
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
              <CancelButton title="Cancel" onClick={onClose} />
              <SecondaryButton title="confirm" type='submit' disabled={sending} />
            </div>
          </div>
        </form>
      </div>
    </Model>
  )
}

export default ScheduleCampaign