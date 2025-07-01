"use client"
import React, { useEffect, useState } from 'react';
import Status from "../../components/Status"
import Dropdown from '../../components/DropDown';
import TableOrder from '../../components/TableOrder';
import PaginationDemo from '../../components/Pagination';
import AdminLayout from '../../components/AdminLayout';
import Checkbox from '../../components/form/Checkbox';
import Search from '../../components/form/Search';
import Image from 'next/image';
import AddUser from '../../components/Models/users/AddUser'
import DeleteUsers from '../../components/Models/users/RemoveUsers'
import ResendInvitations from '../../components/Models/users/ResendInvitations'
import ChangeUserRoles from '../../components/Models/users/ChangeUserRoles'
import { USER_ACTIONS, users } from '../../constent/constArray';
import ResendInvitation from '../../components/Models/users/ResendInvitation';
import SuspendUser from '../../components/Models/users/SuspendUser';
import SuspendUsers from '../../components/Models/users/SuspendUsers';
import ChangeUserRole from '../../components/Models/users/ChangeUserRole';
import DeleteModal from '../../components/Models/DeleteModal';
import ChangePassword from '../../components/Models/users/ChangePassword';
import DateRange from '../../components/form/DateRangePicker';
import CustomSelectBox from '../../components/form/CustomSelectBox';
import axios from 'axios';
import { formatDate, getError } from '../../../helper';
import { toast } from 'react-toastify';
import Loading from "../../components/Loading"
import SecondaryButton from '../../components/common/SecondaryButton';

