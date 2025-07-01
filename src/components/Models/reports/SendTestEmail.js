"use client"
import Image from "next/image";
import SecondaryButton from "../../common/SecondaryButton";
import Model from "../Model";
import UsersList from "../reports/UsersList"
import { useState } from "react";
import CancelButton from "../../common/CancelButton"
import { toast } from "react-toastify";
import axios from "axios";

export default function SendTestEmail({ onClose, currentData, selectedUsers, setSelectedUsers }) {
    const [openUser, setOpenUser] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Extract data from currentData prop
    const reportFrequency = currentData?.reportFrequency || 'Weekly';
    const emailSubject = currentData?.emailSubject || 'Your weekly review report - the coffee spot';
    const customMessage = currentData?.message || "Here's your weekly performance update:";

    // Get frequency-specific preview stats
    const getPreviewStats = () => {
        const baseStats = {
            Daily: { reviews: 6, rating: 4.3, source: 'Google (4 reviews)' },
            Weekly: { reviews: 42, rating: 4.5, source: 'Google (28 reviews)' },
            Monthly: { reviews: 180, rating: 4.4, source: 'Google (120 reviews)' }
        };
        return baseStats[reportFrequency] || baseStats.Weekly;
    };

    const previewStats = getPreviewStats();

    // Handle adding users from UsersList
    const handleUserSelection = (users) => {
        setSelectedUsers(users);
        setOpenUser(false);
    };

    // Handle removing a user
    const handleRemoveUser = (userId) => {
        setSelectedUsers(selectedUsers.filter(user => user.id !== userId));
    };

    // Handle copying email addresses
    const handleCopyEmails = () => {
        const emails = selectedUsers.map(user => `${user.name.toLowerCase()}@example.com`).join(', ');
        navigator.clipboard.writeText(emails).then(() => {
            // Could add a toast notification here
            console.log('Email addresses copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy email addresses: ', err);
        });
    };

    // Handle sending test email
    const handleSendTestEmail = async () => {
        if (selectedUsers.length === 0) {
            alert('Please select at least one user to send the test email.');
            return;
        }

        setIsLoading(true);

        try {
            // Simulate API call to send test email
            const emailData = {
                recipients: selectedUsers.map(user => ({
                    name: user.name,
                    email: `${user.name.toLowerCase()}@example.com`
                })),
                subject: "Your weekly review report - the coffee spot",
                businessName: "The Coffee Spot",
                reportType: "Weekly Review Report",
                reportData: {
                    newReviews: 42,
                    avgRating: 4.5,
                    topSource: "Google (28 reviews)"
                }
            };

            // Replace this with actual API call
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay

            const emailPayload = {
                recipients: selectedUsers.map(user => ({
                    name: user.name,
                    email: `${user.name.toLowerCase()}@example.com`
                })),
                subject: emailSubject,
                message: customMessage,
                businessName: "The Coffee Spot",
                reportType: `${reportFrequency} Review Report`,
                reportData: previewStats,
                currentData: currentData
            };
            await axios.post("/api", emailPayload);
            toast.success('Test email sent successfully!');
            onClose();
            setIsLoading(false);
        } catch (error) {
            console.error('Failed to send test email:', error);
            toast.error('Failed to send test email. Please try again.');
            setIsLoading(false);
        }
    };

    return <Model onClose={onClose} title="Send Test Email" modalClass="w-[40%]!">

        {openUser &&
            <UsersList
                onClose={() => {
                    setOpenUser(false)
                }}
                onSave={handleUserSelection}
                selectedUsers={selectedUsers}
            />
        }
        <div>
            <div>
                <div className="flex gap-5 items-center">
                    <h2 className="text-base text-text3">Report:</h2>
                    <h3 className="text-base font-medium">{reportFrequency} Review Report</h3>
                </div>
                <hr className="border-t border-secondary/5 my-3.5" />
                <div className="flex gap-5 items-center">
                    <h2 className="text-base text-text3">Business:</h2>
                    <h3 className="text-base font-medium">The Coffee Spot</h3>
                </div>
                <hr className="border-t border-secondary/5 my-3.5" />
            </div>
            <div>
                <h2 className="text-text3 text-base">Selected Charts</h2>
                <div className='pt-3.5'>
                    <div className='flex items-center gap-2'>
                        <Image unoptimized={true} src="/images/review-time.svg" alt='review-time' width={20} height={20} />
                        <div className='text-sm'>Review Over Time: {previewStats.reviews} New Reviews</div>
                    </div>

                    <div className='flex items-center gap-2 py-3.5'>
                        <Image unoptimized={true} src="/images/star.svg" alt='review-time' width={20} height={20} />
                        <div className='text-sm'>Avg Rating: {previewStats.rating}</div>
                    </div>

                    <div className='flex items-center gap-2'>
                        <Image unoptimized={true} src="/images/review-distribution.svg" alt='review-distribution' width={20} height={20} />
                        <div className='text-sm'>Top Source: {previewStats.source}</div>
                    </div>
                </div>
            </div>
            <hr className="border-t border-secondary/5 my-3.5" />
            <div>
                <h2 className='text-sm font-medium capitalize pb-2.5'>Send test Email To</h2>
                <div className="flex gap-[15px]">
                    <div className="w-full border border-primary/10 rounded-lg p-2.5 flex justify-between items-center">
                        <div className="flex gap-[15px] flex-wrap">
                            {selectedUsers.map(user => (
                                <div key={user.id} className="flex gap-[7px] border border-primary/10 rounded-lg p-[5px] items-center">
                                    <Image src={user.img} alt="request" width={17} height={17} />
                                    <h2 className="text-sm">{user.name}</h2>
                                    <Image
                                        unoptimized={true}
                                        src="/images/close-square.svg"
                                        alt="close-square"
                                        width={14}
                                        height={14}
                                        className="cursor-pointer hover:opacity-70"
                                        onClick={() => handleRemoveUser(user.id)}
                                    />
                                </div>
                            ))}
                            {selectedUsers.length === 0 && (
                                <div className="text-sm text-gray-400 py-1">No users selected</div>
                            )}
                        </div>
                        <div className="shrink-0">
                            <Image
                                unoptimized={true}
                                src="/images/copy2.svg"
                                alt="copy2"
                                width={20}
                                height={20}
                                className="cursor-pointer hover:opacity-70 shrink-0"
                                onClick={handleCopyEmails}
                            />
                        </div>
                    </div>
                    <div className="w-[30%] shrink-0">
                        <SecondaryButton
                            title="Add"
                            onClick={() => { setOpenUser(true) }}
                            class_="py-3.5!"
                        />
                    </div>
                </div>
            </div>
            <div className="mt-3.5">
                <h2 className="text-sm font-medium pb-2.5">Email Subject Preview</h2>
                <div className="p-2.5 bg-border-color/30 rounded-[10px]">
                    <h2 className="text-base font-medium capitalize">{emailSubject}</h2>
                </div>
            </div>
            <div className="mt-3.5">
                <h2 className="text-sm font-medium pb-2.5">Email Content Preview</h2>
                <div className='p-2.5 bg-border-color/30 rounded-[10px]'>
                    <div className=''>
                        <div className="flex items-center gap-2">
                            <h2 className="text-xs">Subject:</h2>
                            <h3 className="text-xs font-medium capitalize">{emailSubject}</h3>
                        </div>
                        <div className='py-4 text-xs'>Hi (John Deo)</div>
                        <div className='capitalize text-xs'>{customMessage}</div>
                    </div>

                    <div className='pt-4'>
                        <div className='flex items-center gap-2'>
                            <Image unoptimized={true} src="/images/review-time.svg" alt='review-time' width={20} height={20} />
                            <div className='text-sm'>Review Over Time: {previewStats.reviews} New Reviews</div>
                        </div>

                        <div className='flex items-center gap-2 py-3.5'>
                            <Image unoptimized={true} src="/images/star.svg" alt='review-time' width={20} height={20} />
                            <div className='text-sm'>Avg Rating: {previewStats.rating}</div>
                        </div>

                        <div className='flex items-center gap-2'>
                            <Image unoptimized={true} src="/images/review-distribution.svg" alt='review-distribution' width={20} height={20} />
                            <div className='text-sm'>Top Source: {previewStats.source}</div>
                        </div>
                    </div>

                    <SecondaryButton title="View Full Report" type='button' class_='text-xs! w-auto! font-normal! my-5!' />
                    <div className='text-sm capitalize'>
                        <div className='text-xs'><span className="font-black text-2xl leading-0">.</span> The coffee Spot Team</div>
                        <div className='text-xs'>[Unsubscribe]</div>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-2 gap-5 mt-[30px]'>
                <SecondaryButton
                    title={isLoading ? "Sending..." : "Send Test Email"}
                    type='submit'
                    class_="text-lg!"
                    onClick={handleSendTestEmail}
                    disabled={isLoading}
                />
                <CancelButton
                    title="Cancel"
                    onClick={onClose}
                    class_="text-lg!"
                    disabled={isLoading}
                />
            </div>
        </div>
    </Model>
}