import React from 'react'
import Model from '../Model'
import Input from '../../form/Input'
import SecondaryButton from '../../../components/common/SecondaryButton'

function ChangePassword({ onClose }) {
    return (
        <div>
            <Model onClose={onClose} title="Setup Password" modalClass="w-1/2!">
                <div>
                    <Input label="New Password" isRequired={true} placeholder="Enter new password" class_='mt-0!' />
                    <Input label="Confirm Password" isRequired={true} placeholder="Enter confirm password" />
                </div>

                <div className='mt-5'>
                    <SecondaryButton title="Save Password" />
                </div>
            </Model>
        </div>
    )
}

export default ChangePassword