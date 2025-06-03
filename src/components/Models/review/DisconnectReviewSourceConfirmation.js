import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import Input from "../../form/Input";
import Model from "../Model";

export default function DisconnectReviewSourceConfirmation({ onClose, onSave }) {
    return (
        <Model onClose={onClose} title="Disconnect Review Source Confirmation" modalClass="w-[60%]!">
            <div>
                <div className="font-semibold">
                    Disconnect from Yelp
                </div>
            </div>

            <div>
                <div className="border border-border-color rounded-md mt-4 bg-[#0396FF1a]">Are you sure you want to disconnect This will stop fetching new reviews </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
                <CancelButton title="Cancel" onClick={onClose}/>
                <SecondaryButton title="Confirm Disconnect"/>
            </div>
        </Model>
    )
}