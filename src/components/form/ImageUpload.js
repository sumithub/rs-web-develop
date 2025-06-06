"use client";
import { useState, useRef } from "react";
import SecondaryButton from "../common/SecondaryButton";

export default function ImageUpload({
    class_ = "",
    setValue,
    watch,
    clearErrors,  // Add clearErrors prop
    trigger,      // Add trigger prop for validation
    isRequired,
    label = "Add Image",
    labelClass,
    formProps,
    errors,
    disabled
}) {
    const fileInputRef = useRef(null);
    const [uploadedFileName, setUploadedFileName] = useState("");

    // Get error for this field
    let error = "";
    if (formProps?.name && errors?.[formProps.name]) {
        const fieldError = errors[formProps.name];
        if (fieldError.type === "pattern" || fieldError.type === "validate" || fieldError.type === "minLength") {
            error = fieldError.message;
        } else {
            error = "This field is required";
        }
    } else if (errors[formProps?.name]?.type) {
        error = errors[formProps?.name]?.message || "This field is required";
    }

    // Check if image is uploaded by watching the field value
    const currentValue = watch ? watch(formProps?.name) : null;

    const handleUploadClick = () => {
        if (!disabled) {
            fileInputRef.current?.click();
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setUploadedFileName(file.name);
            // Set the file in the form
            setValue(formProps?.name, file);

            // Clear the error for this field
            if (clearErrors) {
                clearErrors(formProps?.name);
            }

            // Or trigger validation to clear error
            if (trigger) {
                trigger(formProps?.name);
            }
        }
    };

    const handleRemoveImage = () => {
        setUploadedFileName("");
        setValue(formProps?.name, null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }

        // Trigger validation to show error again if field is required
        if (trigger) {
            trigger(formProps?.name);
        }
    };

    return (
        <div className={`mt-[15px] ${class_}`}>
            <label className={`text-sm font-medium text-secondary capitalize ${labelClass}`}>
                {label}
                {isRequired ? <span className="text-danger">*</span> : <span className="text-neutral-400"> (Optional)</span>}
            </label>

            <div className={`mt-1 border ${error ? "border-danger" : "border-input-border"} rounded-lg py-3 px-2.5 bg-white`}>
                {!currentValue && !uploadedFileName ? (
                    // Show upload button when no image is uploaded

                    <SecondaryButton title="Upload Image" onClick={handleUploadClick} type="button" class_="w-40!" />

                ) : (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <svg
                                className="w-5 h-5 text-text3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            <span className="text-sm text-text3">
                                {uploadedFileName || (currentValue?.name || "Image uploaded")}
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="text-danger text-sm"
                        >
                            Remove
                        </button>
                    </div>
                )}
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                disabled={disabled}
            />

            {error && <p className="text-xs pt-[3px] capitalize text-danger">{error}</p>}
        </div>
    );
}