"use client"
import Model from "../Model";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";
import DateRange from "../../form/DateRangePicker";
import CustomSelectBox from "../../form/CustomSelectBox";
import Search from "../../form/Search";
import Checkbox from "../../form/Checkbox";
import { formatDate, getError } from "../../../../helper";
import Loading from "../../Loading";
import Status from "../../Status";
import TableOrder from "../../TableOrder";
import SecondaryButton from "../../common/SecondaryButton";
import PaginationDemo from "../../Pagination";
import { users } from "../../../constent/constArray";
import Image from "next/image";

export default function UsersList({ onClose, onSave }) {
    const [list, setList] = useState([])
    const [role, setRole] = useState("")
    const [status, setStatus] = useState("")
    const [search, setSearch] = useState("")
    const [dates, setDates] = useState(null)
    const [loading, setLoading] = useState(true)
    const [sortBy, setSortBy] = useState("")

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
    return <Model onClose={onClose} title="Users List" modalClass="w-[60%]!">

        <div className='flex gap-4 items-center w-full'>
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
                onChange={(dates) => { setDates(dates) }}
            />
        </div>

        <div className='my-3.5 flex items-center justify-between'>
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
            <SecondaryButton title="Add Selected"
                onClick={() => {
                    onClose()
                    if (onSave) {
                        onSave(list.filter(e => e.selected))
                    }
                }} class_="text-xs! font-normal! py-2.5! px-2.5" />
        </div>

        <div className='w-full border border-border-color overflow-hidden rounded-tr-[20px] rounded-tl-[20px]'>
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
                    </tr>
                </thead>
                <tbody>
                    {list?.map((e, index) => <tr key={index} className={`${index === list.length - 1 ? '' : 'border-b'}`}>
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
                    </tr>
                    )}
                </tbody>
            </table> : <div className='text-center text-2xl text-danger mx-auto h-20'>No Data</div>)}

        </div>
        {list?.length > 0 && <div>
            <PaginationDemo />
        </div>}
    </Model>
}