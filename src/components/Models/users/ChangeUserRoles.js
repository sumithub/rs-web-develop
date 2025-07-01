"use client"
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Status from "../../Status";
import TableOrder from "../../TableOrder";
import Model from "../Model";
import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import { toast } from "react-toastify";
import SelectForm from "../../form/SelectForm";
import { changeUsersRole } from "../../../constent/constArray";
import axios from "axios";
import { getError } from "../../../../helper";
import Loading from "../../Loading";

export default function ChangeUserRoles({ onClose }) {
    const [sortBy, setSortBy] = useState("")
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)

    const {
        register, setValue, watch,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [sending, setSending] = useState(false);

    useEffect(() => {
        getUser()
    }, [sortBy])

    const getUser = async () => {
        try {
            setLoading(true)
            setList([])
            const res = await axios.get("/api")
            setList(res.data || changeUsersRole)
            setLoading(false)

        } catch (error) {
            toast.error(getError(error))
            setLoading(false)
        }
    }

    const pendingUsers = [
        { name: "John Deo", email: "johan@example.com", status: "Pending Invite" },
        { name: "Jane Roe", email: "jane@example.com", status: "Pending Invite" },
        { name: "Alex King", email: "alex@example.com", status: "Pending Invite" },
    ];

    const onSubmit = (data) => {
        if (!data.role) {
            toast.error("Please select a new role");
            return;
        }
        setSending(true);

        setTimeout(() => {
            setSending(false);
            toast.success(`Roles Changed Successfully`);
            onClose();
        }, 1000);
    };

    return (
        <Model title="Change User Roles" onClose={onClose} modalClass="w-1/2!" modalBodyClass="max-h-[85vh]!">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div className="text-secondary text-xl font-semibold capitalize">
                        You are about to change role for these users
                    </div>
                    <div className="text-secondary text-base font-semibold mt-5">
                        Selected Users ({list.length})
                    </div>

                    <div className="table-class mt-5 overflow-auto">
                        {loading ? <Loading class_="min-h-[300px]!" /> : (list?.length > 0 ? <table className='w-full'>
                            <thead>
                                <tr>
                                    <th>
                                        <TableOrder title="Name"
                                            sortBy={sortBy}
                                            setSortBy={setSortBy}
                                            field="name"
                                        />
                                    </th>
                                    <th>
                                        <TableOrder title="Status"
                                            sortBy={sortBy}
                                            setSortBy={setSortBy}
                                            field="status"
                                        />
                                    </th>
                                    <th>
                                        <TableOrder title="Role"
                                            sortBy={sortBy}
                                            setSortBy={setSortBy}
                                            field="role"
                                        />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {list?.map((e, index) => <tr key={index} className={index === list.length - 1 ? '' : 'border-b border-border-color'}>
                                    <td>{e.name}</td>
                                    <td>
                                        <Status status={e.status} />
                                    </td>
                                    <td>{e.role}</td>
                                </tr>
                                )}
                            </tbody>
                        </table> : <div className='text-center text-2xl text-danger mx-auto h-20'>No Data</div>)}
                    </div>

                    <SelectForm
                        label="Select new role"
                        isRequired={true}
                        defaultOption="Select"
                        selectClass_="py-3.5! px-2.5! focus:border-primary/60!"
                        formProps={{ ...register("role", { required: true }) }}
                        errors={errors}
                        setValue={setValue}
                        watch={watch}
                    >
                        <option value="owner">Owner</option>
                        <option value="manager">Manager</option>
                        <option value="viewer">Viewer</option>
                    </SelectForm>
                    {errors.role && <div className="text-red-500 text-sm mt-1">Please select a new role</div>}

                    <div className="text-primary text-sm font-semibold capitalize my-4">
                        Changing roles will update user permissions.
                    </div>

                    <div className="flex items-center gap-2 my-5">
                        <Image unoptimized={true} src="/images/warning.svg" alt="warning" height={22} width={22} />
                        <div className="text-danger text-lg font-semibold capitalize">
                            The following users were removed because they are pending
                        </div>
                    </div>

                    {pendingUsers.map((e, index) => (
                        <div key={index}>
                            <div className="flex items-center justify-between mt-5">
                                <div className="text-base font-medium text-secondary capitalize">
                                    {e.name} ({e.email})
                                </div>
                                <div className="text-base text-text3 capitalize">
                                    <Status status={e.status} />
                                </div>
                            </div>
                            {index !== pendingUsers.length - 1 && (
                                <hr className="mt-3 border-t border-border-color" />
                            )}
                        </div>
                    ))}

                    <div className="flex items-center gap-2 my-5">
                        <Image unoptimized={true} src="/images/warning.svg" alt="warning" height={22} width={22} />
                        <div className="text-danger text-lg font-semibold capitalize">
                            Role changes are only allowed for active users.
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-6">
                        <CancelButton title="Cancel" onClick={onClose} />
                        <SecondaryButton title="Apply Changes" type="submit" disabled={sending} />
                    </div>
                </div>
            </form>
        </Model>
    );
}
