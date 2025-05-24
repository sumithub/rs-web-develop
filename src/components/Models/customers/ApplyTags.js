import React from 'react'
import Model from '../Model'
import CancelButton from '../../common/CancelButton'
import SecondaryButton from '../../common/SecondaryButton'

function ApplyTags({ onClose, onSave }) {
    return (
        <Model onClose={onClose} title="Apply Tags To Multiple Customers" modalClass="w-1/2!">
            <div>Lorem Ipsum Is Simply Dummy Text Of The Printing</div>





            <div className="grid grid-cols-2 gap-3 mt-5">
                <CancelButton title="Cancel" onClick={onClose}/>
                <SecondaryButton title=" Apply Changes" />
            </div>
        </Model>
    )
}

export default ApplyTags