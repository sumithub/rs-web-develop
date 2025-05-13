import CancelButton from '../../common/CancelButton'
import SecondaryButton from '../../common/SecondaryButton'
import Input from '../../form/Input'
import Model from '../Model'
import Select from '../../form/Select'
import Image from 'next/image'

function AddTemplate({ onClose }) {
  return <Model onClose={onClose} title="Create Email Template" modalBodyClass='max-h-[85vh]'>
    <div className='flex items-start gap-4'>

      <div className='w-[60%]'>
        <div className='shadow-xl rounded-[10px] px-5 pb-5 pt-3 mt-4 '>

          <div className='grid grid-cols-2 gap-3'>
            <Select label="Template Type" isRequired={true} class_='mt-0!' selectClass_="py-3.5! px-2.5! focus:border-primary/60!">
              <option value="email template">Email Template</option>
            </Select>
            <Input label="Template Name" isRequired={true} class_='mt-0!' placeholder="Enter Name" />
          </div>

          <Input label="Subject Line" isRequired={true} placeholder="Enter Line" />

          <div className='grid grid-cols-2 gap-3'>
            <Input label="Sender Name" isRequired={true} placeholder="Enter Sender Name" />
            <Input label="Sender Email" isRequired={true} placeholder="Enter Sender Email" />
          </div>

          <div className="text-sm text-secondary font-medium capitalize mt-3 mb-2">email body</div>
          <textarea
            required={true}
            rows={15} className="rounded text-text3 text-sm border border-color w-full focus-visible:outline-none p-3" />

          <div className="grid grid-cols-3 gap-3 mt-5">
            <CancelButton title="clone template" />
            <SecondaryButton title="Save As Draft" class_='bg-white! text-primary! hover:text-white! hover:bg-primary!' />
            <SecondaryButton title="Save & Activate" />
          </div>
        </div>
      </div>

      <div className='w-[40%] mt-4'>
        <div className='shadow-xl rounded-[10px]'>

          <div className='bg-[#0396FF1a] px-5 py-4 rounded-tl-[15px] rounded-tr-[15px]'>
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

  </Model>
}

export default AddTemplate