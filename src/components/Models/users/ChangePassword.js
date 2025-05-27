import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';

import Model from '../Model';
import SecondaryButton from '../../../components/common/SecondaryButton';
import InputForm from '../../form/InputForm';
import { getError } from '../../../../helper';

function ChangePassword({ onClose, id }) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [sending, setSending] = useState(false);

    const onSubmit = async (data) => {
        if (data.newPassword !== data.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setSending(true);
            await axios.put(`/api/users/${id}/change-password`, {
                password: data.newPassword,
            });

            toast.success("Password changed successfully");
            onClose();
        } catch (error) {
            toast.error(getError(error));
        } finally {
            setSending(false);
        }
    };

    return (
        <div>
            <Model onClose={onClose} title="Change Password" modalClass="w-1/2!">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <InputForm
                            label="New Password"
                            isRequired={true}
                            placeholder="Enter new password"
                            class_='mt-0!'
                            formProps={{
                                ...register("newPassword", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters"
                                    }
                                })
                            }}
                            error={errors.newPassword?.message}
                        />

                        <InputForm
                            label="Confirm Password"
                            isRequired={true}
                            placeholder="Enter confirm password"
                            formProps={{
                                ...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: (val) =>
                                        val === watch("newPassword") || "Passwords do not match",
                                })
                            }}
                            error={errors.confirmPassword?.message}
                        />
                    </div>

                    <div className='mt-5'>
                        <SecondaryButton title="Save Password" type='submit' disabled={sending} />
                    </div>
                </form>
            </Model>
        </div>
    );
}

export default ChangePassword;
