import SecondaryButton from "../../../components/common/SecondaryButton";
import Model from "../Model";

export default function AuditLogDetails({ onClose }) {

    return (
        <Model onClose={onClose} title="Audit Log Details" modalClass="w-1/2!">
            <div>
                <div className="flex justify-between">
                    <div className="text-text3 capitalize">Audit Log ID</div>
                    <div className="font-medium capitalize">AL-002</div>
                </div>
                <hr className="my-4 border-t border-border-color" />

                <div className="flex justify-between">
                    <div className="text-text3 capitalize">Subscription ID</div>
                    <div className="font-medium capitalize">SUB-102</div>
                </div>
                <hr className="my-4 border-t border-border-color" />

                <div className="flex justify-between">
                    <div className="text-text3 capitalize">Action</div>
                    <div className="font-medium capitalize">Customer created</div>
                </div>
                <hr className="my-4 border-t border-border-color" />

                <div className="flex justify-between">
                    <div className="text-text3 capitalize">Performed By</div>
                    <div className="font-medium capitalize">jane admin</div>
                </div>
                <hr className="my-4 border-t border-border-color" />

                <div className="flex justify-between">
                    <div className="text-text3 capitalize">Timestamp</div>
                    <div className="font-medium capitalize">Aug 18,2024 | 10:00AM</div>
                </div>
                <hr className="my-4 border-t border-border-color" />

                <div className="flex justify-between">
                    <div className="text-text3 capitalize">Details</div>
                    <div className="font-medium capitalize">Jane created new customer 'Acme Inc.</div>
                </div>
            </div>

            <div className="mt-[30px]">
                <SecondaryButton title="Back To List" onClick={onClose} class_="text-lg!" />
            </div>
        </Model>
    )
}  