"use client"
import DatePicker from '../../../components/form/DatePicker'
import React, { useState } from 'react'
import Model from '../Model'
import RadioForm from '../../form/RadioForm'
import Checkbox from '../../form/Checkbox'
import CancelButton from "../../../components/common/CancelButton"
import SecondaryButton from "../../../components/common/SecondaryButton";
import InputForm from '../../form/InputForm'
import { toast } from 'react-toastify'
import axios from 'axios'
import { getError } from "../../../../helper"
import { useForm } from 'react-hook-form'
import CheckboxForm from '../../form/CheckboxForm'

function ScheduleCampaign({ onClose, id }) {
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const [sending, setSending] = useState(false)
  const [date, setDate] = useState("")

  const onSubmit = async (data) => {
    try {
      setSending(true)
      let res = null

      if (id !== "add") {
        res = await axios.put("/api", data)
      } else {
        res = await axios.post("/api", data)
      }

      toast.success("Schedule Successfully")
      setSending(false)
      onClose()
    } catch (error) {
      toast.error(getError(error))
      setSending(false)
    }
  }

  return (<Model onClose={onClose} title="schedule campaign" modalClass="w-[60%]!">
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className='grid grid-cols-2 gap-3 items-center 2xl:mt-0 mt-3'>
          <DatePicker
            class_="py-3! border-primary/10!"
            labelClass='font-medium!'
            label='Date'
            icon={true} mainClass="mt-0!"
            value={date}
            dateFormat="dd/MM/yyyy"
            onChange={(e) => setDate(e)} />

          <InputForm inputType='time' label='Time' inputClass='py-3! border-primary/10!' class_='mt-0!'
            formProps={{ ...register("time", { required: false }) }}
            errors={errors}
          />
        </div>

        <div>
          <InputForm inputType='time' label='Time Zone' inputClass='py-3! border-primary/10!'
            formProps={{ ...register("timeZone", { required: false }) }}
            errors={errors}
          />
        </div>

        <div>
          <div className='text-secondary text-lg font-medium my-4'>Preferred Sending Time</div>
          <RadioForm name="sendingTime" label="Morning (8 AM - 12 PM)" inputClass='mb-2!' labelClass='font-medium!'
            formProps={{ ...register("sendingTime", { required: true }) }}
            errors={errors} />
          <RadioForm name="sendingTime" label="Afternoon (12 PM - 4 PM)" inputClass='mb-2!' labelClass='font-medium!'
            formProps={{ ...register("sendingTime", { required: true }) }}
            errors={errors} />
          <RadioForm name="sendingTime" label="Evening (4 PM - 8 PM)" inputClass='mb-2!' labelClass='font-medium!'
            formProps={{ ...register("sendingTime", { required: true }) }}
            errors={errors} />
          <RadioForm name="sendingTime" label="Any Time (Let system decide)" labelClass='font-medium!'
            formProps={{ ...register("sendingTime", { required: true }) }}
            errors={errors} />
        </div>

        <div>
          <div className='text-lg font-medium mt-3 mb-4 capitalize'>Days of the Week <span className='text-text3 font-normal'>(Optional)</span></div>
          <div className="flex items-start gap-4">
            <CheckboxForm
              labelClass='font-medium!'
              label="Monday"
              class_='flex flex-row-reverse gap-4'
              formProps={{ ...register("monday") }} errors={errors} />

            <CheckboxForm
              labelClass='font-medium!'
              label="Tuesday"
              class_='flex flex-row-reverse gap-4'
              formProps={{ ...register("Tuesday") }} errors={errors}
            />
            <CheckboxForm
              labelClass='font-medium!'
              label="Wednesday"
              class_='flex flex-row-reverse gap-4'
              formProps={{ ...register("wednesday") }} errors={errors}
            />
            <CheckboxForm
              labelClass='font-medium!'
              label="Thursday"
              class_='flex flex-row-reverse gap-4'
              formProps={{ ...register("thursday") }} errors={errors}
            />
            <CheckboxForm
              labelClass='font-medium!'
              label="Friday"
              class_='flex flex-row-reverse gap-4'
              formProps={{ ...register("friday") }} errors={errors}
            />

            <CheckboxForm
              labelClass='font-medium!'
              label="Saturday"
              class_='flex flex-row-reverse gap-4'
              formProps={{ ...register("saturday") }} errors={errors}
            />

            <CheckboxForm
              labelClass='font-medium!'
              label="Sunday"
              class_='flex flex-row-reverse gap-4'
              formProps={{ ...register("sunday") }} errors={errors}
            />
          </div>
        </div>

        <div>
          <div className="grid grid-cols-2 gap-3 mt-5">
            <CancelButton title="Cancel" onClick={onClose} class_='py-2.5!' />
            <SecondaryButton class_='py-2.5!'
              title="Confirm"
              type="submit"
              disabled={sending} />
          </div>
        </div>
      </div>
    </form>
  </Model>
  )
}

export default ScheduleCampaign