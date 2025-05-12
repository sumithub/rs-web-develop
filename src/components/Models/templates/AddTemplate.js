import CancelButton from '../../common/CancelButton'
import SecondaryButton from '../../common/SecondaryButton'
import Input from '../../form/Input'
import Model from '../Model'
import Select from '../../form/Select'
import Image from 'next/image'

function AddTemplate({ onClose }) {
  return <Model onClose={onClose} title="Invite New User" modalBodyClass='max-h-[85vh]'>
    <div className='flex items-start gap-4'>

      <div className='w-[60%]'>
        <div className='grid grid-cols-2 gap-3'>
          <Select label="Template Type" isRequired={true} selectClass_="py-3.5! px-2.5! focus:border-primary/60!">
            <option value="email template">Email Template</option>
          </Select>
          <Input label="Template Name" isRequired={true} placeholder="Enter Name" />
        </div>

        <Input label="Subject Line" isRequired={true} placeholder="Enter Line" />

        <div className='grid grid-cols-2 gap-3'>
          <Input label="Sender Name" isRequired={true} placeholder="Enter Sender Name" />
          <Input label="Sender Email" isRequired={true} placeholder="Enter Sender Email" />
        </div>
        <div className="grid grid-cols-3 gap-3 mt-5">
          <CancelButton />
          <SecondaryButton title="Save As Draft" class_='bg-white! text-primary! hover:text-white! hover:bg-primary!' />
          <SecondaryButton title="Save & Activate" />
        </div>
      </div>

      <div className='w-[40%] mt-4'>
        <div className='shadow-xl p-5 rounded-[15px]'>

          <div className='flex items-center gap-3'>
            <Image src="/images/eye1.svg" alt='eye' height={22} width={22} unoptimized={true} />
            <div className='text-secondary text-lg font-semibold'>Email Preview</div>
          </div>

          <div className='border border-border-color rounded-[10px] p-5 text-secondary text-sm my-5 leading-normal'>
            <div>Hi {"John Deo"},</div>

            <div className='my-5'>Thank you for your recent visit! We'd love to hear your feedback.</div>

            <div>Click the link below to leave a review:{"review_link"} Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</div>

            <div className='mt-10'>business_name</div>
          </div>
          <Image src="/images/template.png" alt='template' height={196} width={407} className='w-full mx-auto object-contain' />
        </div>
      </div>
    </div>

  </Model>
}

export default AddTemplate