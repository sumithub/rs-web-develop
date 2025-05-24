import SecondaryButton from "../../common/SecondaryButton";
import CancelButton from "../../common/CancelButton";
import DatePicker from "../../form/DatePicker";
import Input from "../../form/Input";
import Model from "../Model";

export default function AddManualReview({ onClose, onSave }) {
    return (
        <Model onClose={onClose} title="Add Manual Review" modalClass="w-[60%]!">
            <div>
                <div>
                    <Input label="Add Rating" isRequired={true} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <Input label="First Name" isRequired={true}/>
                    <Input label="Last Name" isRequired={true}/>
                </div>

                <div>
                    <Input label="Add Image" placeholder="Upload Image" isRequired={true}/>
                </div>

                <div>
                    <Input label="Feedback" isRequired={true}/>
                </div>

                <div>
                    <DatePicker label="Date" isRequired={true} icon={true}/>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-5">
                    <CancelButton title="Cancel"/>
                    <SecondaryButton title="Add Review"/>
                </div>
            </div>

        </Model>
    )
}