"use client"
import SecondaryButton from "../../common/SecondaryButton";
import Model from "../Model";
import UsersList from "../reports/UsersList"
import { useState } from "react";

export default function SendTestEmail({ onClose }) {
    const [openUser, setOpenUser] = useState(false)
    return <Model onClose={onClose} title="Send Test Email" modalClass="w-1/2!">

        {openUser &&
            <UsersList
                onClose={() => {
                    setOpenUser(false)
                }}

                onSave={() => {
                    setOpenUser(true)
                }}
            />
        }

        <SecondaryButton title="Add" onClick={() => { setOpenUser(true) }} />

    </Model>
}