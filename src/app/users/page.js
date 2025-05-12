"use client"
import React, { useState } from 'react';
import Status from "../../components/Status"
import Dropdown from '../../components/DropDown';
import TableOrder from '../../components/TableOrder';
import PaginationDemo from '../../components/Pagination';
import AdminLayout from '../../components/AdminLayout';
import Checkbox from '../../components/form/Checkbox';
import Select from '../../components/form/Select';
import DatePicker from '../../components/form/DatePicker';
import Search from '../../components/form/Search';
import Image from 'next/image';
import AddUser from '../../components/Models/users/AddUser'
import DeleteUsers from '../../components/Models/users/RemoveUsers'
import ResendInvitations from '../../components/Models/users/ResendInvitations'
import ChangeUserRoles from '../../components/Models/users/ChangeUserRoles'
import { USER_ACTIONS } from '../../constent/constArray';
import ResendInvitation from '../../components/Models/users/ResendInvitation';
import SuspendUser from '../../components/Models/users/SuspendUser';
import SuspendUsers from '../../components/Models/users/SuspendUsers';
import ChangeUserRole from '../../components/Models/users/ChangeUserRole';
import DeleteModal from '../../components/Models/DeleteModal';
import SendInvite from '../../components/Models/users/SendInvite';

function Users() {
    const [role, setRole] = useState("")
    const [status, setStatus] = useState("")
    const [date, setDate] = useState("")
    // const [list, setList] = useState([])
    const [search, setSearch] = useState("")
    const [openModal, setOpenModal] = useState(null)

    return (
        <AdminLayout headerChild={<h1>filters</h1>}>
            {(openModal === "edit" || openModal === "new") &&
                <AddUser
                    onClose={() => {
                        setOpenModal(false)
                    }}
                />
            }

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
                    onClose={() => {
                        setOpenModal(false)
                    }} />
            }
            {openModal === "send-invite" &&
                <SendInvite
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


            <div className="flex justify-between items-center w-full">
                <div className='grid grid-cols-[3.3fr_1fr_1fr_1fr] gap-4'>
                    <Search
                        mainClass='w-full!'
                        placeholder="Search by name, email, role."
                        onSearch={(s) => {
                            setSearch(s)
                        }}
                    />
                    <Select
                        class_="mt-0!"
                        defaultOption="Status"
                        value={status}
                        onChange={(e) => {
                            setStatus(e.target.value)
                        }}>
                        <option value="active">Active</option>
                        <option value="suspended">Suspended</option>
                        <option value="pendingInvite">Pending Invite</option>
                    </Select>

                    <Select
                        class_="mt-0!"
                        defaultOption="role"
                        value={role}
                        onChange={(e) => {
                            setRole(e.target.value)
                        }}>
                        <option value="owner">Owner</option>
                        <option value="manager">manager</option>
                        <option value="viewer">Viewer</option>
                    </Select>

                    <DatePicker
                        icon={true}
                        mainClass="mt-0!"
                        value={date}
                        dateFormat="dd/MM/yyyy"
                        onChange={(e) => setDate(e)}
                    />
                </div>

                <div className="2xl:mt-0 mt-3">
                    <button className="bg-primary border border-primary hover:bg-white hover:text-primary rounded-lg py-[10.5px] px-3 text-white text-xs text-center capitalize cursor-pointer disabled:pointer-events-none disabled:opacity-50 w-full"
                        onClick={() => { setOpenModal("new") }}>Invite New User</button>
                </div>
            </div>
            <div className='my-5 flex items-center justify-between'>
                <div className="border border-border-color px-2 py-1 rounded-lg w-28 cursor-pointer">
                    <div className="flex items-start justify-center gap-2 mt-1">
                        <Checkbox />
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
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th><TableOrder title="Name" /></th>
                            <th><TableOrder title="Role" /></th>
                            <th><TableOrder title="Status" /></th>
                            <th><TableOrder title="Last Active" /></th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className="flex items-start gap-2">
                                    <Checkbox />
                                    <div>Jaydon George</div>
                                </div>
                            </td>
                            <td>Manager</td>
                            <td><Status status="Active" /></td>
                            <td>Aug 05,2025</td>
                            <td><Dropdown
                                options={USER_ACTIONS}
                                onClickOption={(e) => {
                                    setOpenModal(e)
                                }}
                            /></td>
                        </tr>

                        <tr>
                            <td>
                                <div className="flex items-start gap-2">
                                    <Checkbox />
                                    <div>Jaydon George</div>
                                </div>
                            </td>
                            <td>Manager</td>
                            <td><Status status="Pending Invite" /></td>
                            <td>Aug 05,2025</td>
                            <td><Dropdown
                                options={USER_ACTIONS}
                                onClickOption={(e) => {
                                    setOpenModal(e)
                                }}
                            /></td>
                        </tr>

                        <tr>
                            <td>
                                <div className="flex items-start gap-2">
                                    <Checkbox />
                                    <div>Jaydon George</div>
                                </div>
                            </td>
                            <td>Manager</td>
                            <td><Status status="Active" /></td>
                            <td>Aug 05,2025</td>
                            <td><Dropdown
                                options={USER_ACTIONS}
                                onClickOption={(e) => {
                                    setOpenModal(e)
                                }}
                            /></td>
                        </tr>

                        <tr>
                            <td>
                                <div className="flex items-start gap-2">
                                    <Checkbox />
                                    <div>Jaydon George</div>
                                </div>
                            </td>
                            <td>Manager</td>
                            <td><Status status="Suspended" /></td>
                            <td>Aug 05,2025</td>
                            <td><Dropdown
                                options={USER_ACTIONS}
                                onClickOption={(e) => {
                                    setOpenModal(e)
                                }}
                            /></td>
                        </tr>

                        <tr>
                            <td>
                                <div className="flex items-start gap-2">
                                    <Checkbox />
                                    <div>Jaydon George</div>
                                </div>
                            </td>
                            <td>Manager</td>
                            <td><Status status="Active" /></td>
                            <td>Aug 05,2025</td>
                            <td><Dropdown
                                options={USER_ACTIONS}
                                onClickOption={(e) => {
                                    setOpenModal(e)
                                }}
                            /></td>
                        </tr>

                        <tr>
                            <td>
                                <div className="flex items-start gap-2">
                                    <Checkbox />
                                    <div>Jaydon George</div>
                                </div>
                            </td>
                            <td>Manager</td>
                            <td><Status status="Pending Invite" /></td>
                            <td>Aug 05,2025</td>
                            <td><Dropdown
                                options={USER_ACTIONS}
                                onClickOption={(e) => {
                                    setOpenModal(e)
                                }}
                            /></td>
                        </tr>

                        <tr>
                            <td>
                                <div className="flex items-start gap-2">
                                    <Checkbox />
                                    <div>Jaydon George</div>
                                </div>
                            </td>
                            <td>Manager</td>
                            <td><Status status="Active" /></td>
                            <td>Aug 05,2025</td>
                            <td><Dropdown
                                options={USER_ACTIONS}
                                onClickOption={(e) => {
                                    setOpenModal(e)
                                }}
                            /></td>
                        </tr>

                        <tr>
                            <td>
                                <div className="flex items-start gap-2">
                                    <Checkbox />
                                    <div>Jaydon George</div>
                                </div>
                            </td>
                            <td>Manager</td>
                            <td><Status status="Active" /></td>
                            <td>Aug 05,2025</td>
                            <td><Dropdown
                                options={USER_ACTIONS}
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

export default Users