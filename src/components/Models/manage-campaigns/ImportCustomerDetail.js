import { useState } from "react";
import ImportCustomer from "../customers/ImportCustomer";
import Model from "../Model";

export default function ImportCustomerDEtail({ onClose }) {
    const [activeStep, setActiveStep] = useState(1);

    return <Model onClose={onClose} title={activeStep === 6 ? "Customers Imported Successfully!" : "Import Customers"} modalClass="w-[65%]!">

        <ImportCustomer icon={true} activeStep={activeStep}
            setActiveStep={setActiveStep}
            onClose={onClose} />
    </Model>
}