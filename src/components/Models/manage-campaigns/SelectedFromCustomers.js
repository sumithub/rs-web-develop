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


function SelectedCustomers({ onClose }) {
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("")


    useEffect(() => {
        getCustomer()
    }, [search, filter])

    const getCustomer = async () => {
        try {
            setLoading(true)
            const res = await axios.get("/api")
            setList(res.data || customerList)
            setLoading(false)

        } catch (error) {
            toast.error(getError(error))
            setLoading(false)
        }
    }

    return (
        <Model onClose={onClose} title="Customer List" modalClass="w-[60%]!" >
            <div className="flex items-center justify-between mb-3">
                <Search placeholder="Search by Filter by name, email, phone" mainClass="w-1/2!"
                    onSearch={(s) => {
                        setSearch(s)
                    }} />
                <div className="flex items-center gap-4">
                    <CustomSelectBox
                        class_="mt-0!"
                        defaultOption="Filters"
                        value={filter}
                        onChange={(e) => {
                            setFilter(e.target.value)
                        }}>
                        <option value="Filter 1">Filter 1</option>
                        <option value="Filter 2">Filter 2</option>
                    </CustomSelectBox>
                    <SecondaryButton title="Select Customers From List" class_="text-sm! font-normal! py-[7px]!" />
                </div>
            </div>

            <div className="table-class overflow-y-auto!">
                {loading ? <Loading /> : (list?.length > 0 ? <table className='w-full'>
                    <thead>
                        <tr>
                            <th><TableOrder title="Customer Name" /></th>
                            <th><TableOrder title="Email" /></th>
                            <th><TableOrder title="Phone" /></th>
                            <th><TableOrder title="Tags" /></th>
                            <th><TableOrder title="Source" /></th>
                            <th><TableOrder title="Date Added" /></th>
                        </tr>
                    </thead>

                    <tbody>
                        {list?.map((e, index) => <tr key={index}>
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
                            <td>{e.status}</td>
                            <td>{formatDate(e.date)}</td>
                        </tr>)}
                    </tbody>
                </table> : <div className='text-center text-2xl text-danger mx-auto py-20'>No Data</div>)}
                {list?.length > 0 && <div>
                    <PaginationDemo />
                </div>}
            </div>
        </Model>
    )
}

export default SelectedCustomers