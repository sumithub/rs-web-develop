"use client"
import React, { useState } from 'react'
import Model from '../Model'
import CancelButton from '../../common/CancelButton'
import SecondaryButton from '../../common/SecondaryButton'
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '../../../../helper';
import CustomSelectBox from '../../form/CustomSelectBox'

function ApplyTags({ onClose }) {
    const [sending, setSending] = useState(false);
    const [type, setType] = useState([])

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
            <div className='text-xl font-semibold'>Lorem Ipsum Is Simply Dummy Text Of The Printing</div>
            <div className='my-[30px]'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-base font-medium'>John Deo</h2>
                    <div className='w-1/5'>
                        <CustomSelectBox
                            selectClass_='border-primary3/10!'
                            class_="mt-0! w-36!"
                            multiSelect={true}
                            value={type}
                            onChange={(e) => {
                                setType(e.target.value)
                            }}>
                            <option value="high-value">High Value</option>
                            <option value="imported-list">Imported List A</option>
                            <option value="vip">Vip</option>
                        </CustomSelectBox>
                    </div>
                </div>
                <hr className='border-t border-border2 my-[15px]' />
                <div className='flex justify-between items-center'>
                    <h2 className='text-base font-medium'>Jaydon Bergson</h2>
                    <div className='w-1/5'>
                        <CustomSelectBox
                            selectClass_='border-primary3/10!'
                            class_="mt-0! w-36!"
                            multiSelect={true}
                            value={type}
                            onChange={(e) => {
                                setType(e.target.value)
                            }}>
                            <option value="high-value">High Value</option>
                            <option value="imported-list">Imported List A</option>
                            <option value="vip">Vip</option>
                        </CustomSelectBox>
                    </div>
                </div>
                <hr className='border-t border-border2 my-[15px]' />
                <div className='flex justify-between items-center'>
                    <h2 className='text-base font-medium'>Wilson Dorwart</h2>
                    <div className='w-1/5'>
                        <CustomSelectBox
                            selectClass_='border-primary3/10!'
                            class_="mt-0! w-36!"
                            multiSelect={true}
                            value={type}
                            onChange={(e) => {
                                setType(e.target.value)
                            }}>
                            <option value="high-value">High Value</option>
                            <option value="imported-list">Imported List A</option>
                            <option value="vip">Vip</option>
                        </CustomSelectBox>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
                <CancelButton title="Cancel" onClick={onClose} />
                <SecondaryButton title=" Apply Changes" type="submit" disabled={sending} onClick={onSubmit} />
            </div>
        </Model>
    )
}

export default ApplyTags