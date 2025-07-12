import React, { useState, useEffect } from 'react';
import SecondaryButton from '../common/SecondaryButton';
import CancelButton from '../common/CancelButton';
import Image from 'next/image';

export default function LogoUpload({
    formProps,
    errors,
    isRequired = false,
    label = "Upload Logo Here",
    class_ = "",
    accept = "image/*,.csv,.xls,.xlsx",
    setFile,
    selectedFile: propSelectedFile = null,
    showToast
}) {
    const [selectedFile, setSelectedFile] = useState(propSelectedFile);
    const [isDragOver, setIsDragOver] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);

    // Update selectedFile when prop changes
    useEffect(() => {
        setSelectedFile(propSelectedFile);
        if (propSelectedFile) {
            const url = URL.createObjectURL(propSelectedFile);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        } else {
            setPreviewUrl(null);
        }
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

    const isValidFile = (file) => {
        const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        const validSpreadsheetTypes = [
            'text/csv',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ];
        const validExtensions = ['.csv', '.xls', '.xlsx', '.jpg', '.jpeg', '.png', '.gif', '.webp'];
        const fileName = file.name.toLowerCase();

        return [...validImageTypes, ...validSpreadsheetTypes].includes(file.type) ||
            validExtensions.some(ext => fileName.endsWith(ext));
    };

    const isImageFile = (file) => {
        const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
        const fileName = file.name.toLowerCase();

        return validImageTypes.includes(file.type) ||
            imageExtensions.some(ext => fileName.endsWith(ext));
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        console.log("File selected:", file); // Debug log

        if (file && isValidFile(file)) {
            setSelectedFile(file);
            if (setFile) {
                setFile(file);
            }

            // Create preview URL
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);

            // Call the formProps onChange directly with the event
            if (formProps?.onChange) {
                formProps.onChange(event);
            }
        } else if (file) {
            // Show toast for invalid file types
            if (showToast) {
                showToast('Please select a valid file (JPG, PNG, GIF, WebP, CSV, XLS, XLSX)');
            }
            // Clear the input
            event.target.value = '';
            setSelectedFile(null);
            setPreviewUrl(null);
            if (setFile) {
                setFile(null);
            }

            // Clear the form value
            if (formProps?.onChange) {
                const clearEvent = { ...event, target: { ...event.target, files: [], value: '' } };
                formProps.onChange(clearEvent);
            }
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
        if (file && isValidFile(file)) {
            setSelectedFile(file);
            if (setFile) {
                setFile(file);
            }

            // Create preview URL
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);

            // Get the actual file input element and update it
            const fileInput = document.getElementById('logo-file-input');
            if (fileInput) {
                // Create a new FileList with the dropped file
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                fileInput.files = dataTransfer.files;

                // Create a synthetic event and trigger onChange
                const syntheticEvent = {
                    target: fileInput,
                    currentTarget: fileInput
                };

                if (formProps?.onChange) {
                    formProps.onChange(syntheticEvent);
                }
            }
        } else {
            if (showToast) {
                showToast('Please select a valid file (JPG, PNG, GIF, WebP, CSV, XLS, XLSX)', 'error');
            }
        }
    };

    const handleChooseFile = () => {
        const fileInput = document.getElementById('logo-file-input');
        if (fileInput) {
            fileInput.click();
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        if (setFile) {
            setFile(null);
        }

        // Clear the file input
        const fileInput = document.getElementById('logo-file-input');
        if (fileInput) {
            fileInput.value = '';

            // Create a clear event for react-hook-form
            const clearEvent = {
                target: {
                    ...fileInput,
                    files: [],
                    value: ''
                }
            };

            if (formProps?.onChange) {
                formProps.onChange(clearEvent);
            }
        }
    };

    // Determine border color based on state
    const getBorderColor = () => {
        if (isDragOver) return 'border-blue-500 bg-blue-50';
        if (error) return 'border-red-500';
        if (selectedFile) return 'border-green-500 bg-green-50';
        return 'border-gray-300 border-dashed';
    };

    return (
        <div className={class_}>
            <div className="mb-3">
                <label className="text-sm text-gray-700 font-medium">
                    {label}
                    {isRequired && <span className="text-red-500 ml-1">*</span>}
                </label>
            </div>

            {/* Only show drag & drop area if no file is selected */}
            {!selectedFile ? (
                <div
                    className={`border-2 border-dashed rounded-lg px-8 py-3.5 text-center transition-all duration-200 cursor-pointer hover:bg-gray-50 ${getBorderColor()}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleChooseFile}
                >
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3.5">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                        </div>

                        <div className="text-lg font-semibold mb-2.5">
                            Drag & Drop Or Choose Logo To Upload
                        </div>

                        <div className="text-sm text-text3 mb-3.5">
                            Supported Formats: JPG, PNG, GIF, WebP, CSV, XLS, XLSX
                        </div>

                        {/* <button
                            type="button"
                            className="px-6 py-2 bg-primary text-white rounded-lg font-medium transition-colors"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleChooseFile();
                            }}
                        >
                            Choose File
                        </button> */}
                        <SecondaryButton title="Choose File" onClick={() => { setOpen(true) }} class_="text-base! font-normal!" />
                    </div>
                </div>
            ) : (
                /* Show selected file display with company preview */
                <div className="rounded-lg p-7 shadow-[0px_0px_25px_0px_#0000000F]">
                    {/* Company preview section */}
                    <div className="text-center mb-3.5">
                        <div className="flex items-center justify-center gap-3 mb-4 h-40 bg-dark rounded-lg">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center">
                                {previewUrl && selectedFile && isImageFile(selectedFile) ? (
                                    <img
                                        src={previewUrl}
                                        alt="Logo preview"
                                        className="w-full h-full object-contain rounded-full"
                                    />
                                ) : (
                                    <Image src="/images/logo.svg" alt='logo' width={32} height={32} />
                                    // <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    //     <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                    // </svg>
                                )}
                            </div>
                            <span className="text-lg font-semibold text-gray-800">ABC Solutions</span>
                        </div>
                    </div>

                    {/* File details section */}
                    <div className="flex items-center justify-between p-3.5 bg-white rounded-lg border border-border2">
                        <div className="flex items-center gap-3">
                            {/* File icon */}
                            <div className="w-10 h-10 bg-green-100 rounded flex items-center justify-center">
                                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                </svg>
                            </div>

                            {/* File info */}
                            <div>
                                <p className="text-sm font-medium text-gray-800">
                                    {selectedFile.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {(selectedFile.size / 1024).toFixed(2)} KB
                                </p>
                            </div>
                        </div>

                        {/* Success checkmark */}
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center justify-between mt-6">
                        {/* <button
                            onClick={handleRemoveFile}
                            className="text-gray-500 text-sm hover:text-gray-700 transition-colors"
                            type="button"
                        >
                            Cancel
                        </button> */}
                        <CancelButton title="Cancel" class_="text-xs! border border-border2! hover:bg-dark! bg-white!" mainClass="shrink-0" />
                        <SecondaryButton title="Add To Logo" onClick={() => { setOpen(true) }} class_="text-xs! font-semibold!" />
                    </div>
                </div>
            )}

            {/* Hidden file input */}
            <input
                {...formProps}
                id="logo-file-input"
                type="file"
                accept={accept}
                onChange={handleFileSelect}
                className="hidden"
            />

            {/* Error message - only show if there's an error AND no file is selected */}
            {error && !selectedFile && (
                <div className="mt-2 text-sm text-danger capitalize">
                    {error}
                </div>
            )}
        </div>
    );
}