"use client"
import { useForm } from "react-hook-form";
import Model from "../Model";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getError } from "../../../../helper";
import axios from "axios";
import Image from "next/image";
import Preview from "../../../components/Models/manage-campaigns/Preview"
import AddTemplate from "../../../components/Models/templates/AddTemplate"
import { adminAuditLogs } from "../../../constent/constArray";
import Loading from "../../Loading";
export default function AuditLogDetail({ onClose, id }) {
    const { handleSubmit } = useForm();
    const [sending, setSending] = useState("")
    const [openModal, setOpenModal] = useState(null)
    const [open, setOpen] = useState(null)
    const [selId, setSelId] = useState("")
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
            setData(res.data || adminAuditLogs);
        } catch (error) {
            toast.error(getError(error));
            setData(adminAuditLogs);
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = async (data) => {
        try {
            setSending(true)
            let res = null

            if (id !== "add") {
                res = await axios.put("/api", data)
            } else {
                res = await axios.post("/api", data)
            }

            toast.success("Saved Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }

    if (loading) {
        return (
            <Model onClose={onClose} title="Audit Log Details" modalClass="w-1/2!">
                <Loading class_="min-h-[300px]!" />
            </Model>
        );
    }

    return (
        <Model onClose={onClose} title="Audit Log Details" modalClass="w-1/2!">

            {openModal &&
                <Preview
                    onClose={() => {
                        setOpenModal(false)
                    }}
                />
            }

            {open &&
                <AddTemplate
                    id={selId}
                    onClose={() => {
                        setOpen(false);
                        setSelId("");
                    }}
                    onSave={() => {

                        setOpen(false);
                        setSelId("");
                    }}

                // onClose={() => {
                //     setOpenModal(false)
                // }}
                />
            }
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div>
                        <div className="flex justify-between items-center">
                            <h2 className="text-base capitalize text-text3">Date</h2>
                            <div className="text-base font-medium capitalize">{data?.date || 'Jun 18,2024'}</div>

                        </div>
                        <hr className="border-t border-border2 my-3.5" />
                    </div>
                    <div>
                        <div className="flex justify-between items-center">
                            <h2 className="text-base capitalize text-text3">Time</h2>
                            <div className="text-base font-medium capitalize">{data?.time || '10:30AM'}</div>

                        </div>
                        <hr className="border-t border-border2 my-3.5" />
                    </div>
                    <div>
                        <div className="flex justify-between items-center">
                            <h2 className="text-base capitalize text-text3">Client</h2>
                            <div className="text-base font-medium capitalize">{data?.client || 'ABC Corp'}</div>
                        </div>
                        <hr className="border-t border-border2 my-3.5" />
                    </div>
                    <div>
                        <div className="flex justify-between items-center">
                            <h2 className="text-base capitalize text-text3">location</h2>
                            <div className="text-base font-medium capitalize">{data?.location || 'Sydney'}</div>

                        </div>
                        <hr className="border-t border-border2 my-3.5" />
                    </div>
                    <div>
                        <div className="flex justify-between items-center">
                            <h2 className="text-base capitalize text-text3">user</h2>
                            <div className="text-base font-medium capitalize">{data?.user || 'john d.'}</div>

                        </div>
                        <hr className="border-t border-border2 my-3.5" />
                    </div>
                    <div>
                        <div className="flex justify-between items-center">
                            <h2 className="text-base capitalize text-text3">Action</h2>
                            <div className="text-base font-medium capitalize">{data?.action || 'Edited Campaign'}</div>

                        </div>
                        <hr className="border-t border-border2 my-3.5" />
                    </div>
                    <div>
                        <div className="flex justify-between items-center">
                            <h2 className="text-base capitalize text-text3">module</h2>
                            <div className="text-base font-medium capitalize">{data?.module || 'Campaigns'}</div>

                        </div>
                    </div>
                    <h2 className="pt-5 text-lg font-semibold">Details</h2>
                    <div className="pt-3.5 flex justify-between">
                        <h2 className="text-base capitalize text-text3">Campaign Name</h2>
                        <h3 className="text-base font-medium capitalize">March Promo</h3>
                    </div>
                    <div className="flex justify-between p-2 bg-secondary2 rounded-lg mt-3.5">
                        <div>
                            <h2 className="text-sm capitalize font-medium">Nature Template</h2>
                            <h3 className="capitalize text-xs">Lorem Ipsum..</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-2.5">
                            <button onClick={() => setOpenModal(true)} className="py-1 px-2 rounded-lg bg-primary/10 text-primary flex items-center justify-center gap-1" type="button"><span><Image src="/images/eye1.svg" alt="eye1" width={12} height={12} /></span>Preview</button>
                            <button onClick={(el) => {
                                setSelId("e.id")
                                setOpen(el)
                            }} className="py-1 px-2 rounded-lg bg-primary/10 text-primary flex items-center justify-center gap-1" type="button"><span><Image src="/images/edit2.svg" alt="eye1" width={12} height={12} /></span>Edit</button>
                        </div>
                    </div>
                </div>
            </form>
        </Model>
    )
}  