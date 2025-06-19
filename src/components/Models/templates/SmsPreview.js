"use client"
import Model from "../Model";

export default function SmsPreview({ onClose, type = "email" }) {
    return (
        <Model onClose={onClose} title={`Test send ${type}`} modalClass="w-[50%]!">
            <div>
                Test send {type}
            </div>
        </Model>
    )
}