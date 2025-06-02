import React, { useState } from 'react'
import Model from '../Model'
import CancelButton from '../../common/CancelButton'
import SecondaryButton from '../../common/SecondaryButton'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '../../../../helper';
import Select from '../../form/Select';
import SelectForm from '../../form/SelectForm';

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
            <form onSubmit={handleSubmit(onSubmit)} className="">
                <div className='text-xl font-semibold'>Lorem Ipsum Is Simply Dummy Text Of The Printing</div>
                <div className='my-[30px]'>
                    <div className='flex justify-between items-center'>
                        <h2 className='text-base font-medium'>{e.name}</h2>
                        <div className='w-1/5'>
                            <SelectForm
                                selectClass_="border border-primary/10!"
                                class_='mt-0!'
                                defaultOption="VIP, High Value"
                            >
                                <option>VIP, High Value</option>
                            </SelectForm>
                        </div>
                    </div>
                    <hr className='border-t border-border2 my-[15px]' />
                    <div className='flex justify-between items-center'>
                        <h2 className='text-base font-medium'>Jaydon Bergson</h2>
                        <div className='w-1/5'>
                            <SelectForm
                                selectClass_="border border-primary/10!"
                                class_='mt-0!'
                                defaultOption="VIP, High Value"
                            >
                                <option>VIP, High Value</option>
                            </SelectForm>
                        </div>
                    </div>
                    <hr className='border-t border-border2 my-[15px]' />
                    <div className='flex justify-between items-center'>
                        <h2 className='text-base font-medium'>Wilson Dorwart</h2>
                        <div className='w-1/5'>
                            <SelectForm
                                selectClass_="border border-primary/10!"
                                class_='mt-0!'
                                defaultOption="Imported List A"
                            >
                                <option>Imported List A</option>
                            </SelectForm>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <CancelButton title="Cancel" onClick={onClose} class_='text-lg! py-3!' />
                    <SecondaryButton title=" Apply Changes" type="submit" disabled={sending} class_='text-lg! py-3!' />
                </div>
            </form>
        </Model>
    )
}

export default ApplyTags