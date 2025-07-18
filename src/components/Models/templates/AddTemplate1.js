"use client"
import CancelButton from '../../common/CancelButton'
import SecondaryButton from '../../common/SecondaryButton'
import Model from '../Model'
import Image from 'next/image'
import HtmlEditor from "../../form/HtmlEditor"
import InputForm from '../../form/InputForm'
import SelectForm from '../../form/SelectForm'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { getError, validEmailRgx } from '../../../../helper'
import { toast } from 'react-toastify'
import axios from 'axios'
import CustomSelectBox from '../../form/CustomSelectBox'

function AddTemplate({ onClose, id }) {
  const { register, handleSubmit, clearErrors, watch, setValue, formState: { errors }, } = useForm();
  const [sending, setSending] = useState(false)
  const [isEmail, setIsEmail] = useState(false)
  const [dynamicFields, setDynamicFields] = useState(false)

  const handleClick = () => {
    toast.success("Cloned Successfully")
    onClose()
  }

  const onSubmit = async (data) => {
    try {
      setSending(true)
      let res = null

      if (id !== "add") {
        res = await axios.put("/api", data)
      } else {
        res = await axios.post("/api", data)
      }

      toast.success("Template Created Successfully")
      setSending(false)
      onClose()
    } catch (error) {
      toast.error(getError(error))
      setSending(false)
    }
  }

  let body = watch("body") || []
  return <Model onClose={onClose} title="Create Email Template" modalBodyClass='max-h-[85vh]'>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex items-start gap-4'>
        <div className='w-[60%]'>
          <div className='shadow-sm rounded-[10px] px-5 pb-5 pt-3 mt-4 '>

            <div className='grid grid-cols-2 gap-3'>
              <SelectForm label="Template Type" isRequired={true} class_='mt-2!'
                selectClass_="py-[13.2px]! px-2.5! border-primary/10! focus:border-primary/60!"
                formProps={{ ...register("type", { required: true }) }}
                errors={errors} clearErrors={clearErrors} setValue={setValue} watch={watch}
                onChange={(e) => {
                  setIsEmail(e.target.value === "email" || e.target.value === "both")
                }}
              >
                <option value="email">Email</option>
                <option value="sms">SMS</option>
              </SelectForm>
              <InputForm
                inputClass='border-primary/10! focus:border-primary/60!'
                label="Template Name"
                isRequired={true}
                class_='mt-2!'
                placeholder="Enter Name"
                formProps={{ ...register("name", { required: true }) }}
                errors={errors}
              />
            </div>

            {isEmail && <InputForm
              inputClass='border-primary/10! focus:border-primary/60!'
              label="Subject Line"
              isRequired={true}
              placeholder="Enter Line"
              formProps={{ ...register("subject", { required: true }) }}
              errors={errors}
            />}

            {isEmail && <div className='grid grid-cols-2 gap-3'>
              <InputForm
                inputClass='border-primary/10! focus:border-primary/60!'
                label="Sender Name"
                isRequired={true}
                placeholder="Enter Sender Name"
                formProps={{ ...register("senderName", { required: true }) }}
                errors={errors}
              />
              <InputForm
                inputClass='border-primary/10! focus:border-primary/60!'
                label="Sender Email"
                isRequired={true}
                placeholder="Enter Sender Email"
                errors={errors}
                formProps={{
                  ...register("senderEmail", {
                    required: true,
                    pattern: {
                      value: validEmailRgx,
                      message: "Email is invalid."
                    },
                  })
                }}
              />
            </div>}

            <div className='mt-5'>
              <HtmlEditor
                label="Email Body"
                isRequired={true}
                value={body}
                onChange={(value) => {
                  clearErrors("body")
                  setValue("body", value)
                }}
                type={1}
              />

            </div>


            <div className="grid grid-cols-3 gap-3 mt-5">
              <CancelButton title="clone template" onClick={handleClick} />
              <SecondaryButton title="Save As Draft" class_='bg-white! text-primary! hover:text-white! hover:bg-primary!' type='submit' />
              <SecondaryButton title="Save & Activate" type="submit" disabled={sending} />
            </div>
          </div>
        </div>

        <div className='w-[40%] mt-4'>
          <div className='shadow-sm rounded-[10px]'>

            <div className='bg-primary/10 px-5 py-4 rounded-tl-[10px] rounded-tr-[10px]'>
              <div className='flex items-center gap-3'>
                <Image src="/images/eye1.svg" alt='eye' height={22} width={22} unoptimized={true} />
                <div className='text-secondary text-lg font-semibold'>Email Preview</div>
              </div>
            </div>
            <div className='p-5'>
              <div className='border border-border-color rounded-[10px] p-5 text-secondary text-sm mb-8 leading-normal'>
                <div className='tiptap'
                  dangerouslySetInnerHTML={{ __html: body }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </Model>
}

export default AddTemplate

function serializeToHTML(nodes) {

  return nodes.map(serializeNode).join('');
}

function serializeNode(node) {
  if (node.text) {
    let text = node.text;
    if (node.bold) text = `<strong>${text}</strong>`;
    if (node.italic) text = `<em>${text}</em>`;
    if (node.underline) text = `<u>${text}</u>`;
    return text;
  }

  const children = node.children?.map(serializeNode).join('');

  switch (node.type) {
    case 'paragraph':
      return `<p>${children}</p>`;
    case 'heading-one':
      return `<h1>${children}</h1>`;
    case 'heading-two':
      return `<h2>${children}</h2>`;
    // add more cases as needed
    default:
      return `<p>${children}</p>`;
  }
}
