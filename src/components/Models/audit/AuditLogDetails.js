import SecondaryButton from "../../../components/common/SecondaryButton";
import Model from "../Model";

export default function AuditLogDetails({ onClose }) {
    return (
        <Model onClose={onClose} title="Audit Log Details" modalClass="w-1/2!">
            <div className="flex  justify-between">
                <div className="text-text3 capitalize">
                    Audit Log ID
                </div>
                <div>
                    AL-002
                </div>
            </div>

            <hr className="my-4 border-t border-border-color" />

            <div className="flex  justify-between">
                <div className="text-text3 capitalize">
                    Subscription ID
                </div>
                <div>
                    SUB-102
                </div>
            </div>

            <hr className="my-4 border-t border-border-color" />

            <div className="flex  justify-between">
                <div className="text-text3 capitalize">
                    Action
                </div>
                <div>
                    Customer created
                </div>
            </div>

            <hr className="my-4 border-t border-border-color" />

            <div className="flex  justify-between">
                <div className="text-text3 capitalize">
                    Performed By
                </div>
                <div>
                    Jane Admin
                </div>
            </div>

            <hr className="my-4 border-t border-border-color" />

            <div className="flex  justify-between">
                <div className="text-text3 capitalize">
                    Timestamp
                </div>
                <div>
                    Aug 18,2024 | 10:00AM
                </div>
            </div>

            <hr className="my-4 border-t border-border-color" />

            <div className="flex  justify-between">
                <div className="text-text3 capitalize">
                    Details
                </div>
                <div>
                    Jane Created New Customer 'Acme Inc.
                </div>
            </div>

            <div className="mt-[30px]">
                <SecondaryButton title="Back To List" onClick={onClose} class_="text-lg!" />
            </div>
        </Model>
    )
}  