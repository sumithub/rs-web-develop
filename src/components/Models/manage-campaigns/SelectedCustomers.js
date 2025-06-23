import SecondaryButton from "../../../components/common/SecondaryButton"
import Search from "../../form/Search"
import Model from "../Model"
import TableOrder from '../../../components/TableOrder'
import PaginationDemo from '../../../components/Pagination'
import Checkbox from '../../../components/form/Checkbox'
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { getError } from "../../../../helper"
import { selectedCustomers } from "../../../constent/constArray"
import Loading from "../../Loading"
import ImportCustomer from "../customers/ImportCustomer"

function SelectedCustomers({ onClose, onSave, type, action, selected = 0 }) {
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [sortBy, setSortBy] = useState("")
    const [activeStep, setActiveStep] = useState(1);


    useEffect(() => {
        getCustomer()
    }, [search, sortBy])

    const getCustomer = async () => {
        try {
            setLoading(true)
            setList([])
            const res = await axios.get("/api")
            const customers = res.data || selectedCustomers

            // Add selected: true to the first 'count' number of customers
            const updatedCustomers = customers.map((customer, index) => ({
                ...customer,
                selected: index < selected
            }))

            setList(updatedCustomers)
            setLoading(false)

        } catch (error) {
            toast.error(getError(error))
            setLoading(false)
        }
    }

    return (
        <Model onClose={onClose} title={
            type !== "CSV"
                ? "Selected Customers"
                : activeStep === 6
                    ? "Customers Imported Successfully!"
                    : "Import Customer"
        } modalClass={`${type === "CSV" ? "w-[60%]!" : "w-1/2!"}`} >
            <div>
                {type !== "CSV" && <div className="flex items-center justify-between mb-3">
                    <Search placeholder="Search by Filter by name, email, phone" mainClass="w-1/2!"
                        onSearch={(s) => {
                            setSearch(s)
                        }}
                    />
                    <SecondaryButton title={type === "CSV" ? "Save" : (action === "details" ? "Remove Selected" : "Add Selected")} class_="text-sm! font-normal!"
                        onClick={() => {
                            if (onSave)
                                onSave(list.filter(e => e.selected).length || 5)
                        }} />
                </div>}
            </div>

            {type === "CSV" ? <div>
                <div>
                    <ImportCustomer icon={true} activeStep={activeStep}
                        setActiveStep={setActiveStep}
                        onClose={onClose} />
                    {/* <FileInput
                        accept=".csv"
                        isRequired={true}
                        label="Upload file"
                    /> */}
                </div>
            </div> : <div className="table-class">
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
                                    <div>{e.customerName}</div>
                                </div>
                            </td>
                            <td>{e.email}</td>
                            <td>{e.phone}</td>
                        </tr>)}
                    </tbody>
                </table> : <div className='text-center text-2xl text-danger mx-auto py-20'>No Data</div>)}

            </div>}
            {list?.length > 0 && <div>
                <PaginationDemo />
            </div>}
        </Model >
    )
}

export default SelectedCustomers