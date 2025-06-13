"use client"
import React, { useEffect, useState } from 'react'
import Dropdown from '../../components/DropDown'
import TableOrder from '../../components/TableOrder'
import PaginationDemo from '../../components/Pagination'
import AdminLayout from '../../components/AdminLayout'
import Search from '../../components/form/Search'
import AddTemplate from '../../components/Models/templates/AddTemplate'
import { TEMPLATE_ACTIONS, templates } from '../../constent/constArray'
import Clone from '../../components/Models/templates/Clone'
import CustomSelectBox from '../../components/form/CustomSelectBox';
import { toast } from 'react-toastify'
import axios from 'axios'
import { formatDateTime, getError } from '../../../helper'
import Loading from '../../components/Loading'
import Preview from '../../components/Models/manage-campaigns/Preview'
import DeleteTemplate from "../../components/Models/templates/DeleteTemplate"
import DateRange from '../../components/form/DateRangePicker'
import SecondaryButton from '../../components/common/SecondaryButton'

function CampaignsTemplates() {
    const [search, setSearch] = useState("")
    const [type, setType] = useState("")
    const [date, setDate] = useState("")
    const [open, setOpen] = useState(false)
    const [openModal, setOpenModal] = useState(null)
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState("")

    useEffect(() => {
        getTemplate()
    }, [search, type, date, sortBy])

    const getTemplate = async () => {
        try {
            setLoading(true)
            const res = await axios.get("/api")
            setList(res.data || templates)
            setLoading(false)

        } catch (error) {
            toast.error(getError(error))
            setLoading(false)
        }
    }

    return (
        <AdminLayout >
            {(openModal === "edit" || openModal === "new") &&
                <AddTemplate
                    onClose={() => {
                        setOpenModal(false)
                    }}
                />
            }

            {openModal === "delete" &&
                <DeleteTemplate
                    onClose={() => {
                        setOpenModal(false)
                    }}
                />
            }

            {(openModal === "preview" || openModal === "new") &&
                <Preview
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

                <div className="flex items-center gap-3">
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

                    <div className='shrink-0!'>
                        <DateRange
                            onChange={(e) => { setDate(e) }}
                        />
                        {/* <DatePicker
                            icon={true}
                            mainClass="mt-0!"
                            value={date}
                            dateFormat="dd/MM/yyyy"
                            onChange={(e) => setDate(e)}
                        /> */}
                    </div>

                    {/* <SecondaryButton title="Create New Template" class_='text-xs!'
                        onClick={() => { setOpen(true) }}/>   */}

                    <SecondaryButton title="Create New Template" class_='text-xs!'
                       isLink={true} link='/create-email-template'/>
                </div>
            </div>

            <div className='table-class'>
                {loading ? <Loading /> : (list?.length > 0 ? <table className='w-full'>
                    <thead>
                        <tr>
                            <th><TableOrder title="Template Name"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="templateName" /></th>
                            <th><TableOrder title="Type"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="type" /></th>
                            <th><TableOrder title="Subject"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="subject" /></th>
                            <th><TableOrder title="Last Updated"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="lastUpdated" /></th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list?.map((e, index) => <tr key={index}>
                            <td>{e.name}</td>
                            <td>{e.type}</td>
                            <td><div className='line-clamp-1'>{e.subject}</div></td>
                            {/* <td>Jun 18,2025|10:00Am</td> */}
                            <td>{formatDateTime(e.lastUpdated)}</td>
                            <td><Dropdown 
    options={TEMPLATE_ACTIONS}
    editLink="/create-email-template"
    // editLink={`/edit-template/${template.id}`}
    onClickOption={(action) => {
        if (action !== 'edit') {
            setOpenModal(action);
        }
    }}
/></td>
                        </tr>)}
                    </tbody>
                </table> : <div className='text-center text-2xl text-danger mx-auto py-20'>No Data</div>)}
                {list?.length > 0 && <div>
                    <PaginationDemo />
                </div>}
            </div>
        </AdminLayout>
    )
}

export default CampaignsTemplates