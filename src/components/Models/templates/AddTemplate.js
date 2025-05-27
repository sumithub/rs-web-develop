import CancelButton from '../../common/CancelButton'
import SecondaryButton from '../../common/SecondaryButton'
import Model from '../Model'
import Image from 'next/image'
import HtmlEditor from "../../form/editor/HtmlEditor"
import InputForm from '../../form/InputForm'
import SelectForm from '../../form/SelectForm'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { getError, validEmailRgx } from '../../../../helper'
import { toast } from 'react-toastify'
import axios from 'axios'

function AddTemplate({ onClose, id }) {
  const { register, handleSubmit, clearErrors, formState: { errors }, } = useForm();
  const [sending, setSending] = useState(false)

  const onSubmit = async (data) => {
    try {
      setSending(true)
      let res = null

      if (id !== "add") {
        res = await axios.put("/api" + id, data)
      } else {
        res = await axios.post("/api", data)
      }

      toast.success("Updated Successfully")
      setSending(false)
      onClose()
    } catch (error) {
      toast.error(getError(error))
      setSending(false)
    }
  }

  console.log(errors)

  return <Model onClose={onClose} title="Create Email Template" modalBodyClass='max-h-[85vh]'>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex items-start gap-4'>
        <div className='w-[60%]'>
          <div className='shadow-sm rounded-[10px] px-5 pb-5 pt-3 mt-4 '>

            <div className='grid grid-cols-2 gap-3'>
              <SelectForm label="Template Type" isRequired={true} class_='mt-2!' selectClass_="py-3.5! px-2.5! focus:border-primary/60!"
                formProps={{ ...register("status", { required: true }) }} errors={errors} clearErrors={clearErrors}
              >
                <option value="email template">Email Template</option>
              </SelectForm>
              <InputForm label="Template Name" isRequired={true} class_='mt-2!' placeholder="Enter Name"
                formProps={{ ...register("template-name", { required: true }) }}
                errors={errors}
              />
            </div>

            <InputForm label="Subject Line" isRequired={true} placeholder="Enter Line"
              formProps={{ ...register("subject-line", { required: true }) }}
              errors={errors}
            />

            <div className='grid grid-cols-2 gap-3'>
              <InputForm label="Sender Name" isRequired={true} placeholder="Enter Sender Name"
                formProps={{ ...register("sender-name", { required: true }) }}
                errors={errors}
              />
              <InputForm label="Sender Email" isRequired={true} placeholder="Enter Sender Email"
                formProps={{
                  ...register("email", {
                    required: true,
                    pattern: {
                      value: validEmailRgx,
                      message: "Email is invalid."
                    },
                  })
                }}
              />
            </div>

            <HtmlEditor label="Email Body">
              <div className='grid grid-cols-3 gap-4'>
                <InputForm label="Customer Name" isRequired={true}
                  formProps={{ ...register("customer-name", { required: true }) }}
                  errors={errors}
                />
                <InputForm label="Business Phone" isRequired={true}
                  formProps={{ ...register("business-phone", { required: true }) }}
                  errors={errors}
                />
                <InputForm label="Insert Dynamic Fields" isRequired={true}
                  formProps={{ ...register("insert-dynamic-fields", { required: true }) }}
                  errors={errors}
                />
              </div>
            </HtmlEditor>

            {/* <div className="text-sm text-secondary font-medium capitalize mt-3 mb-2">email body</div>
          <textarea
            required={true}
            rows={15} className="rounded text-text3 text-sm border border-color w-full focus-visible:outline-none p-3" /> */}

            <div className="grid grid-cols-3 gap-3 mt-5">
              <CancelButton title="clone template" />
              <SecondaryButton title="Save As Draft" class_='bg-white! text-primary! hover:text-white! hover:bg-primary!' />
              <SecondaryButton title="Save & Activate" type="submit" disabled={sending} />
            </div>
          </div>
        </div>

        <div className='w-[40%] mt-4'>
          <div className='shadow-sm rounded-[10px]'>

            <div className='bg-[#0396FF1a] px-5 py-4 rounded-tl-[10px] rounded-tr-[10px]'>
              <div className='flex items-center gap-3'>
                <Image src="/images/eye1.svg" alt='eye' height={22} width={22} unoptimized={true} />
                <div className='text-secondary text-lg font-semibold'>Email Preview</div>
              </div>
            </div>
            <div className='p-5'>
              <div className='border border-border-color rounded-[10px] p-5 text-secondary text-sm mb-8 leading-normal'>
                <div>Hi {"John Deo"},</div>

                <div className='my-5'>Thank you for your recent visit! We'd love to hear your feedback.</div>

                <div>Click the link below to leave a review:{"review_link"} Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</div>

                <div className='mt-10'>business_name</div>
              </div>
              <Image src="/images/template.png" alt='template' height={196} width={407} className='w-full mx-auto object-contain' />
            </div>
          </div>
        </div>
      </div>
    </form>
  </Model>
}

export default AddTemplate