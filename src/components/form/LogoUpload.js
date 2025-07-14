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
    accept = ".csv,.xls,.xlsx",
    setFile,
    selectedFile: propSelectedFile = null,
    showToast
}) {
    const [selectedFile, setSelectedFile] = useState(propSelectedFile);
    const [isDragOver, setIsDragOver] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isLogoAdded, setIsLogoAdded] = useState(false);

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
            error = "Required";
        }
    } else if (errors?.[formProps?.name]?.type) {
        error = errors[formProps?.name]?.message || "Required";
    }

    const isValidFile = (file) => {
        const validSpreadsheetTypes = [
            'text/csv',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ];
        const validExtensions = ['.csv', '.xls', '.xlsx'];
        const fileName = file.name.toLowerCase();

        return validSpreadsheetTypes.includes(file.type) ||
            validExtensions.some(ext => fileName.endsWith(ext));
    };

    const isImageFile = (file) => {
        const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
        const fileName = file.name.toLowerCase();

        return validImageTypes.includes(file.type) ||
            imageExtensions.some(ext => fileName.endsWith(ext));
    };

    // Check if file is accepted spreadsheet type (CSV, XLS, XLSX)
    const isSpreadsheetFile = (file) => {
        const validSpreadsheetTypes = [
            'text/csv',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ];
        const spreadsheetExtensions = ['.csv', '.xls', '.xlsx'];
        const fileName = file.name.toLowerCase();

        return validSpreadsheetTypes.includes(file.type) ||
            spreadsheetExtensions.some(ext => fileName.endsWith(ext));
    };

    // Get file name without extension for display
    const getFileNameWithoutExtension = (fileName) => {
        return fileName.replace(/\.[^/.]+$/, "");
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
                showToast('Please select a valid file (CSV, XLS, XLSX)');
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
                showToast('Please select a valid file (CSV, XLS, XLSX)', 'error');
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
        setIsLogoAdded(false);
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

    const handleAddToLogo = () => {
        setIsLogoAdded(true);
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
                <label className="text-sm font-medium text-secondary inline-flex items-center gap-[5px] capitalize">
                    {label}
                    {isRequired && <span className="text-danger ml-1">*</span>}
                </label>
            </div>

            {/* Only show drag & drop area if no file is selected */}
            {!selectedFile ? (
                <div
                    className={`border-2 border-dashed rounded-lg px-8 py-3.5 text-center transition-all duration-200 cursor-pointer ${getBorderColor()}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleChooseFile}
                >
                    <div className="flex flex-col items-center">
                        <Image src="/images/upload.svg" alt="upload" width={32} height={32} />

                        <div className="text-lg font-semibold capitalize mb-2.5 mt-3.5">
                            Drag & Drop Or Choose Logo To Upload
                        </div>

                        <div className="text-sm text-text3 mb-3.5">
                            Supported Formats: CSV, XLS, XLSX
                        </div>

                        {/* <SecondaryButton title="Choose File" class_="text-base! font-normal!" /> */}
                    </div>
                </div>
            ) : !isLogoAdded ? (
                /* Show file selection with Add to Logo button */
                <div className="rounded-lg p-7 shadow-[0px_0px_25px_0px_#0000000F]">
                    {/* Company preview section */}
                    <div className="text-center mb-3.5">
                        <div className="flex items-center justify-center gap-3 mb-4 h-40 bg-dark rounded-lg">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center">
                                <Image src="/images/logo.svg" alt='logo' width={32} height={32} />
                            </div>
                            <span className="text-lg font-semibold">
                                {selectedFile ? getFileNameWithoutExtension(selectedFile.name) : "ABC Solutions"}
                            </span>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center justify-between mt-6">
                        <CancelButton
                            title="Cancel"
                            class_="text-xs! border border-border2! hover:bg-dark! bg-white! py-[7px]! px-2.5!"
                            mainClass="shrink-0"
                            onClick={handleRemoveFile}
                        />
                        <SecondaryButton
                            title="Add To Logo"
                            class_="text-xs! font-semibold! py-[7px]! px-2.5!"
                            onClick={handleAddToLogo}
                        />
                    </div>
                </div>
            ) : (
                /* Show success view with file details after adding to logo */
                <div className="rounded-lg p-7 shadow-[0px_0px_25px_0px_#0000000F]">
                    {/* Company preview section */}
                    <div className="text-center mb-3.5">
                        <div className="flex items-center justify-center gap-3 mb-4 h-40 bg-dark rounded-lg">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center">
                                <Image src="/images/logo.svg" alt='logo' width={32} height={32} />
                            </div>
                            <span className="text-lg font-semibold">
                                {selectedFile ? getFileNameWithoutExtension(selectedFile.name) : "ABC Solutions"}
                            </span>
                        </div>
                    </div>

                    {/* File details section - show after adding to logo */}
                    <div className="flex items-center justify-between p-3.5 bg-white rounded-lg border border-primary/10">
                        <div className="flex items-center gap-3">
                            <Image src="/images/csv.svg" alt='csv' width={30} height={35} />

                            {/* File info */}
                            <div>
                                <p className="text-sm font-medium capitalize">
                                    {selectedFile.name}
                                </p>
                                <p className="text-xs font-medium text-text3">
                                    {(selectedFile.size / 1024).toFixed(2)} KB
                                </p>
                            </div>
                        </div>

                        {/* Success checkmark */}
                        <Image src="/images/checked.svg" alt='checked' width={30} height={30} />
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center justify-between mt-6">
                        <CancelButton
                            title="Remove"
                            class_="text-xs! border border-border2! hover:bg-dark! bg-white! py-[7px]! px-2.5!"
                            mainClass="shrink-0"
                            onClick={handleRemoveFile}
                        />
                        <SecondaryButton
                            title="Logo Added"
                            class_="text-xs! font-semibold! py-[8px]! px-2.5! bg-success! text-white!"
                            disabled
                        />
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
                <div className="mt-2 text-xs text-danger capitalize">
                    {error}
                </div>
            )}
        </div>
    );
}