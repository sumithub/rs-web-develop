"use client"
import { useState } from "react"
import ProgressBar from "../../../components/common/Progress"
import FileInput from "../../../components/form/FileInput"
export default function ImportCustomer() {
    const [activeStep, setActiveStep] = useState(1)

    return <main>
        <ProgressBar
            currentStep={activeStep}
            stepTitle1="Field Mapping"
            stepTitle2="Add List Details"
            stepTitle3="Validation & Errors"
            stepTitle4="Import Confirmation"
        />

        <FileInput />
        {/* <div>
            <div className="text-text3 text-sm capitalize">Map your CSV columns to their corresponding fields. Header Row and First Row reflect what's in your CSV file. Use the Mapping dropdown to select which attribute the column is associated with.</div>
        </div> */}
    </main>
}