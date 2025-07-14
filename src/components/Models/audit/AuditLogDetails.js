"use client"
import { useEffect, useState } from "react";
import SecondaryButton from "../../../components/common/SecondaryButton";
import Model from "../Model";
import { getError } from "../../../../helper";
import axios from "axios";
import { toast } from "react-toastify";
import { auditLogDetails } from "../../../constent/constArray";
import Loading from "../../Loading";

export default function AuditLogDetails({ onClose, id }) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        getData();
    }, [id]);

    const getData = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`/api`);
            // const res = await axios.get(`/api/${id}`);
            setData(res.data || auditLogDetails);
        } catch (error) {
            toast.error(getError(error));
            setData(auditLogDetails);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Model onClose={onClose} title="Audit Log Details" modalClass="w-1/2!">
                <Loading class_="min-h-[300px]!" />
            </Model>
        );
    }

    return (
        <Model onClose={onClose} title="Audit Log Details" modalClass="w-1/2!">
            <div>
                <div className="flex justify-between">
                    <div className="text-text3 capitalize">Audit Log iD</div>
                    <div className="text-base font-medium capitalize">{data?.logId || 'AL-002'}</div>
                </div>
                <hr className="my-4 border-t border-border-color" />

                <div className="flex justify-between">
                    <div className="text-text3 capitalize">Subscription ID</div>
                    <div className="text-base font-medium capitalize">{data?.subscriptionID || 'SUB-102'}</div>
                </div>
                <hr className="my-4 border-t border-border-color" />

                <div className="flex justify-between">
                    <div className="text-text3 capitalize">Action</div>
                    <div className="text-base font-medium capitalize">{data?.action || 'Customer created'}</div>
                </div>
                <hr className="my-4 border-t border-border-color" />

                <div className="flex justify-between">
                    <div className="text-text3 capitalize">Performed By</div>
                    <div className="text-base font-medium capitalize">{data?.performedBy || 'jane admin'}</div>
                </div>
                <hr className="my-4 border-t border-border-color" />

                <div className="flex justify-between">
                    <div className="text-text3 capitalize">Timestamp</div>
                    <div className="text-base font-medium capitalize">
                        {data?.timestamp ? new Date(data.timestamp).toLocaleString() : 'Jun 18,2024 | 10:00AM'}
                    </div>
                </div>
                <hr className="my-4 border-t border-border-color" />

                <div className="flex justify-between">
                    <div className="text-text3 capitalize">Details</div>
                    <div className="text-base font-medium capitalize">{data?.details || 'Jane created new customer Acme Inc.'}</div>
                </div>
            </div>

            <div className="mt-[30px]">
                <SecondaryButton title="Back To List" onClick={onClose} class_="text-lg!" />
            </div>
        </Model>
    )
}