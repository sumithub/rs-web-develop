"use client"
import Image from "next/image"

export default function GridView() {
    const Project = [
        { title: "DELETE EXAMPLE - Elwyn", date: "Jun 18,2024", source: "CSV Import", totalcustomer: "150" },
        { title: "DELETE EXAMPLE - Elwyn", date: "Jun 18,2024", source: "CSV Import", totalcustomer: "150" },
        { title: "DELETE EXAMPLE - Elwyn", date: "Jun 18,2024", source: "CSV Import", totalcustomer: "150" },
        { title: "DELETE EXAMPLE - Elwyn", date: "Jun 18,2024", source: "CSV Import", totalcustomer: "150" },
        { title: "DELETE EXAMPLE - Elwyn", date: "Jun 18,2024", source: "CSV Import", totalcustomer: "150" },
        { title: "DELETE EXAMPLE - Elwyn", date: "Jun 18,2024", source: "CSV Import", totalcustomer: "150" },
        { title: "DELETE EXAMPLE - Elwyn", date: "Jun 18,2024", source: "CSV Import", totalcustomer: "150" },
        { title: "DELETE EXAMPLE - Elwyn", date: "Jun 18,2024", source: "CSV Import", totalcustomer: "150" },
        { title: "DELETE EXAMPLE - Elwyn", date: "Jun 18,2024", source: "CSV Import", totalcustomer: "150" },
        { title: "DELETE EXAMPLE - Elwyn", date: "Jun 18,2024", source: "CSV Import", totalcustomer: "150" },
        { title: "DELETE EXAMPLE - Elwyn", date: "Jun 18,2024", source: "CSV Import", totalcustomer: "150" },
        { title: "DELETE EXAMPLE - Elwyn", date: "Jun 18,2024", source: "CSV Import", totalcustomer: "150" },
    ]
    return (<>
        <div className="grid grid-cols-3 gap-x-5 gap-y-[15px]">
            {Project.map((e, i) =>
                <div key={i} className='border border-border2 rounded-[10px] p-[15px]'>
                    <div className='flex justify-between items-center'>
                        <div className='flex gap-2.5 items-center'>
                            <Image src="/images/example.png" alt="example" width={38} height={38} />
                            <h2 className="text-base font-semibold">{e.title}</h2>
                        </div>
                        <button className='text-xs font-medium bg-primary rounded-[10px] text-white px-[9.5px] py-[8.5px] flex items-center gap-[5px]' onClick={() => { setOpenDownload(true) }}><span><Image src="/images/document.svg" alt='document' width={18} height={18} /> </span> Download</button>
                    </div>
                    <div>
                        <div className='flex items-center justify-between pt-[15px]'>
                            <h2 className='text-sm font-medium text-text3'>Date</h2>
                            <h2 className='text-sm font-medium'>{e.date}</h2>
                        </div>
                        <div className='flex items-center justify-between pt-[15px]'>
                            <h2 className='text-sm font-medium text-text3'>Source</h2>
                            <h2 className='text-sm font-medium'>{e.source}</h2>
                        </div>
                        <div className='flex items-center justify-between pt-[15px]'>
                            <h2 className='text-sm font-medium text-text3'>Total customer</h2>
                            <h2 className='text-sm font-medium'>{e.totalcustomer}</h2>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-[15px] pt-5'>
                        <button className='bg-primary/10 rounded-lg text-primary text-sm py-[10.5px] font-medium flex justify-center gap-2 items-center' onClick={() => { setOpenRename(true) }}><span><Image src="/images/user4.svg" alt="user4" width={16} height={16} /></span> Rename</button>
                        <button className='bg-danger/10 rounded-lg text-danger text-sm py-[10.5px] font-medium flex justify-center gap-2 items-center' onClick={() => { setOpenDelete(true) }}><span><Image src="/images/delete.svg" alt="delete" width={16} height={16} /></span> Delete</button>
                    </div>
                </div>)}
        </div>
    </>)
}