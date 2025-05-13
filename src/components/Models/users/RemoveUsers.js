import Image from "next/image";
import Model from "../Model";
import Status from "../../Status";
import Checkbox from "../../form/Checkbox";
import CancelButton from "../../common/CancelButton"
import SecondaryButton from "../../common/SecondaryButton"

export default function RemoveUsers({ onClose }) {
    return <Model title="Remove users permanently" onClose={onClose} modalClass="w-1/2!">
        <div>
            <div className="flex items-center gap-2">
                <Image src="/images/warning.svg" alt="warning" height={22} width={22} />
                <div className="text-danger text-lg font-semibold capitalize">This action is irreversible</div>
            </div>

            <div>
                <div className="flex items-center justify-between mt-5">
                    <div className="text-base font-medium text-secondary">john Deo  ( johan@exmaple.com )</div>
                    <div className="text-base text-text3 capitalize"><Status status="Active" /></div>
                </div>
                <hr className="border-t border-border-color mt-3" />

                <div className="flex items-center justify-between mt-5">
                    <div className="text-base font-medium text-secondary">john Deo  ( johan@exmaple.com )</div>
                    <div className="text-base text-text3 capitalize"><Status status="Active" /></div>
                </div>
                <hr className="border-t border-border-color mt-3" />

                <div className="flex items-center justify-between mt-5">
                    <div className="text-base font-medium text-secondary">john Deo  ( johan@exmaple.com )</div>
                    <div className="text-base text-text3 capitalize"><Status status="Active" /></div>
                </div>
                <hr className="border-t border-border-color mt-3" />

                <div className="text-danger text-sm font-medium my-4">Note: you will lose all associated user data.</div>

                <div className="flex items-start gap-2 mt-1">
                    <Checkbox />
                    <div className="text-secondary text-base capitalize mt-[2px] font-medium">Remove To confirm</div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6">
                    <CancelButton title="Cancel" />
                    <SecondaryButton title="Apply Changes" />
                </div>
            </div>
        </div>
    </Model>
}