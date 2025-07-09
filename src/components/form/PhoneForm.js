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
    let error = "";
    console.log(errors)
    if (formProps?.name && errors?.[formProps.name]) {
        const fieldError = errors[formProps.name];
        if (fieldError.type === "pattern" || fieldError.type === "validate" || fieldError.type === "minLength") {
            error = fieldError.message;
        } else {
            error = "This field is required";
        }
    } else if (formProps?.name && errors?.[formProps.name]?.type) {
        error = errors[formProps.name]?.message || "This field is required";
    }
    const value = watch ? watch(formProps.name) : null;
    return (<div className={`mt-4 text-lg relative w-full ${class_}`}>
        {label && <label className={`text-sm font-medium text-secondary mb-1 block capitalize  ${labelClass}`}>{label}{isRequired ? <span className="text-danger">*</span> : <span className="text-neutral-400"> (Optional)</span>}</label>}
        <div className={`relative w-full! ${widthClass}`}>
            <PhoneInput
                disabled={disabled}
                showDisabledDialCodeAndPrefix={true}
                disableDialCodeAndPrefix={true}
                style={phoneStyles}
                defaultCountry="us"
                value={value || ""}
                inputClassName="w-full!"
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