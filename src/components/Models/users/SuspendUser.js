import Model from "../Model";
import CancelButton from "../../common/CancelButton"
import SecondaryButton from "../../common/SecondaryButton"


export default function SuspendUser({ onClose }) {
    return <Model title="Suspend/Reactivate User" onClose={onClose} modalClass="w-[45%]!">
        <div className="text-center">
            <div className="text-secondary text-xl font-semibold capitalize text-center mb-2">Confirm Action</div>

            <div className="text-text3">Are You Sure you want to suspend/reactivate this user?<br />
                This will restrict/grant access immediately.</div>

            <div className="grid grid-cols-2 gap-3 mt-6">
                <CancelButton title="Cancel" />
                <SecondaryButton title="Confirm" />
            </div>
        </div>
    </Model>
}