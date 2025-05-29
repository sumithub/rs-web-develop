import { PhoneInput } from "react-international-phone";
import 'react-international-phone/style.css';
import { phoneStyles } from "../../../helper";

export default function PhoneForm({ isRequired = false,
    label = "",
    disabled = false,
    class_ = "",
    errors,
    formProps,
    labelClass = "",
    clearErrors,
    setValue,
    watch,
    widthClass = ""
}) {
    const error = isRequired && (errors?.[formProps?.name]?.message || errors?.[formProps?.name]?.type);
    const value = watch ? watch(formProps.name) : null;
    return (<div className={`mt-4 text-lg relative ${class_}`}>
        {label && <label className={`text-sm font-medium text-secondary mb-1 block capitalize  ${labelClass}`}>{label}{isRequired ? <span className="text-danger">*</span> : <span className="text-neutral-400"> (Optional)</span>}</label>}
        <div className={`relative flex w-full  ${widthClass}`}>
            <PhoneInput
                disabled={disabled}
                showDisabledDialCodeAndPrefix={true}
                disableDialCodeAndPrefix={true}
                style={phoneStyles}
                defaultCountry="us"
                value={value || ""}
                inputClassName="w-full"
                onChange={(phone) => {
                    setValue(formProps.name, phone)
                    if (clearErrors) {
                        clearErrors(formProps.name);
                    }
                }}
            />
        </div>
        {error && <div className="capitalize text-xs font-medium text-red-500 mt-1">{error}</div>}
    </div>
    )
}