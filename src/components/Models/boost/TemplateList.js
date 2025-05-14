import React from 'react'
import Model from '../Model'
import Search from '../../form/Search'
import SecondaryButton from '../../common/SecondaryButton'
import Select from '../../form/Select'
import TableOrder from '../../TableOrder'

function TemplateList({ onClose, onSave }) {
    return (
        <Model onClose={onClose} title="template list" modalClass="w-1/2!">
            <div>
                <div className="flex items-center justify-between mb-3">
                    <Search placeholder="Search by Filter by name, email, phone" mainClass="w-1/2!" />
                    <div className='flex items-center gap-4'>
                        <Select defaultOption="filters" class_="mt-0!"></Select>
                        <SecondaryButton title="Select Template" class_="text-sm! font-normal!" />
                    </div>

                    
                </div><div className='table-class'> 
                        <table className='w-full'>
                            <thead>
                                <tr>
                                    <th><TableOrder label='Template List'/></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
            </div>
        </Model>
    )
}

export default TemplateList