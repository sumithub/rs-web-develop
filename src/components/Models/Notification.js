import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import SecondaryButton from "../common/SecondaryButton";
import Model from "./Model";
import Image from "next/image";

export default function NotificationModel({ onClose }) {
    const [uploadProgress, setUploadProgress] = useState(80);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState('paused'); // 'paused', 'uploading', 'completed', 'cancelled', 'error'
    const [fileName, setFileName] = useState('image 123-Finalbatch.exe');
    const [hasActiveUpload, setHasActiveUpload] = useState(true);
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            name: "Carmen Parksouth",
            message: "Hey, can you check the latest documents posted in the group?",
            time: "1 day",
            avatar: "/images/carmen.png",
            isRead: false
        },
        {
            id: 2,
            name: "Carmen Parksouth",
            message: "Hey, can you check the latest documents posted in the group?",
            time: "1 day",
            avatar: "/images/carmen.png",
            isRead: true
        },
    ]);

    const fileInputRef = useRef(null);
    const uploadIntervalRef = useRef(null);

    // Simulate upload progress - only when actually uploading
    useEffect(() => {
        if (isUploading && uploadStatus === 'uploading') {
            uploadIntervalRef.current = setInterval(() => {
                setUploadProgress(prev => {
                    if (prev >= 100) {
                        setIsUploading(false);
                        setUploadStatus('completed');
                        clearInterval(uploadIntervalRef.current);
                        return 100;
                    }
                    return prev + Math.random() * 8; // Slightly faster progress
                });
            }, 300);
        }

        return () => {
            if (uploadIntervalRef.current) {
                clearInterval(uploadIntervalRef.current);
            }
        };
    }, [isUploading, uploadStatus]);

    const startUpload = (file) => {
        setFileName(file.name);
        setUploadProgress(0);
        setIsUploading(true);
        setUploadStatus('uploading');
        setHasActiveUpload(true);
    };

    const handleCancelUpload = () => {
        setIsUploading(false);
        setUploadStatus('cancelled');
        if (uploadIntervalRef.current) {
            clearInterval(uploadIntervalRef.current);
        }
    };

    const handleUploadFile = () => {
        fileInputRef.current?.click();
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            startUpload(file);
        }
        // Reset the input value so the same file can be selected again
        event.target.value = '';
    };

    // const handleRetryUpload = () => {
    //     setUploadProgress(0);
    //     setIsUploading(true);
    //     setUploadStatus('uploading');
    // };

    const handleDismissUpload = () => {
        setHasActiveUpload(false);
        setUploadStatus('idle');
        setUploadProgress(0);
        setFileName('');
        if (uploadIntervalRef.current) {
            clearInterval(uploadIntervalRef.current);
        }
    };

    const markAsRead = (notificationId) => {
        setNotifications(prev =>
            prev.map(notif =>
                notif.id === notificationId
                    ? { ...notif, isRead: true }
                    : notif
            )
        );
    };

    const removeNotification = (notificationId) => {
        setNotifications(prev =>
            prev.filter(notif => notif.id !== notificationId)
        );
    };

    const getUploadStatusMessage = () => {
        switch (uploadStatus) {
            case 'paused':
                return `${Math.round(uploadProgress)}% uploaded...`;
            case 'uploading':
                return `${Math.round(uploadProgress)}% uploaded...`;
            case 'completed':
                return 'Upload completed successfully!';
            case 'cancelled':
                return 'Upload cancelled';
            case 'error':
                return 'Upload failed. Please try again.';
            default:
                return '';
        }
    };

    const getUploadStatusColor = () => {
        switch (uploadStatus) {
            case 'completed':
                return 'text-success';
            case 'cancelled':
            case 'error':
                return 'text-danger';
            default:
                return 'text-secondary font-semibold';
        }
    };

    return (
        <Model
            onClose={onClose}
            title="Notification"
            modalClass="w-[30%]! shadow-[0px_0px_40px_0px_#0000001A]!"
            flexClass="items-start! justify-end!"
            class_="top-16! right-20! inset-0 items-start! justify-end!"
            modelHeaderClass="bg-white!"
            modalBodyClass=""
            overlayClass="bg-white! opacity-0!"
        >
            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
                accept="*/*"
            />

            {/* Upload Section - Show when there's an active upload */}
            {hasActiveUpload && (
                <>
                    <div className="flex justify-between gap-2.5">
                        <div className="w-auto">
                            <Image
                                src="/images/upload2.svg"
                                alt="upload2"
                                width={42}
                                height={42}
                            />
                        </div>
                        <div className="w-full">
                            <h2 className="text-lg font-semibold">
                                Uploading &#39;{fileName}&#39;
                            </h2>
                            <p className="text-sm text-text3 py-2">
                                Please wait while we upload your file.
                            </p>
                            <div>
                                <div className="bg-text3 w-full h-2.5 rounded-3xl">
                                    <div
                                        className={`h-2.5 rounded-3xl transition-all duration-300 ${uploadStatus === 'completed'
                                            ? 'bg-green-500'
                                            : uploadStatus === 'cancelled' || uploadStatus === 'error'
                                                ? 'bg-red-500'
                                                : 'bg-primary'
                                            }`}
                                        style={{ width: `${uploadProgress}%` }}
                                    ></div>
                                </div>
                                <h2 className={`text-end text-xs mt-2.5 ${getUploadStatusColor()}`}>
                                    {getUploadStatusMessage()}
                                </h2>
                                <div className="flex items-center gap-4 mt-1">
                                    <button
                                        className="text-xs hover:underline focus:outline-none focus:underline transition-colors"
                                        onClick={handleCancelUpload}
                                        type="button"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="text-xs text-primary font-semibold hover:underline focus:outline-none focus:underline transition-colors"
                                        onClick={handleUploadFile}
                                        type="button"
                                    >
                                        Upload another
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="w-auto">
                            <button
                                onClick={handleDismissUpload}
                                className="hover:opacity-70 focus:outline-none focus:opacity-70 transition-opacity"
                                type="button"
                                aria-label="Close upload section"
                            >
                                <Image
                                    src="/images/cancel.svg"
                                    alt="cancel"
                                    width={20}
                                    height={20}
                                />
                            </button>
                        </div>
                    </div>
                    <hr className="border-t border-border2 my-3.5" />
                </>
            )}

            {/* Notification Cards */}
            {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                    <div
                        key={notification.id}
                        className={`${index === 0 ? 'bg-secondary2 rounded-lg mb-2.5' : ''}`}
                    >
                        <Card
                            notification={notification}
                            onMarkAsRead={markAsRead}
                            onRemove={removeNotification}
                        />
                    </div>
                ))
            ) : (
                <div className="text-center h-80 flex items-center justify-center">
                    <p className="text-text3 text-xl">No data</p>
                </div>
            )}

            {/* View All Button */}
            <Link href="/notifications-management">
                <SecondaryButton title="View all" />
            </Link>
        </Model>
    );
}

