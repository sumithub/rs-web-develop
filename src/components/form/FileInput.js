import React, { useState } from 'react';
import SecondaryButton from '../common/SecondaryButton';
import Image from 'next/image';

export default function FileInput() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isDragOver, setIsDragOver] = useState(false);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'text/csv') {
            setSelectedFile(file);
        } else {
            alert('Please select a CSV file');
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
        } else {
            alert('Please select a CSV file');
        }
    };

    const handleChooseFile = () => {
        document.getElementById('csv-file-input').click();
    };

    const downloadSampleCSV = () => {
        // Create sample CSV content
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
        <div>
            <div>
                <div className="flex justify-between items-center mb-4">
                    <div className="text-sm capitalize font-medium text-secondary">Upload file<span className="text-danger">*</span></div>

                    <button type="button" onClick={downloadSampleCSV} className="text-white text-xs font-medium bg-primary p-2 rounded-lg border border-primary cursor-pointer capitalize disabled:pointer-events-none disabled:opacity-50 flex items-center gap-2"><Image src="/images/info-circle.svg" alt="info" height={16} width={16} unoptimized={true} />Download Sample CSV</button>
                </div>

                <div
                    className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors duration-200 ${isDragOver
                        ? 'border-primary bg-blue-50'
                        : 'border-border-color'
                        }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <button type="button"><Image src="/images/upload.svg" alt="upload" height={40} width={40} unoptimized={true} /></button>

                    <div className="mb-4">
                        <div className="text-secondary text-lg font-semibold capitalize mb-2">Drag & Drop a.CSV File Here</div>

                        <div className="text-text3 text-sm text-center capitalize">Upload up to 500 customers per file. The following column titles are allowed: First Name, Last Name, Email, Phone, Employee First Name, Employee Last Name, and Tag. Use this <button
                            onClick={downloadSampleCSV}
                            className="text-primary underline font-medium"> Template
                        </button>
                        </div>
                    </div>

                    <SecondaryButton title="Choose File" onClick={handleChooseFile} class_="bg-white! hover:bg-primary! hover:text-white! text-primary! px-10! mt-3! w-44!" />
                    <input
                        id="csv-file-input"
                        type="file"
                        accept=".csv"
                        onChange={handleFileSelect}
                        className="hidden"
                    />
                </div>

                {selectedFile && (
                    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
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
                                onClick={() => setSelectedFile(null)}
                                className="text-danger text-sm underline">
                                Remove
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}