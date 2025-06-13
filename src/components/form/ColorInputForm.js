"use client";

export default function ColorInputForm({
    class_ = "",
    bgClass = "",
    inputClass = "",
    setValue,
    clearValue = true,
    isRequired,
    label,
    labelClass,
    placeholder,
    formProps,
    errors,
    disabled,
}) {
    let error = "";

    if (formProps?.name && errors?.[formProps.name]) {
        const fieldError = errors[formProps.name];
        if (fieldError.type === "pattern" || fieldError.type === "validate") {
            error = fieldError.message;
        } else {
            error = "This field is required";
        }
    }

    const handleClear = () => {
        if (clearValue) {
            setValue(formProps?.name, "");
        }
    };

    return (
        <div className={`mt-[15px] ${class_}`}>
            <label className={`text-sm font-medium text-secondary ${labelClass}`}>
                {label}
                {isRequired ? <span className="text-danger">*</span> : <span className="text-neutral-400"> (Optional)</span>}
            </label>

            <div className="relative">
                {clearValue && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-2 top-4 text-xs text-text3 underline"
                    >
                        Clear
                    </button>
                )}

                <div className={`border ${error ? "border-danger" : "border-primary/10"} hover:border-primary/60 w-full h-12 rounded-lg px-2.5 text-sm text-secondary ${bgClass}`}>
                    <input
                        type="color"
                        placeholder={placeholder}
                        {...formProps}
                        disabled={disabled}
                        className={`h-9 w-9 rounded-[14px] mt-1 focus:outline-0 focus-visible:outline-0  ${inputClass}`}
                    />
                </div>
            </div>

            {error && <p className="text-xs pt-[3px] capitalize text-danger">{error}</p>}
        </div>
    );
}
