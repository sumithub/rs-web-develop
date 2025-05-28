import React from 'react'
import Model from '../Model'
import Search from '../../form/Search'
import SecondaryButton from '../../common/SecondaryButton'
import Select from '../../form/Select'
import TableOrder from '../../TableOrder'
import Radio from '../../form/Radio'

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
                </div>

                <div className='table-class'>
                    <table className='w-full'>
                        <thead>
                            <tr>
                                <th><TableOrder title='Template List' /></th>
                                <th><TableOrder title='Description' /></th>
                                <th><TableOrder title='Template Type ' /></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className='flex'>
                                        <Radio />
                                        <div>Nature Template</div>
                                    </div>
                                </td>
                                <td>Lorem ipsum..</td>
                                <td>Email Template</td>
                            </tr>

                            <tr>
                                <td>
                                    <div className='flex'>
                                        <Radio />
                                        <div>Hiking Template</div>
                                    </div>
                                </td>
                                <td>Lorem ipsum..</td>
                                <td>SMS Template</td>
                            </tr>

                            <tr>
                                <td>
                                    <div className='flex'>
                                        <Radio />
                                        <div>Tour and Travel</div>
                                    </div>
                                </td>
                                <td>Lorem ipsum..</td>
                                <td>Email Template</td>
                            </tr>

                            <tr>
                                <td>
                                    <div className='flex'>
                                        <Radio />
                                        <div>Post Template Social</div>
                                    </div>
                                </td>
                                <td>Lorem ipsum..</td>
                                <td>Email Template</td>
                            </tr>

                            <tr>
                                <td>
                                    <div className='flex'>
                                        <Radio />
                                        <div>Travel Landing</div>
                                    </div>
                                </td>
                                <td>Lorem ipsum..</td>
                                <td>SMS Template</td>
                            </tr>

                            <tr>
                                <td>
                                    <div className='flex'>
                                        <Radio />
                                        <div>Dynamic Shapes</div>
                                    </div>
                                </td>
                                <td>Lorem ipsum..</td>
                                <td>Email Template</td>
                            </tr>

                            <tr>
                                <td>
                                    <div className='flex'>
                                        <Radio />
                                        <div>Vector Horizontal Brochure</div>
                                    </div>
                                </td>
                                <td>Lorem ipsum..</td>
                                <td>SMS Template</td>
                            </tr>

                            <tr>
                                <td>
                                    <div className='flex'>
                                        <Radio />
                                        <div>Healthy food horizontal </div>
                                    </div>
                                </td>
                                <td>Lorem ipsum..</td>
                                <td>Email Template</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Model>
    )
}

export default TemplateList