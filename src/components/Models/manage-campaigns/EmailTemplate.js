import Search from "../../form/Search";
import Radio from "../../form/Radio";
import SecondaryButton from "../../common/SecondaryButton";
import TableOrder from "../../TableOrder"
import Model from "../Model";
import { emailTemplates } from "../../../constent/constArray";
import axios from "axios";
import { getError } from "../../../../helper";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import CustomSelectBox from "../../form/CustomSelectBox";
import Loading from "../../Loading";

export default function EmailTemplate({ onClose, onSave }) {

    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("")
    const [sortBy, setSortBy] = useState("")

    useEffect(() => {
        getTemplate()
    }, [search, filter, sortBy])

    const getTemplate = async () => {
        try {
            setLoading(true)
            const res = await axios.get("/api")
            setList(res.data || emailTemplates)
            setLoading(false)

        } catch (error) {
            toast.error(getError(error))
            setLoading(false)
        }
    }

    return <Model title="E-mail Templates" onClose={onClose} modalClass="w-1/2!">
        <main>
            <div className="flex items-center justify-between mb-5">
                <Search placeholder="Search by Filter by name, email, phone" mainClass="w-1/2!"
                    onSearch={(s) => {
                        setSearch(s)
                    }} />
                <div className="flex items-center gap-2">
                    <CustomSelectBox
                        class_="mt-0!"
                        defaultOption="Filters"
                        value={filter}
                        onChange={(e) => {
                            setFilter(e.target.value)
                        }}>
                        <option value="filter 1">Filter 1</option>
                        <option value="filter 2">Filter 2</option>
                    </CustomSelectBox>
                    <SecondaryButton title="Add Selected" class_="text-sm! font-normal! py-[7px]!"
                        onClick={onSave} />
                </div>
            </div>

            <div className="table-class">
                {loading ? <Loading /> : (list?.length > 0 ? <table className='w-full'>
                    <thead>
                        <tr>
                            <th><TableOrder title="Template Name "
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="templateName" /></th>
                            <th><TableOrder title="Description"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="description" /></th>
                            <th><TableOrder title="Template Type "
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="templateType" /></th>
                        </tr>
                    </thead>

                    <tbody>
                        {list?.map((e, index) => <tr key={index}>
                            <td><div className="flex items-center"><Radio mainClass="gap-0!" inputClass="mb-2!" class_="mt-2!" />{e.name}</div></td>
                            <td><div className="line-clamp-1">{e.description}</div></td>
                            <td>{e.type}</td>
                        </tr>)}
                    </tbody>
                </table> : <div className='text-center text-2xl text-danger mx-auto py-20'>No Data</div>)}
            </div>
        </main>
    </Model>
}