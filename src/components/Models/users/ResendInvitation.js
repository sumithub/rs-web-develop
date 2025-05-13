import Input from "../../form/Input";
import Model from "../Model";
import CancelButton from "../../common/CancelButton"
import SecondaryButton from "../../common/SecondaryButton"

export default function ResendInvitation({ onClose }) {
    return <Model title="Resend Invite Confirmation" onClose={onClose} modalClass="w-1/2!">
        <div>
            <div className="text-secondary text-xl font-semibold capitalize">Are you sure you want to resend the invite to</div>

            <Input label="Johan Deo" placeholder="Enter email" />
            <div className="text-secondary text-xl font-semibold capitalize mt-4">A new invitation email will be sent.</div>

            <div className="grid grid-cols-2 gap-3 mt-6">
                <CancelButton title="Cancel" />
                <SecondaryButton title="Resend Invite" />
            </div>
        </div>
    </Model>
}