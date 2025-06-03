"use client"
import { useEffect, useState } from "react"
import ProgressBar from "../../../components/common/Progress"
import FileInput from "../../../components/form/FileInput"
import SelectForm from "../../form/SelectForm"
import Loading from "../../Loading"
import TableOrder from "../../TableOrder"
import axios from "axios"
import { getError } from "../../../../helper"
import { toast } from "react-toastify"
import { fieldMapping } from "../../../constent/constArray"
import CancelButton from "../../common/CancelButton"
import SecondaryButton from "../../common/SecondaryButton"
import InputForm from "../../form/InputForm"
import { useForm } from "react-hook-form"
import RadioForm from "../../form/RadioForm"
import Image from "next/image"

export default function ImportCustomer() {
    const [activeStep, setActiveStep] = useState()
    const [sortBy, setSortBy] = useState("")
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [tab, setTab] = useState(1);

    const { register, handleSubmit, clearErrors, formState: { errors }, } = useForm();

    const IMPORTSUMMARY = [
        { title: "File name", summary: "abc.csv" },
        { title: "total customers in file", summary: 250 },
        { title: "valid customers to import", summary: 245 },
        { title: "duplicates skipped", summary: "03" },
        { title: "assigned tag", summary: "VIP customers" },
    ]

    const IMPORTSUMMARY1 = [
        { title: "imported customers ", summary: 245 },
        { title: "customer list", summary: "new leads-march 2025" },
        { title: "assigned tag", summary: "VIP customers" },
    ]

    useEffect(() => {
        getData()
    }, [sortBy])

    const getData = async () => {
        try {
            setLoading(true)
            setList([])
            const res = await axios.get("/api")
            setList(res.data || fieldMapping)
            setLoading(false)

        } catch (error) {
            toast.error(getError(error))
            setLoading(false)
        }
    }

    const onSubmit = async (data) => {
        try {
            setSending(true)
            let res = null

            if (id !== "add") {
                res = await axios.put("/api", data)
            } else {
                res = await axios.post("/api", data)
            }

            toast.success("saved Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }

    return <main>

        <div>
            <ProgressBar
                currentStep={activeStep}
                stepTitle1="Upload File"
                stepTitle2="Field Mapping"
                stepTitle3="Add List Details"
                stepTitle4="Validation & Errors"
                stepTitle5="Import Confirmation"
            />

            {tab === 1 && <FileInput />}

            {tab === 2 && <div>
                <div className="text-text3 text-sm capitalize">Map your CSV columns to their corresponding fields. Header Row and First Row reflect what's in your CSV file. Use the Mapping dropdown to select which attribute the column is associated with.</div>

                <div className='table-class mt-8'>
                    {loading ? <Loading /> : (list?.length > 0 ? <table className='w-full'>
                        <thead>
                            <tr>
                                <th><TableOrder title="Header Row"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="header-row"
                                /></th>
                                <th><TableOrder title="First Row"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="first-row"
                                /></th>
                                <th><TableOrder title="Mapping"
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    field="mapping"
                                /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {list?.map((e, index) => <tr key={index}>
                                <td>{e.header}</td>
                                <td>{e.firstRow}</td>
                                <td><SelectForm>
                                    <option value="fullName">full Name</option>
                                    <option value="phoneNumber">Phone Number</option>
                                    <option value="email">Email</option>
                                </SelectForm></td>
                            </tr>
                            )}
                        </tbody>
                    </table> : <div className='text-center text-2xl text-danger mx-auto py-20'>No Data</div>)}

                </div>
            </div>}

            {tab === 3 && <div>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <InputForm label="list name" isRequired={true}
                        formProps={{ ...register("listName", { required: true }) }}
                        errors={errors} />

                    <SelectForm label="Tag"
                        selectClass_="py-3.5! px-2.5! focus:border-primary/60!"
                        formProps={{ ...register("tag", { required: true }) }} errors={errors} clearErrors={clearErrors}>
                        <option value="high value">High Value</option>
                        <option value="loyal">Loyal</option>
                        <option value="instead of source">instead of source</option>
                    </SelectForm>

                    <div>
                        <div className="flex gap-2 mt-4">
                            <div className="text-sm text-secondary font-medium">Duplicate Handling<span className="text-danger">*</span></div>
                            <button type="button">
                                <Image src="/images/info.svg" alt="info" height={16} width={16} unoptimized={true} />

                            </button>
                        </div>

                        <div className="flex items-center gap-4">
                            <RadioForm label="Ignore duplicates" />
                            <RadioForm label="Overwrite existing" />
                            <RadioForm label="Allow duplicates" />
                        </div>
                    </div>
                </form>
            </div>}

            {tab === 4 && <div>
                <div className="border border-border-color rounded-[20px] pt-3">
                    <div className="px-3">
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-2">
                                <Image src="/images/warning.svg" alt="warning" height={22} width={22} />
                                <div className="text-danger text-sm capitalize">There is 1 row(s) with errors in your CSV. Please address these errors and upload the file again.</div>
                            </div>
                            <SecondaryButton title="Download Error Report" type="button" class_="shrink-0! text-xs!" />
                        </div>
                        <div className="text-danger text-xs capitalize mt-2">No customers have been added</div>
                    </div>

                    <div className="bg-danger-light2 rounded-[20px] overflow-hidden mt-3">
                        <div className="grid grid-cols-3 p-4">
                            <TableOrder title=" Row"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="row"
                            />

                            <TableOrder title="First Row"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="first-row"
                            />

                            <TableOrder title="Mapping"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="mapping"
                            />
                        </div>
                        <hr className="border-t border-border-color my-3" />

                        <div className="grid grid-cols-3 px-4 pb-4 gap-y-8">
                            <TableOrder title="2"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="2"
                            />

                            <TableOrder title="First Row"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="first-row"
                            />

                            <TableOrder title="Mapping"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="mapping"
                            />

                            <TableOrder title="3"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="3"
                            />

                            <TableOrder title="First Row"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="first-row"
                            />

                            <TableOrder title="Mapping"
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                field="mapping"
                            />
                        </div>
                    </div>
                </div>
            </div>}

            {tab === 5 && <div>
                <div className="flex items-center justify-between">
                    <div className="text-success text-xl font-semibold">File validated successfully!</div>

                    <button type="button" className="text-white text-base font-medium bg-primary px-2 py-1.5 rounded-lg border border-primary cursor-pointer capitalize disabled:pointer-events-none disabled:opacity-50 flex items-center gap-2"><Image src="/images/info-circle.svg" alt="info" height={16} width={16} unoptimized={true} />Download Sample CSV</button>
                </div>

                <div>
                    <div className="text-secondary text-lg font-semibold capitalize mt-3">import summary</div>

                    <div>
                        {IMPORTSUMMARY.map((e, i) => <div key={i}>
                            <div className="flex items-center justify-between my-3">
                                <div className="text-text3 text-base capitalize font-normal!">{e.title}</div>
                                <div className="text-secondary text-base font-medium capitalize">{e.summary}</div>
                            </div>
                            <div className="flex items-center justify-between my-3">
                                <div className="text-text3 text-base capitalize font-normal!">invalid entries</div>
                                <div className="text-secondary text-base font-medium capitalize">02 | <span className="text-primary text-base font-medium underline underline-offset-4">view detail</span></div>
                            </div>
                            <hr className="border-t border-border-color" />
                        </div>)}
                    </div>
                </div>
            </div>}
        </div>

        {tab === 6 && <div>
            <div className="text-secondary text-lg font-semibold capitalize mt-3">import summary</div>
            {IMPORTSUMMARY1.map((e, i) => <div key={i}>
                <div className="flex items-center justify-between my-3">
                    <div className="text-text3 text-base capitalize font-normal!">{e.title}</div>
                    <div className="text-secondary text-base font-medium capitalize">{e.summary}</div>
                </div>

                <hr className="border-t border-border-color" />
            </div>)}
        </div>}

        <div className="grid grid-cols-2 gap-3 mt-5">
            <CancelButton title="Cancel" />
            <SecondaryButton title="Next" type="button" />
            {/* <SecondaryButton title="Import Customers" type="button" />
            <SecondaryButton title="Done" type="button" /> */}
        </div>
    </main>
}