import { useState } from "react";
import Image from "next/image";
import Model from "../Model";
import Status from "../../Status";
import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import Checkbox from "../../form/Checkbox";
import { toast } from "react-toastify";
import axios from "axios";
import { getError } from "../../../../helper";

export default function RemoveUsers({ onClose }) {
    const [confirm, setConfirm] = useState(false);
    const [loading, setLoading] = useState(false);

    const users = [
        { id: "1", name: "John Doe", email: "john@example.com", status: "Active" },
        { id: "2", name: "Jane Smith", email: "jane@example.com", status: "Inactive" },
        { id: "3", name: "Bob Martin", email: "bob@example.com", status: "Suspended" },
    ];

    const handleRemove = async () => {
        if (!confirm) {
            toast.error("Please check 'Remove to confirm'");
            return;
        }

        try {
            setLoading(true);
            const ids = users.map((user) => user.id);
            await axios.post("/api/users/remove", { ids }); // You can change the API route
            toast.success("Users removed successfully");
            onClose();
        } catch (error) {
            toast.error(getError(error));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Model title="Remove users permanently" onClose={onClose} modalClass="w-1/2!">
            <div>
                <div className="flex items-center gap-2">
                    <Image src="/images/warning.svg" alt="warning" height={22} width={22} />
                    <div className="text-danger text-lg font-semibold capitalize">This action is irreversible</div>
                </div>

                {users.map((user) => (
                    <div key={user.id} className="mt-5">
                        <div className="flex items-center justify-between">
                            <div className="text-base font-medium text-secondary">
                                {user.name} ({user.email})
                            </div>
                            <div className="text-base text-text3 capitalize">
                                <Status status={user.status} />
                            </div>
                        </div>
                        <hr className="border-t border-border-color mt-3" />
                    </div>
                ))}

                <div className="text-danger text-sm font-medium my-4">
                    Note: you will lose all associated user data.
                </div>

                <div className="flex items-start gap-2 mt-1">
                    <Checkbox checked={confirm} onChange={() => setConfirm(!confirm)} />
                    <div className="text-secondary text-base capitalize font-medium mt-[2px]">
                        Remove to confirm
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6">
                    <CancelButton title="Cancel" onClick={onClose} />
                    <SecondaryButton
                        title="Apply Changes"
                        onClick={handleRemove}
                        disabled={!confirm || loading}
                    />
                </div>
            </div>
        </Model>
    );
}
