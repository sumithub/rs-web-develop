import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Status from "../../Status";
import TableOrder from "../../TableOrder";
import Model from "../Model";
import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import { toast } from "react-toastify";
import SelectForm from "../../form/SelectForm";

export default function ChangeUserRoles({ onClose }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            role: "owner",
        },
    });

    const [sending, setSending] = useState(false);

    const users = [
        { name: "Jaylon Torff", status: "Active", role: "Manager" },
        { name: "Mia Wong", status: "Active", role: "Viewer" },
        { name: "Liam Smith", status: "Active", role: "Owner" },
        { name: "Emma Johnson", status: "Active", role: "Manager" },
        { name: "Noah Brown", status: "Active", role: "Viewer" },
    ];

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

        // Simulate async operation
        setTimeout(() => {
            setSending(false);
            toast.success(`Roles changed to "${data.role}" successfully`);
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
                        Selected Users ({users.length})
                    </div>

                    <div className="table-class mt-5 overflow-auto max-h-60">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th>
                                        <TableOrder title="Name" />
                                    </th>
                                    <th>
                                        <TableOrder title="Status" />
                                    </th>
                                    <th>
                                        <TableOrder title="Role" />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(({ name, status, role }, idx) => (
                                    <tr key={idx}>
                                        <td>{name}</td>
                                        <td>
                                            <Status status={status} />
                                        </td>
                                        <td>{role}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <SelectForm
                        label="Select new role"
                        isRequired={true}
                        selectClass_="py-3.5! px-2.5! focus:border-primary/60!"
                        {...register("role", { required: true })}
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
                        <Image src="/images/warning.svg" alt="warning" height={22} width={22} />
                        <div className="text-danger text-lg font-semibold capitalize">
                            The following users were removed because they are pending
                        </div>
                    </div>

                    {pendingUsers.map(({ name, email, status }, idx) => (
                        <div key={idx}>
                            <div className="flex items-center justify-between mt-5">
                                <div className="text-base font-medium text-secondary capitalize">
                                    {name} ({email})
                                </div>
                                <div className="text-base text-text3 capitalize">
                                    <Status status={status} />
                                </div>
                            </div>
                            <hr className="border-t border-border-color mt-3" />
                        </div>
                    ))}

                    <div className="flex items-center gap-2 my-5">
                        <Image src="/images/warning.svg" alt="warning" height={22} width={22} />
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
