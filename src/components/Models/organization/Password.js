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

function ResetPassword({ onClose, id }) {
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
    const [sending, setSending] = useState(false);

    const onSubmit = async (data) => {
        try {
            setSending(true);
            await axios.put(`/api`, {
                password: data.newPassword,
            });

            { !id ? toast.success("Sended successfully") : toast.success("Updated successfully") };
            onClose();
        } catch (error) {
            toast.error(getError(error));
        } finally {
            setSending(false);
        }
    };

    return (
        <div>
            <Model onClose={onClose} title={!id ? "Reset Password" : "Change Password"} modalClass="w-1/2!">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <InputForm
                            label="New Password"
                            name="password"
                            inputType="password"
                            placeholder="Create A Password"
                            formProps={{
                                ...register("password", {
                                    required: true,
                                    pattern: {
                                        value: validPasswordRgx,
                                        message:
                                            "Password must be at least 8 characters long and include a mix of letters, numbers, and special characters",
                                    },
                                }),
                            }}
                            isRequired={true}
                            errors={errors}
                            setValue={setValue}
                            watch={watch}
                        />
                    </div>

                    {/* <div>
                        <div className="flex align-items justify-center text-2xl font-semibold text-danger">Failed to reset password. Please Send</div>
                        <div className="flex align-items justify-center text-2xl font-semibold text-danger">Reset Request</div>
                    </div> */}

                    <div className="grid grid-cols-2 gap-3 mt-6">
                        <CancelButton title="Cancel" onClick={onClose} />
                        <SecondaryButton title={!id ? "Send Mail" : "Update password"} type="submit" disabled={sending} />
                    </div>
                </form>
            </Model>
        </div>
    );
}

export default ResetPassword;
