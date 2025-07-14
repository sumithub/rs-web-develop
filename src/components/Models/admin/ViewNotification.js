import { useForm } from "react-hook-form";
import Model from "../Model";
import SecondaryButton from "../../common/SecondaryButton";
import CancelButton from "../../common/CancelButton";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getError, formatDateTime } from "../../../../helper";
import axios from "axios";
import Status from "../../Status";
import Loading from "../../Loading";
import { viewNotification } from "../../../constent/constArray";

export default function ViewNotification({ onClose, id }) {
    const { handleSubmit } = useForm();
    const [sending, setSending] = useState(false);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getData();
    }, [id]);

    const getData = async () => {
        try {
            setLoading(true);

            const res = await axios.get(`/api`);
            // const res = await axios.get(`/api/${id}`);

            setData(res.data || viewNotification);

        } catch (error) {
            console.error("Error fetching notification:", error);
            toast.error(getError(error));

            setData(viewNotification);
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = async (formData) => {
        try {
            setSending(true);
            let res = null;

            if (id !== "add") {

                // res = await axios.put(`/api/${id}`, formData);
                res = await axios.put(`/api`, formData);
                toast.success("Updated Successfully");
            } else {
                // Create new notification
                res = await axios.post("/api/notifications", formData);
                toast.success("Created Successfully");
            }

            onClose();
        } catch (error) {
            toast.error(getError(error));
        } finally {
            setSending(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this notification?")) {
            return;
        }

        try {
            setSending(true);
            await axios.delete(`/api`);
            // await axios.delete(`/api${id}`);
            toast.success("Deleted Successfully");
            onClose();
        } catch (error) {
            toast.error(getError(error));
        } finally {
            setSending(false);
        }
    };

    const handleMarkAsRead = async () => {
        try {
            // await axios.patch(`/api/${id}`);
            await axios.patch(`/api`);
            toast.success("Marked as read");

            setData(prev => prev ? { ...prev, status: "Unread" } : null);
        } catch (error) {
            toast.error(getError(error));
        }
    };

    const handleAcknowledge = async () => {
        try {
            await axios.patch(`/api`);
            // await axios.patch(`/api/${id}/`);
            toast.success("Acknowledged");

            setData(prev => prev ? { ...prev, acknowledged: true } : null);
        } catch (error) {
            toast.error(getError(error));
        }
    };

    if (loading) {
        return (
            <Model onClose={onClose} title="View Notification" modalClass="w-1/2!">
                <Loading class_="min-h-[300px]!" />
            </Model>
        );
    }

    if (!data) {
        return (
            <Model onClose={onClose} title="View Notification" modalClass="w-1/2!">
                <div className="text-center py-8">
                    <p className="text-text3">No notification data available</p>
                </div>
            </Model>
        );
    }

    return (
        <Model onClose={onClose} title="View Notification" modalClass="w-1/2!">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div className="flex items-center justify-between">
                        <h2 className="text-base capitalize text-text3">Client</h2>
                        <h3 className="text-base font-medium capitalize">{data.client || 'ABC Corp'}</h3>
                    </div>
                    <hr className="border-t border-border2 my-3.5" />
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <h2 className="text-base capitalize text-text3">Type</h2>
                        <h3 className="text-base font-medium capitalize">{data.type || 'Review Alert'}</h3>
                    </div>
                    <hr className="border-t border-border2 my-3.5" />
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <h2 className="text-base capitalize text-text3">Urgency Level</h2>
                        <h3 className="text-base font-medium capitalize">{data.urgencyLevel || 'High'}</h3>
                    </div>
                    <hr className="border-t border-border2 my-3.5" />
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <h2 className="text-base text-text3">Status</h2>
                        <Status status={data.status || "Unread"} />
                    </div>
                    <hr className="border-t border-border2 my-3.5" />
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <h2 className="text-base capitalize text-text3">Timestamp</h2>
                        <h3 className="text-base font-medium capitalize">
                            {data.timestamp ? new Date(data.timestamp).toLocaleString() : 'Jun 18,2024 | 10:00AM'}
                        </h3>
                    </div>
                    <hr className="border-t border-border2 my-3.5" />
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <h2 className="text-base capitalize text-text3">Message</h2>
                        <h3 className="text-base font-medium capitalize">{data.message || 'Service was slow and staff was rude.'}</h3>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-5 mt-7">
                    <CancelButton
                        title="Delete"
                        type="button"
                        disabled={sending}
                        class_="text-lg!"
                        onClick={handleDelete}
                    />
                    <SecondaryButton
                        title="Acknowledge"
                        type="button"
                        class_="text-lg! bg-white! disabled:bg-dark! disabled:text-text3! border border-primary! text-primary! hover:text-white! hover:bg-primary!"
                        onClick={handleAcknowledge}
                        disabled={sending}
                    />
                    <SecondaryButton
                        title="Mark as read"
                        type="button"
                        class_="text-lg!"
                        onClick={handleMarkAsRead}
                        disabled={sending}
                    />
                </div>
            </form>
        </Model>
    );
}