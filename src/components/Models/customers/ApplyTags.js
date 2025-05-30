import React, { useState } from 'react'
import Model from '../Model'
import CancelButton from '../../common/CancelButton'
import SecondaryButton from '../../common/SecondaryButton'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '../../../../helper';

function ApplyTags({ onClose }) {
    const { handleSubmit } = useForm();
    const [sending, setSending] = useState(false);

    const onSubmit = async () => {
        try {
            setSending(true);
            await axios.put("/api");
            toast.success("Send Invite Successfully");
            onClose();
        } catch (error) {
            toast.error(getError(error));
        } finally {
            setSending(false);
        }
    };

    return (
        <Model onClose={onClose} title="Apply Tags To Multiple Customers" modalClass="w-1/2!">
            <form onSubmit={handleSubmit(onSubmit)} className="text-center">
                <div>Lorem Ipsum Is Simply Dummy Text Of The Printing</div>
                <div className="grid grid-cols-2 gap-3 mt-5">
                    <CancelButton title="Cancel" onClick={onClose} />
                    <SecondaryButton title=" Apply Changes" type="submit" disabled={sending} />
                </div>
            </form>
        </Model>
    )
}

export default ApplyTags