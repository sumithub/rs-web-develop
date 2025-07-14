import Model from "../Model";
import Image from "next/image";

export default function Preview({ onClose, previewType = '' }) {
    return (
        <Model onClose={onClose} title="Preview" modalClass="w-1/2! ">
            <div className='w-full mt-4'>
                <div className='shadow-sm rounded-[10px]'>

                    <div className='bg-primary/10 px-5 py-4 rounded-tl-[10px] rounded-tr-[10px]'>
                        <div className='flex items-center gap-3'>
                            <Image src="/images/eye1.svg" alt='eye' height={22} width={22} unoptimized={true} />
                            <div className='text-secondary text-lg font-semibold capitalize'>{previewType || "Email"} Preview</div>
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
        </Model>
    )
}