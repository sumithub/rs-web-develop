import { PhoneInput } from "react-international-phone";
import 'react-international-phone/style.css';
import { phoneStyles } from "../../../helper";

export default function Phone({ isRequired = false,
    label = "",
    onChange,
    disabled = false,
    class_ = "",
    labelClass = "",
    value,
}) {
    return (<div className={`mt-4 text-lg relative ${class_}`}>
        {label && <label className={`text-sm font-medium text-secondary ${labelClass}`}>{label}{isRequired ? <span className="text-danger">*</span> : <span className="text-neutral-400">(Optional)</span>}</label>}
        <div className={`relative flex w-full !h-[32px] `}>
            <PhoneInput
                disabled={disabled}
                showDisabledDialCodeAndPrefix={true}
                disableDialCodeAndPrefix={true}
                style={phoneStyles}
                defaultCountry="us"
                value={value || ""}
                onChange={onChange}
                inputClassName={`!text-lg w-full !h-[32px]`}
            />
        </div>
    </div>
    )
}