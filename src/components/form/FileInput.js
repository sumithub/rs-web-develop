import React, { useState, useEffect } from 'react';
import SecondaryButton from '../common/SecondaryButton';
import Image from 'next/image';

export default function FileInput({
    formProps,
    errors,
    isRequired = false,
    label = "Upload file",
    class_ = "",
    accept,
    setFile,
    selectedFile: propSelectedFile = null,
    showToast
}) {
    const [selectedFile, setSelectedFile] = useState(propSelectedFile);
    const [isDragOver, setIsDragOver] = useState(false);

    // Update selectedFile when prop changes (when navigating back to step 1)
    useEffect(() => {
        setSelectedFile(propSelectedFile);
    }, [propSelectedFile]);

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
            if (setFile)
                setFile(file)
            // Trigger react-hook-form onChange and validation
            if (formProps?.onChange) {
                formProps.onChange(event);
            }
        } else {
            // Show toast instead of alert
            if (showToast) {
                showToast('Please select a CSV file');
            }
            // Clear the input
            event.target.value = '';
            setSelectedFile(null);
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
            if (setFile)
                setFile(file)
            // Get the actual file input element
            const fileInput = document.getElementById('csv-file-input');
            if (fileInput) {
                // Create a new FileList with the dropped file
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                fileInput.files = dataTransfer.files;

                // Create a proper synthetic event that matches the file input structure
                const syntheticEvent = {
                    target: fileInput,
                    currentTarget: fileInput
                };

                // Trigger the onChange handler
                if (formProps?.onChange) {
                    formProps.onChange(syntheticEvent);
                }
            }
        } else {
            // Show toast instead of alert
            if (showToast) {
                showToast('Please select a CSV file', 'error');
            }
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
                target: fileInput,
                currentTarget: fileInput
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

    // Determine border color based on state
    const getBorderColor = () => {
        if (isDragOver) return 'border-primary bg-blue-50';
        if (error) return 'border-danger';
        if (selectedFile) return 'border-green-500 bg-green-50';
        return 'border-border-color';
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

            {/* Only show drag & drop area if no file is selected */}
            {!selectedFile ? (
                <div
                    className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors duration-200 ${getBorderColor()}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <button type="button">
                        <Image src="/images/upload.svg" alt="upload" height={40} width={40} unoptimized={true} />
                    </button>

                    <div className="mb-4">
                        <div className="text-secondary text-lg font-semibold capitalize mb-2">
                            Drag & Drop A.CSV File Here
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
            ) : (
                /* Show selected file display instead of drag & drop area */
                <div className="border-2 border-solid border-green-500 bg-green-50 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div>
                                <p className="text-base font-medium text-green-800">{selectedFile.name}</p>
                                <p className="text-sm text-green-600">
                                    {(selectedFile.size / 1024).toFixed(2)} KB • CSV File
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleRemoveFile}
                            className="text-danger text-sm underline font-medium"
                            type="button"
                        >
                            Remove
                        </button>
                    </div>

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
            )}

            {/* Error message - only show if there's an error AND no file is selected */}
            {error && !selectedFile && (
                <div className="mt-2 text-xs text-danger capitalize">
                    {error}
                </div>
            )}
        </div>
    );
}