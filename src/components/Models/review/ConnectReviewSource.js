import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import Input from "../../form/Input";
import Model from "../Model";

export default function ConnectReviewSource({ onClose, onSave }) {
    return (
        <Model onClose={onClose} title="Connect Review Source" modalClass="w-[60%]!">
            <div>
                <div className="font-semibold">
                    Connect to Yelp
                </div>
            </div>

            <div>
                <Input label="Business Profile URL" isRequired={true} placeholder="https//www.google.com"/>
                <div className="border border-border-color rounded-md mt-4 bg-[#0396FF1a]">Paste your business profile URL from the platform's website. </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
                <CancelButton title="Cancel" onClick={onClose}/>
                <SecondaryButton title="Connect"/>
            </div>
        </Model>
    )
}