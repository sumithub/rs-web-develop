"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import Model from '../Model';
import SecondaryButton from '../../../components/common/SecondaryButton';
import InputForm from '../../form/InputForm';
import { getError, validPasswordRgx } from '../../../../helper';
import CancelButton from '../../common/CancelButton';

function ResetPassword({ onClose }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [sending, setSending] = useState(false);

    const onSubmit = async (data) => {
        try {
            setSending(true);
            await axios.put(`/api`, {
                password: data.newPassword,
            });

            toast.success("Upgraded successfully");
            onClose();
        } catch (error) {
            toast.error(getError(error));
        } finally {
            setSending(false);
        }
    };

    return (
        <div>
            <Model onClose={onClose} title="Reset Password" modalClass="w-1/2!">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <InputForm
                            label="New Password"
                            inputType="password"
                            isRequired={true}
                            placeholder="Enter new password"
                            class_='mt-0!'
                            formProps={{
                                ...register("newPassword", {
                                    required: "Password is required",
                                    minLength: {
                                        value: validPasswordRgx,
                                        message: "Password must be at least 6 characters"
                                    }
                                })
                            }}
                            errors={errors}
                        />
                    </div>

                    {/* <div>
                        <div className="flex align-items justify-center text-2xl font-semibold text-danger">Failed to reset password. Please Send</div>
                        <div className="flex align-items justify-center text-2xl font-semibold text-danger">Reset Request</div>
                    </div> */}

                    <div className="grid grid-cols-2 gap-3 mt-6">
                        <CancelButton title="Cancel" onClick={onClose} />
                        <SecondaryButton title="Upgrade password" type="submit" disabled={sending} />
                    </div>
                </form>
            </Model>
        </div>
    );
}

export default ResetPassword;
