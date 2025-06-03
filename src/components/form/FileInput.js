"use client"
import Image from "next/image"
import SecondaryButton from "../common/SecondaryButton"

export default function FileInput({ onChange, accept }) {
    return <>
        <div className="flex items-center justify-between mb-5">
            <div className="laptop:text-xs tablet:text-[10px] text-base mt-0.5 mb-[2px] capitalize  line-clamp-1 overflow-hidden">Upload</div>
            <button type="button" className="text-white text-base font-medium bg-primary px-2 py-1.5 rounded-lg border border-primary cursor-pointer capitalize  disabled:pointer-events-none disabled:opacity-50 flex items-center gap-2"><Image src="/images/info-circle.svg" alt="info" height={16} width={16} unoptimized={true} />Download Sample CSV</button>
        </div>

        <label htmlFor="images" className="border-2 border-dashed border-border-color cursor-pointer rounded-md px-2 py-8 flex items-center justify-between">
            <div className="flex flex-col items-center justify-center gap-y-3 mx-auto">
                <button type="button"><Image src="/images/upload.svg" alt="upload" height={20} width={30} unoptimized={true} /></button>
                <div className="text-secondary text-lg font-semibold capitalize">Drag & Drop a.CSV File Here</div>

                <div className="text-text3 text-sm text-center capitalize">Upload up to 500 customers per file. The following column titles are allowed: First Name, Last Name, Email, Phone, Employee First Name, Employee Last Name, and Tag. Use this <span className="text-primary font-medium underline">template</span></div>

                <SecondaryButton title="choose file" class_="bg-white! text-primary! px-10! mt-3!" />
            </div>
            <input type="file" id="images" className="hidden"
                accept={accept || "video/*, image/*"}
                multiple={true}
                onChange={(e) => {
                    if (onChange) {
                        onChange(e)
                    }
                }} />

        </label>
    </>
}