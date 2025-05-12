"use client"
import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import SendInvite from "../../components/Models/users/SendInvite"
import ResendInvitation from "../../components/Models/users/ResendInvitation"
import RemoveUser from "../../components/Models/users/RemoveUser"
import SuspendUser from "../../components/Models/users/SuspendUser";
import ChangeUserRole from "../../components/Models/users/ChangeUserRole";

export default function Test() {
    const [openSend, setOpenSend] = useState(false)
    const [openInvite, setOpenInvite] = useState(false)
    const [openUser, setOpenUser] = useState(false)
    const [openSuspend, setOpenSuspend] = useState(false)
    const [openRole, setOpenRole] = useState(false)

    return <AdminLayout>

        {openSend &&
            <SendInvite

                onClose={() => {
                    setOpenSend(false)
                }}

                onSave={() => {
                    setOpenSend(true)
                }} />
        }

        {openInvite &&
            <ResendInvitation

                onClose={() => {
                    setOpenInvite(false)
                }}

                onSave={() => {
                    setOpenInvite(true)
                }} />
        }

        {openUser &&
            <RemoveUser

                onClose={() => {
                    setOpenUser(false)
                }}

                onSave={() => {
                    setOpenUser(true)
                }} />
        }

        {openSuspend &&
            <SuspendUser

                onClose={() => {
                    setOpenSuspend(false)
                }}

                onSave={() => {
                    setOpenSuspend(true)
                }} />
        }

        {openRole &&
            <ChangeUserRole

                onClose={() => {
                    setOpenRole(false)
                }}

                onSave={() => {
                    setOpenRole(true)
                }} />
        }

        <div className="flex flex-col gap-y-3">
            <div className="text-primary text-xl cursor-pointer" onClick={() => { setOpenSend(true) }}>Send Invite</div>
            <div className="text-primary text-xl cursor-pointer" onClick={() => { setOpenInvite(true) }}>Resend Invite Confirmation</div>
            <div className="text-primary text-xl cursor-pointer" onClick={() => { setOpenUser(true) }}>Remove User</div>
            <div className="text-primary text-xl cursor-pointer" onClick={() => { setOpenSuspend(true) }}>Suspend/Reactivate User</div>
            <div className="text-primary text-xl cursor-pointer" onClick={() => { setOpenRole(true) }}>Change User Role
            </div>
        </div>
    </AdminLayout>
}