import ReviewCard from "../../../components/ReviewCard";
import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import Select from "../../form/Select";
import Model from "../Model";

export default function RequestUpdate({ onClose, onSave }) {
    return (
        <Model onClose={onClose} title="Request Update" modalClass="w-[60%]!">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <div>
                        <ReviewCard title="Zain Levin" />
                    </div>

                    <div>
                        <div className="mt-3 ps-[10vw]">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the .
                        </div>
                    </div>

                    <div>
                        <Select defaultOption="No Action Required" />
                    </div>

                    <div>
                        <div>Message</div>
                    </div>


                    <div className="grid grid-cols-2 gap-3 mt-4">
                        <CancelButton title="cancel" />
                        <SecondaryButton title="Request update" />
                    </div>


                </div>

                <div>
                    <div>
                        <div className="border border-border-color rounded-md">
                            <div className='bg-[#0396FF1a] px-5 py-4 rounded-tl-[10px] rounded-tr-[10px]'>
                                <div className='flex items-center gap-3'>
                                    <div className='text-secondary text-lg font-semibold'>Widget Preview</div>
                                </div>
                            </div>
                        </div>

                        <div className='p-5'>
                            <div className='border border-border-color rounded-[10px] p-5 text-secondary text-sm mb-8 leading-normal'>
                                <div>Hi {"John Deo"},</div>

                                <div className='my-5'>Thank you for your recent visit! We'd love to hear your feedback.</div>

                                <div>Click the link below to leave a review:{"review_link"} Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</div>

                                <div className='mt-10'>business_name</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Model >
    )
}