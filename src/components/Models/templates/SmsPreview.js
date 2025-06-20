"use client"
import Model from "../Model";
import { useForm } from "react-hook-form";

export default function SmsPreview({ onClose, type = "email" }) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        // For now, just log the data
        console.log("Form Data:", data);
    };

    return (
        <Model onClose={onClose} title={`Test Send ${type === "email" ? "Template" : "SMS"}`} modalClass="w-[50%]!">
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                <div>
                    <label className="block font-semibold mb-1">Recipient:</label>
                    {type === "email" ? (
                        <div className="flex items-center gap-2">
                            <input
                                type="email"
                                placeholder="Email"
                                {...register("recipient", { required: "Email is required" })}
                                className="border rounded px-3 py-2 w-full"
                            />
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                {...register("recipient", { required: "Phone number is required" })}
                                className="border rounded px-3 py-2 w-full"
                            />
                            <span className="text-xs text-gray-500">(For SMS Templates)</span>
                        </div>
                    )}
                    {errors.recipient && <p className="text-red-500 text-xs mt-1">{errors.recipient.message}</p>}
                </div>
                {/* Custom Message */}
                <div>
                    <label className="block font-semibold mb-1">Custom Message (Optional):</label>
                    <textarea
                        placeholder="Type your custom message here..."
                        {...register("customMessage")}
                        className="border rounded px-3 py-2 w-full min-h-[60px]"
                    />
                </div>
                {/* Template Preview */}
                <div>
                    <label className="block font-semibold mb-1 text-blue-600">Template Preview:</label>
                    <div className="border rounded bg-gray-100 p-3 text-gray-700 text-sm min-h-[60px]"></div>
                </div>
                {/* Buttons */}
                <div className="flex justify-between mt-6">
                    <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Send Test</button>
                    <button type="button" className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </Model>
    )
}