export default function Users() {
    const [list, setList] = useState([])
    const [role, setRole] = useState("")
    const [status, setStatus] = useState("")
    const [search, setSearch] = useState("")
    const [dates, setDates] = useState(null)
    const [openModal, setOpenModal] = useState(null)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [sortBy, setSortBy] = useState("")
    const [selId, setSelId] = useState("")


    useEffect(() => {
        getUser()
    }, [search, status, role, dates, sortBy])

    const getUser = async () => {
        try {
            setLoading(true)
            setList([])
            const res = await axios.get("/api")
            setList(res.data || users)
            setLoading(false)

        } catch (error) {
            toast.error(getError(error))
            setLoading(false)
        }
    }

    return (
        <AdminLayout>

            {(openModal === "new" || openModal === "edit") &&
                <AddUser
                    id={selId}
                    onClose={() => {
                        setOpenModal(false);
                        setSelId("");
                    }}
                    onSave={() => {
                        getUser();
                        setOpenModal(false);
                        setSelId("");
                    }}
                />
            }
            {/* {(openModal === "new" || openModal === "edit") &&
                <AddUser
                    isInvite={true}
                    id={selId}

                    onClose={() => {
                        setOpenModal(false)
                    }}

                    onSave={() => {
                        getUser()
                        setOpenModal(true)
                    }}
                />
            } */}
            {/* 
            {(openModal === "edit") &&
                <AddUser
                    onClose={() => {
                        setOpenModal(false)
                    }}
                />
            } */}

            {openModal === "delete" &&
                <DeleteUsers
                    onClose={() => {
                        setOpenModal(false)
                    }} />
            }

            {openModal === "invites" &&
                <ResendInvitations
                    onClose={() => {
                        setOpenModal(false)
                    }} />
            }
            {openModal === "resend-invite" &&
                <ResendInvitation
                    user={user}
                    onClose={() => {
                        setOpenModal(false)
                    }} />
            }

            {openModal === "suspend/reactivate" &&
                <SuspendUser
                    onClose={() => {
                        setOpenModal(false)
                    }}
                />
            }
            {openModal === "suspended-users" &&
                <SuspendUsers
                    onClose={() => {
                        setOpenModal(false)
                    }}
                />
            }

            {openModal === "roles" &&
                <ChangeUserRoles
                    onClose={() => {
                        setOpenModal(false)
                    }} />
            }
            {openModal === "role" &&
                <ChangeUserRole
                    onClose={() => {
                        setOpenModal(false)
                    }} />
            }

            {openModal === "remove-user" &&
                <DeleteModal
                    onClose={() => {
                        setOpenModal(false)
                    }} />
            }

            {openModal === "change-password" &&
                <ChangePassword
                    onClose={() => {
                        setOpenModal(false)
                    }} />
            }

            <div className='flex items-center justify-between w-full'>
                <div className='flex gap-3 items-center w-full'>
                    <Search
                        mainClass='w-[35%]!'
                        placeholder="Search by name, email, role."
                        onSearch={(s) => {
                            setSearch(s)
                        }}
                    />
                    <CustomSelectBox
                        class_="mt-0! w-36!"
                        defaultOption="Status"
                        value={status}
                        onChange={(e) => {
                            setStatus(e.target.value)
                        }}>
                        <option value="active">Active</option>
                        <option value="suspended">Suspended</option>
                        <option value="pendingInvite">Pending Invite</option>
                    </CustomSelectBox>

                    <CustomSelectBox
                        class_="mt-0! w-36!"
                        defaultOption="role"
                        value={role}
                        onChange={(e) => {
                            setRole(e.target.value)
                        }}>
                        <option value="owner">Owner</option>
                        <option value="manager">manager</option>
                        <option value="viewer">Viewer</option>
                    </CustomSelectBox>

                    <DateRange
                        value={dates}
                        onChange={(e) => { setDates(e) }}
                    />
                </div>
                <SecondaryButton title="Invite New User" onClick={() => { setOpenModal("new") }} class_='text-xs! w-32!' />

            </div>

            <div className='my-5 flex items-center justify-between'>
                <div className="border border-border-color px-2 py-1 rounded-lg w-28 cursor-pointer">
                    <div className="flex items-start justify-center gap-2 mt-1">
                        <Checkbox
                            checked={list?.length > 0 && list.every(e => e.selected)}
                            onChange={(checked) => {
                                setList(list => list.map(e => ({ ...e, selected: checked })))
                            }}

                        />
                        <div className="text-text3 text-sm capitalize mt-[2px]">Select all</div>
                    </div>
                </div>
                <div className='grid grid-cols-4 gap-4'>
                    <button className='border border-border-color rounded-lg p-2 text-text3 text-sm text-center flex items-center justify-center gap-2 capitalize cursor-pointer'
                        onClick={() => { setOpenModal("invites") }}
                    ><Image src="images/add.svg" alt='add' height={16} width={16} unoptimized={true} />Resend Invite</button>

                    <button className='border border-border-color rounded-lg p-2 text-text3 text-sm text-center flex items-center justify-center gap-2 capitalize cursor-pointer'
                        onClick={() => { setOpenModal("suspended-users") }}><Image src="images/pause.svg" alt='pause' height={16} width={16} unoptimized={true} />Suspend Users</button>

                    <button className='border border-border-color rounded-lg p-2 text-text3 text-sm text-center flex items-center justify-center gap-2 capitalize cursor-pointer'
                        onClick={() => { setOpenModal("roles") }}><Image src="images/refresh.svg" alt='refresh' height={16} width={16} unoptimized={true} />Change Role</button>

                    <button className='border border-danger-light2 bg-danger-light2 rounded-lg p-2 text-danger text-sm text-center flex items-center justify-center gap-2 capitalize cursor-pointer'
                        onClick={() => { setOpenModal("delete") }}><Image src="images/trash.svg" alt='refresh' height={16} width={16} unoptimized={true} />Remove Users</button>
                </div>
            </div>

            <div className='table-class'>
                {loading ? <Loading /> : (list?.length > 0 ? <table className='w-full'>
                    <thead>
                        <tr>
                            <th><TableOrder title="Name"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="name"
                            /></th>
                            <th><TableOrder title="Role"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="role"
                            /></th>
                            <th><TableOrder title="Status"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="status"
                            /></th>
                            <th><TableOrder title="Last Active"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="lastActive"
                            /></th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list?.map((e, index) => <tr key={index} className={index === list.length - 1 ? '' : 'border-b border-border-color'}>
                            <td>
                                <div className="flex items-start gap-2">
                                    <Checkbox
                                        checked={e.selected}
                                        onChange={(checked) => {
                                            setList(list => list.map((item, i) => i === index ? { ...item, selected: checked } : item))
                                        }}
                                    />
                                    <div>{e.name}</div>
                                </div>
                            </td>
                            <td><div className='flex items-center gap-1.5'>{e.role}<button className='cursor-pointer disabled:pointer-events-none'><Image src="/images/info.svg" alt="info" height={18} width={18} unoptimized={true} /></button></div></td>
                            <td><Status status={e.status} /></td>
                            <td>{formatDate(e.lastActive)}</td>
                            <td><Dropdown
                                options={USER_ACTIONS}
                                onClickOption={(el) => {
                                    setSelId("e.id")
                                    setUser(e)
                                    setOpenModal(el)
                                }}
                            /></td>
                        </tr>
                        )}
                    </tbody>
                </table> : <div className='text-center text-2xl text-danger mx-auto h-20'>No Data</div>)}
            </div>
            {list?.length > 0 && <div>
                <PaginationDemo />
            </div>}
        </AdminLayout>
    )
}
