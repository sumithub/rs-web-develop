import React, { useEffect, useState } from 'react'
import Model from '../Model'
import Search from '../../form/Search'
import SecondaryButton from '../../common/SecondaryButton'
import TableOrder from '../../TableOrder'
import Radio from '../../form/Radio'
import axios from 'axios'
import { toast } from 'react-toastify'
import { getError } from '../../../../helper'
import { templateList } from '../../../constent/constArray'
import Loading from '../../Loading'
import CustomSelectBox from '../../form/CustomSelectBox'

function TemplateList({ onClose, onSave, type = "" }) {
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
            setList([])
            const res = await axios.get("/api")
            setList(res.data || templateList)
            setLoading(false)

        } catch (error) {
            toast.error(getError(error))
            setLoading(false)
        }
    }

    return (
        <Model onClose={onClose} title="template list" modalClass="w-1/2!">
            <div>
                <div className="flex items-center justify-between mb-3">
                    <Search placeholder="Search by Filter by name, email, phone" mainClass="w-1/2!"
                        onSearch={(s) => {
                            setSearch(s)
                        }}
                    />
                    <div className='flex items-center gap-4'>
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
                        <SecondaryButton title="Select Template" class_="text-sm! font-normal!"
                            onClick={() => {
                                if (onSave) {
                                    onSave(list[0])
                                }
                            }} />
                    </div>
                </div>

                <div className='table-class'>
                    {loading ? <Loading /> : (list?.length > 0 ? <table className='w-full'>
                        <thead>
                            <tr>
                                <th><TableOrder title='Template List'
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="templateList" /></th>
                                <th><TableOrder title='Description'
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="description" /></th>
                                <th><TableOrder title='Template Type '
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="templateType" /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {(list || []).filter(l => ((l.templateType || "").toLowerCase().includes((type || "").toLowerCase())))?.map((e, index) => <tr key={index} className={index === list.length - 1 ? '' : 'border-b border-border-color'}>
                                <td>
                                    <div className='flex items-center'>
                                        <Radio class_='mt-0!' />
                                        <div>{e.templateList}</div>
                                    </div>
                                </td>
                                <td><div className='line-clamp-1'>{e.description}</div></td>
                                <td>{e.templateType}</td>
                            </tr>)}
                        </tbody>

                    </table> : <div className='text-center text-2xl text-danger mx-auto py-20'>No Data</div>)}
                </div>
            </div>
        </Model>
    )
}

export default TemplateList