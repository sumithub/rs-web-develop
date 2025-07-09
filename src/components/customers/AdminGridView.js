"use client"
import Image from "next/image"
import { useState } from "react"
import RenameList from "../Models/customers/RenameList"
import DeleteList from "../Models/customers/DeleteList"
import Download from "../Models/customers/Download"

export default function AdminGridView() {
    const [openRename, setOpenRename] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [openDownload, setOpenDownload] = useState(false)

    const Project = [
        { title: "DELETE EXAMPLE - Elwyn", date: "Jun 18,2024", client: "ABC Garage", totalcustomer: "150" },
        { title: "DELETE EXAMPLE - Elwyn", date: "Jun 18,2024", client: "ABC Garage", totalcustomer: "150" },
        { title: "DELETE EXAMPLE - Elwyn", date: "Jun 18,2024", client: "ABC Garage", totalcustomer: "150" },
        { title: "DELETE EXAMPLE - Elwyn", date: "Jun 18,2024", client: "ABC Garage", totalcustomer: "150" },
        { title: "DELETE EXAMPLE - Elwyn", date: "Jun 18,2024", client: "ABC Garage", totalcustomer: "150" },
        { title: "DELETE EXAMPLE - Elwyn", date: "Jun 18,2024", client: "ABC Garage", totalcustomer: "150" },
        { title: "DELETE EXAMPLE - Elwyn", date: "Jun 18,2024", client: "ABC Garage", totalcustomer: "150" },
        { title: "DELETE EXAMPLE - Elwyn", date: "Jun 18,2024", client: "ABC Garage", totalcustomer: "150" },
        { title: "DELETE EXAMPLE - Elwyn", date: "Jun 18,2024", client: "ABC Garage", totalcustomer: "150" },
        { title: "DELETE EXAMPLE - Elwyn", date: "Jun 18,2024", client: "ABC Garage", totalcustomer: "150" },
        { title: "DELETE EXAMPLE - Elwyn", date: "Jun 18,2024", client: "ABC Garage", totalcustomer: "150" },
        { title: "DELETE EXAMPLE - Elwyn", date: "Jun 18,2024", client: "ABC Garage", totalcustomer: "150" },
    ]
    return (<>

        {openRename &&
            <RenameList
                id={true}
                onClose={() => {
                    setOpenRename(false)
                }}

                onSave={() => {
                    setOpenRename(true)
                }}
            />
        }

        {openDelete &&
            <DeleteList
                onClose={() => {
                    setOpenDelete(false)
                }}

                onSave={() => {
                    setOpenDelete(true)
                }}
            />
        }

        {openDownload &&
            <Download
                onClose={() => {
                    setOpenDownload(false)
                }}

                onSave={() => {
                    setOpenDownload(true)
                }}
            />
        }

        <div className="grid grid-cols-3 gap-x-5 gap-y-[15px]">
            {Project.map((e, i) =>
                <div key={i} className='border border-border2 rounded-[10px] p-[15px]'>
                    <div className='flex justify-between items-center'>
                        <div className='flex gap-2.5 items-center'>
                            <Image src="/images/example.png" alt="example" width={38} height={38} />
                            <h2 className="text-base font-semibold">{e.title}</h2>
                        </div>
                        <button className='text-xs font-medium bg-primary rounded-[10px] text-white px-[9.5px] py-[8.5px] flex items-center gap-[5px]' onClick={() => { setOpenDownload(true) }}><span><Image unoptimized={true} src="/images/document.svg" alt='document' width={18} height={18} /> </span> Download</button>
                    </div>
                    <div>
                        <div className='flex items-center justify-between pt-[15px]'>
                            <h2 className='text-sm font-medium text-text3 capitalize'>created on</h2>
                            <h2 className='text-sm font-medium'>{e.date}</h2>
                        </div>
                        <div className='flex items-center justify-between pt-[15px]'>
                            <h2 className='text-sm font-medium text-text3 capitalize'>client</h2>
                            <h2 className='text-sm font-medium'>{e.client}</h2>
                        </div>
                        <div className='flex items-center justify-between pt-[15px]'>
                            <h2 className='text-sm font-medium text-text3 capitalize'>Total customer</h2>
                            <h2 className='text-sm font-medium'>{e.totalcustomer}</h2>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-[15px] pt-5'>
                        <button className='bg-primary/10 rounded-lg text-primary text-sm py-[10.5px] font-medium flex justify-center gap-2 items-center' onClick={() => { setOpenRename(true) }}><span><Image unoptimized={true} src="/images/user4.svg" alt="user4" width={16} height={16} /></span> Rename</button>
                        <button className='bg-danger/10 rounded-lg text-danger text-sm py-[10.5px] font-medium flex justify-center gap-2 items-center' onClick={() => { setOpenDelete(true) }}><span><Image unoptimized={true} src="/images/delete.svg" alt="delete" width={16} height={16} /></span> Delete</button>
                    </div>
                </div>)}
        </div>
    </>)
}