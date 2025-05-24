import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import Model from "../Model";

export default function ReviewDetails({ onClose, onSave }) {
    return (
        <Model onClose={onClose} title="Review Details" modalClass="w-[60%]!">
            <div>
                <div className="grid grid-cols-2 ">
                    <div>
                        <div>
                            Zain Levin
                        </div>
                        <div className="text-sm font-thin">
                            zainlevin@gmail.com
                        </div>
                    </div>

                    <div>
                        Jun 11,2024
                    </div>

                    <div className="mt-4 text-sm ps-10">
                        Great service, highly recommended!
                    </div>
                </div>

                <div className="mt-6">
                    <div>
                        Share This Review:
                    </div>

                    <div className="grid grid-cols-3 gap-5 mt-4">
                        <SecondaryButton title="Share on social media"/>
                        <SecondaryButton title="share via email"/>
                        <CancelButton title="copy link"/>
                    </div>
                </div>
            </div>
        </Model>
    )
}