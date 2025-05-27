"use client"
import React, { useState } from 'react'
import Dropdown from '../../components/DropDown'
import TableOrder from '../../components/TableOrder'
import PaginationDemo from '../../components/Pagination'
import AdminLayout from '../../components/AdminLayout'
import Search from '../../components/form/Search'
import DatePicker from '../../components/form/DatePicker'
import AddTemplate from '../../components/Models/templates/AddTemplate'
import { TEMPLATE_ACTIONS } from '../../constent/constArray'
import Clone from '../../components/Models/templates/Clone'
import CustomSelectBox from '../../components/form/CustomSelectBox';
import Edit from '../../components/Models/templates/Edit'

function CampaignsTemplates() {
    const [search, setSearch] = useState("")
    const [type, setType] = useState("")
    const [date, setDate] = useState("")
    const [open, setOpen] = useState(false)
    const [openModal, setOpenModal] = useState(null)

    return (
        <AdminLayout >
            {(openModal === "edit" || openModal === "new") &&
                <Edit
                    onClose={() => {
                        setOpenModal(false)
                    }}
                />
            }

            {open &&
                <AddTemplate
                    onClose={() => {
                        setOpen(false)
                    }}

                    onSave={() => {
                        setOpen(true)
                    }}
                />
            }

            {openModal === "clone" &&
                <Clone
                    onClose={() => {
                        setOpenModal(false)
                    }}
                />
            }



            <div className="flex justify-between items-center w-full mb-4">
                <Search
                    placeholder="Search by Template Name"
                    onSearch={(s) => {
                        setSearch(s)
                    }}
                />

                <div className="grid grid-cols-3 items-start 2xl:gap-3 xl:gap-2 lg:gap-2 2xl:mt-0 mt-3">
                    <CustomSelectBox
                        class_="mt-0!"
                        defaultOption="type"
                        value={type}
                        onChange={(e) => {
                            setType(e.target.value)
                        }}>
                        <option value="email">Email</option>
                        <option value="sms">SMS</option>
                        <option value="both">Both</option>
                    </CustomSelectBox>
                    <DatePicker
                        icon={true}
                        mainClass="mt-0!"
                        value={date}
                        dateFormat="dd/MM/yyyy"
                        onChange={(e) => setDate(e)}
                    />

                    <button className="bg-primary border border-primary hover:bg-white hover:text-primary rounded-lg py-[10.5px] px-3 text-white text-xs text-center capitalize cursor-pointer disabled:pointer-events-none disabled:opacity-50"
                        onClick={() => { setOpen(true) }}>Create New Template</button>
                </div>
            </div>

            <div className='table-class'>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th><TableOrder title="Template Name" /></th>
                            <th><TableOrder title="Type" /></th>
                            <th><TableOrder title="Subject" /></th>
                            <th><TableOrder title="Last Updated" /></th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Hiking Template</td>
                            <td>Email</td>
                            <td>Lorem ipsum....</td>
                            <td>Jun 18,2025|10:00Am</td>
                            <td><Dropdown
                                options={TEMPLATE_ACTIONS}
                                onClickOption={(e) => {
                                    setOpenModal(e)
                                }} /></td>
                        </tr>

                        <tr>
                            <td>Hiking Template</td>
                            <td>Email</td>
                            <td>Lorem ipsum....</td>
                            <td>Jun 18,2025|10:00Am</td>
                            <td><Dropdown
                                options={TEMPLATE_ACTIONS}
                                onClickOption={(e) => {
                                    setOpenModal(e)
                                }}
                            /></td>
                        </tr>

                        <tr>
                            <td>Hiking Template</td>
                            <td>Email</td>
                            <td>Lorem ipsum....</td>
                            <td>Jun 18,2025|10:00Am</td>
                            <td><Dropdown
                                options={TEMPLATE_ACTIONS}
                                onClickOption={(e) => {
                                    setOpenModal(e)
                                }}
                            /></td>
                        </tr>

                        <tr>
                            <td>Hiking Template</td>
                            <td>Email</td>
                            <td>Lorem ipsum....</td>
                            <td>Jun 18,2025|10:00Am</td>
                            <td><Dropdown
                                options={TEMPLATE_ACTIONS}
                                onClickOption={(e) => {
                                    setOpenModal(e)
                                }}
                            /></td>
                        </tr>

                        <tr>
                            <td>Hiking Template</td>
                            <td>Email</td>
                            <td>Lorem ipsum....</td>
                            <td>Jun 18,2025|10:00Am</td>
                            <td><Dropdown
                                options={TEMPLATE_ACTIONS}
                                onClickOption={(e) => {
                                    setOpenModal(e)
                                }}
                            /></td>
                        </tr>

                        <tr>
                            <td>Hiking Template</td>
                            <td>Email</td>
                            <td>Lorem ipsum....</td>
                            <td>Jun 18,2025|10:00Am</td>
                            <td><Dropdown
                                options={TEMPLATE_ACTIONS}
                                onClickOption={(e) => {
                                    setOpenModal(e)
                                }}
                            /></td>
                        </tr>

                        <tr>
                            <td>Hiking Template</td>
                            <td>Email</td>
                            <td>Lorem ipsum....</td>
                            <td>Jun 18,2025|10:00Am</td>
                            <td><Dropdown
                                options={TEMPLATE_ACTIONS}
                                onClickOption={(e) => {
                                    setOpenModal(e)
                                }}
                            /></td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <PaginationDemo />
                </div>
            </div>
        </AdminLayout>
    )
}

export default CampaignsTemplates