const Card = ({ notification, onMarkAsRead, onRemove }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="flex justify-between gap-2.5 p-3.5 relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="w-auto">
                <div className="relative">
                    <Image
                        src={notification.avatar}
                        alt={notification.name}
                        width={46}
                        height={46}
                        className="rounded-full"
                    />
                    {!notification.isRead && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></div>
                    )}
                </div>
            </div>
            <div className="w-full">
                <h2 className={`text-base font-medium ${!notification.isRead ? 'font-semibold' : ''}`}>
                    {notification.name}
                </h2>
                <p className={`text-sm text-text3 pt-2 ${!notification.isRead ? 'font-medium' : ''}`}>
                    {notification.message}
                </p>
            </div>
            <div className="w-[25%] flex flex-col items-end gap-2">
                <h2 className="text-sm text-end shrink-0 text-text3">
                    {notification.time}
                </h2>

                {/* Action buttons - show on hover */}
                {isHovered && (
                    <div className="flex flex-col items-end gap-1">
                        {!notification.isRead && (
                            <button
                                onClick={() => onMarkAsRead(notification.id)}
                                className="text-xs text-primary hover:underline focus:outline-none focus:underline"
                                type="button"
                            >
                                Mark read
                            </button>
                        )}
                        <button
                            onClick={() => onRemove(notification.id)}
                            className="text-xs text-red-500 hover:underline focus:outline-none focus:underline"
                            type="button"
                        >
                            Remove
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};