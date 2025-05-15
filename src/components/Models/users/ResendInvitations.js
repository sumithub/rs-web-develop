import Image from "next/image";
import Model from "../Model";
import Status from "../../Status";
import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";

export default function ResendInvitations({ onClose }) {
    return <Model title="Resend Invitations" onClose={onClose} modalClass="w-1/2!">
        <div>
            <div className="text-secondary text-xl font-semibold capitalize">The following users will receive a new invite email.</div>
            <div>
                <div className="flex items-center justify-between mt-5">
                    <div className="text-base font-medium text-secondary">john deo  ( johan@exmaple.com )</div>
                    <div className="text-base text-text3 capitalize">Pending Invite</div>
                </div>
                <hr className="border-t border-border-color mt-3" />

                <div className="flex items-center justify-between mt-5">
                    <div className="text-base font-medium text-secondary">john deo  ( johan@exmaple.com )</div>
                    <div className="text-base text-text3 capitalize">Pending Invite</div>
                </div>
                <hr className="border-t border-border-color mt-3" />

                <div className="flex items-center justify-between mt-5">
                    <div className="text-base font-medium text-secondary">john deo  ( johan@exmaple.com )</div>
                    <div className="text-base text-text3 capitalize">Pending Invite</div>
                </div>
            </div>

            <div>
                <div className="flex items-center gap-2 my-5">
                    <Image src="/images/warning.svg" alt="warning" height={22} width={22} />
                    <div className="text-danger text-lg font-semibold capitalize">The following users were removed because they are active:</div>
                </div>
                <div className="flex items-center justify-between mt-5">
                    <div className="text-base font-medium text-secondary">Kadin Vetrovs  (kadinvetrovs @exmaple.com )</div>
                    <div className="text-base text-text3 capitalize"><Status status="Active" /></div>
                </div>
                <hr className="border-t border-border-color mt-3" />

                <div className="flex items-center justify-between mt-5">
                    <div className="text-base font-medium text-secondary">Kadin Vetrovs  (kadinvetrovs @exmaple.com )</div>
                    <div className="text-base text-text3 capitalize"><Status status="Active" /></div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-5">
                    <CancelButton title="Cancel" />
                    <SecondaryButton title="Confirm & resend" />
                </div>
            </div>
        </div>
    </Model>
}