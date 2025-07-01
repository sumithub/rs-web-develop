import SecondaryButton from "../../../components/common/SecondaryButton"
import Search from "../../form/Search"
import Model from "../Model"
import TableOrder from '../../../components/TableOrder'
import PaginationDemo from '../../../components/Pagination'
import Checkbox from '../../../components/form/Checkbox'
import Status from '../../Status'
import axios from "axios"
import { toast } from "react-toastify"
import { formatDate, getError } from "../../../../helper"
import Loading from "../../Loading"
import { useEffect, useState } from "react"
import { customerList } from "../../../constent/constArray"
import CustomSelectBox from "../../form/CustomSelectBox"

function SelectedCustomers({ onClose, onSave }) {
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("")
    const [sortBy, setSortBy] = useState("")

    useEffect(() => {
        getCustomer()
    }, [search, filter, sortBy])

    const getCustomer = async () => {
        try {
            setLoading(true)
            setList([])
            const res = await axios.get("/api")
            setList(res.data || customerList)
            setLoading(false)

        } catch (error) {
            toast.error(getError(error))
            setLoading(false)
        }
    }

    return (
        <Model onClose={onClose} title="select from Customer List" modalClass="w-[80%]!" >
            <div className="flex items-center justify-between mb-3">
                <Search placeholder="Search by Filter by name, email, phone" mainClass="w-[45%]!"
                    onSearch={(s) => {
                        setSearch(s)
                    }} />
                <div className="flex items-center gap-4">
                    <CustomSelectBox
                        class_="mt-0! w-32!"
                        defaultOption="Filters"
                        value={filter}
                        onChange={(e) => {
                            setFilter(e.target.value)
                        }}>
                        <option value="filter 1">Filter 1</option>
                        <option value="filter 2">Filter 2</option>
                    </CustomSelectBox>
                    <SecondaryButton type="button" title="Add Selected" class_="text-sm! font-normal! py-[7px]!"
                        onClick={() => {
                            if (onSave) {
                                onSave(list.filter(e => e.selected))
                            }
                        }}
                    />
                </div>
            </div>

            <div className="table-class overflow-y-auto!">
                {loading ? <Loading /> : (list?.length > 0 ? <table className='w-full'>
                    <thead>
                        <tr>
                            <th><TableOrder title="Customer Name"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="customerName" /></th>
                            <th><TableOrder title="Email"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="email" /></th>
                            <th><TableOrder title="Phone"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="phone" /></th>
                            <th><TableOrder title="Tags"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="tags" /></th>
                            <th><TableOrder title="Source"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="source" /></th>
                            <th><div className="flex justify-center"><TableOrder title="Date Added"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="dateAdded" /></div></th>
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
                                        }} />
                                    <div>{e.name}</div>
                                </div>
                            </td>
                            <td>{e.email}</td>
                            <td>{e.phone}</td>
                            <td><Status status={e.status} /></td>
                            <td>{e.source}</td>
                            <td><div className="flex justify-center">{formatDate(e.date)}</div></td>
                        </tr>)}
                    </tbody>
                </table> : <div className='text-center text-2xl text-danger mx-auto py-20'>No Data</div>)}
            </div>
            {list?.length > 0 && <div>
                <PaginationDemo />
            </div>}
        </Model>
    )
}

export default SelectedCustomers