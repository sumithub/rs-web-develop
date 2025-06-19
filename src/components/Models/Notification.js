import Link from "next/link";
import SecondaryButton from "../common/SecondaryButton";
import Model from "./Model";

export default function NotificationModel({ onClose }) {
    return (
        <Model onClose={onClose} title="Notification" modalClass="w-[50%]!">
            <Link href="/notifications-management">
                <SecondaryButton title="View all" />
            </Link>
        </Model>
    )
}