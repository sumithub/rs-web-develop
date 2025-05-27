import Model from "../Model";
import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";

export default function SendInvite({ onClose }) {
    return <Model title="Send Invite" onClose={onClose} modalClass="w-[45%]!">
        <div className="text-secondary text-xl font-semibold capitalize text-center">the invited user receives an email to verify their address and create a password.</div>

        <div className="grid grid-cols-2 gap-3 mt-6">
            <CancelButton title="Cancel" onClick={onClose}/>
            <SecondaryButton title="ok" />
        </div>

    </Model>
}