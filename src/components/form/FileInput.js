import React, { useState } from 'react';
import SecondaryButton from '../common/SecondaryButton';
import Image from 'next/image';

// Updated ImportCustomer component changes needed:
// 1. Add form submission handler for step 1
// 2. Update file upload registration
// 3. Add proper validation

export default function FileInput({
    formProps,
    errors,
    isRequired = false,
    label = "Upload file",
    class_ = "",
    accept
}) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isDragOver, setIsDragOver] = useState(false);

    let error = "";
    if (formProps?.name && errors?.[formProps.name]) {
        const fieldError = errors[formProps.name];
        if (fieldError.type === "pattern" || fieldError.type === "validate" || fieldError.type === "minLength") {
            error = fieldError.message;
        } else {
            error = "This field is required";
        }
    } else if (errors?.[formProps?.name]?.type) {
        error = errors[formProps?.name]?.message || "This field is required";
    }

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'text/csv') {
            setSelectedFile(file);

            // Trigger react-hook-form onChange and validation
            if (formProps?.onChange) {
                formProps.onChange(event);
            }
        } else {
            alert('Please select a CSV file');
            // Clear the input
            event.target.value = '';
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragOver(false);
        const file = event.dataTransfer.files[0];
        if (file && file.type === 'text/csv') {
            setSelectedFile(file);

            // Create a synthetic event for react-hook-form
            const syntheticEvent = {
                target: {
                    name: formProps?.name,
                    files: [file],
                    value: file
                }
            };

            if (formProps?.onChange) {
                formProps.onChange(syntheticEvent);
            }
        } else {
            alert('Please select a CSV file');
        }
    };

    const handleChooseFile = () => {
        document.getElementById('csv-file-input').click();
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);

        // Clear the file input and trigger validation
        const fileInput = document.getElementById('csv-file-input');
        if (fileInput) {
            fileInput.value = '';

            // Create synthetic event to clear the form value
            const syntheticEvent = {
                target: {
                    name: formProps?.name,
                    files: [],
                    value: null
                }
            };

            if (formProps?.onChange) {
                formProps.onChange(syntheticEvent);
            }
        }
    };

    const downloadSampleCSV = () => {
        const csvContent = "First Name,Last Name,Email,Phone,Employee First Name,Employee Last Name,And Tag,Use This\nJohn,Doe,john@example.com,123-456-7890,Jane,Smith,Manager,Template\nAlice,Johnson,alice@example.com,987-654-3210,Bob,Wilson,Developer,Sample";

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sample.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className={class_}>
            <div className="flex justify-between items-center mb-3">
                <div className="text-sm text-secondary font-medium capitalize">
                    {label}
                    {isRequired ? <span className="text-danger">*</span> : ""}
                </div>

                <button
                    type="button"
                    onClick={downloadSampleCSV}
                    className="text-white text-xs font-medium bg-primary p-2 rounded-lg border border-primary cursor-pointer capitalize disabled:pointer-events-none disabled:opacity-50 flex items-center gap-2"
                >
                    <Image src="/images/info-circle.svg" alt="info" height={16} width={16} unoptimized={true} />
                    Download Sample CSV
                </button>
            </div>

            <div
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors duration-200 ${isDragOver
                    ? 'border-primary bg-blue-50'
                    : error
                        ? 'border-danger'
                        : 'border-border-color'
                    }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <button type="button">
                    <Image src="/images/upload.svg" alt="upload" height={40} width={40} unoptimized={true} />
                </button>

                <div className="mb-4">
                    <div className="text-secondary text-lg font-semibold capitalize mb-2">
                        Drag & Drop a.CSV File Here
                    </div>

                    <div className="text-text3 text-sm text-center capitalize">
                        Upload up to 500 customers per file. The following column titles are allowed: First Name, Last Name, Email, Phone, Employee First Name, Employee Last Name, and Tag. Use this{' '}
                        <button
                            onClick={downloadSampleCSV}
                            className="text-primary underline font-medium"
                            type="button"
                        >
                            Template
                        </button>
                    </div>
                </div>

                <SecondaryButton
                    title="Choose File"
                    onClick={handleChooseFile}
                    class_="bg-white! hover:bg-primary! hover:text-white! text-primary! px-10! mt-3! w-44!"
                />

                {/* Hidden file input - properly registered with react-hook-form */}
                <input
                    {...formProps}
                    id="csv-file-input"
                    type="file"
                    accept={accept}
                    onChange={handleFileSelect}
                    className="hidden"
                />
            </div>

            {/* Error message */}
            {error && (
                <div className="mt-2 text-sm text-danger capitalize">
                    {error}
                </div>
            )}

            {/* Selected file display */}
            {selectedFile && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-green-800">{selectedFile.name}</p>
                                <p className="text-xs text-success">
                                    {(selectedFile.size / 1024).toFixed(2)} KB • CSV File
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleRemoveFile}
                            className="text-danger text-sm underline"
                            type="button"
                        >
                            Remove
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}