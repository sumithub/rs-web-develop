import SecondaryButton from "../../../components/common/SecondaryButton";
import Model from "../Model";

export default function AuditLogDetails({ onClose }) {

const auditLogsDetail=[
    {name:"Audit Log ID",detail:"AL-002",},
    {name:"Subscription ID",detail:"SUB-102",},
    {name:"Action",detail:"Customer created",},
    {name:"Performed By",detail:"jane admin",},
    {name:"Timestamp",detail:"Aug 18,2024 | 10:00AM",},
    {name:"Details",detail:"Jane created new customer 'Acme Inc.",},
]

    return (
        <Model onClose={onClose} title="Audit Log Details" modalClass="w-1/2!">
         {auditLogsDetail.map((e, i) => (   <>
            <div className="flex justify-between">
                <div className="text-text3 capitalize">{e.name}</div>
                <div className="font-medium capitalize">{e.detail}</div>
            </div>

              {i !== auditLogsDetail.length - 1 && (
             <hr className="my-4 border-t border-border-color" />
                )}
        </>))}

            <div className="mt-[30px]">
                <SecondaryButton title="Back To List" onClick={onClose} class_="text-lg!" />
            </div>
        </Model>
    )
}  