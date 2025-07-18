import Image from "next/image";

export default function Rating(props) {
    const {
        isRequired,
        setValue,
        watch,
        clearErrors,  // Add clearErrors prop
        trigger,      // Add trigger prop
        label,
        disabled,
        containerClass = "",
        count = 5,
        formProps,
        errors
    } = props;

    let error = "";
    if (formProps?.name && errors?.[formProps.name]) {
        const fieldError = errors[formProps.name];
        if (fieldError.type === "pattern" || fieldError.type === "validate") {
            error = fieldError.message;
        } else {
            error = "Required";
        }
    }

    const handleRatingClick = (rating) => {
        // Set the rating value
        setValue(formProps?.name, rating);

        // Clear the error for this field
        if (clearErrors) {
            clearErrors(formProps?.name);
        }

        // Or trigger validation to clear error
        if (trigger) {
            trigger(formProps?.name);
        }
    };

    return (
        <div className={`laptop:mb-2 mb-3 relative ${containerClass}`}>
            {label && (
                <label className={`text-sm font-medium text-secondary capitalize ${!disabled && ""}`}>
                    {label} {isRequired ? <span className="text-danger">*</span> : ""}
                </label>
            )}
            <div className={`capitalize font-normal w-full border border-primary/10 hover:border-primary/60 rounded-lg text-sm py-3 px-2.5 flex gap-1 items-center ${error ? "border-danger" : "border-input-border"}`}>
                {Array(count).fill('*').map((star, i) => (
                    <span
                        key={i}
                        className={`cursor-pointer ${disabled ? 'pointer-events-none opacity-50' : ''}`}
                        onClick={() => !disabled && handleRatingClick(i + 1)}
                    >
                        <Image
                            src={`${watch(formProps?.name) > i ? "/images/star.svg" : "/images/rating-star.svg"}`}
                            alt="star"
                            height={16}
                            width={16}
                            className={`${watch(formProps?.name) > i ? "custom-yellow" : "text-text3"}`}
                        />
                    </span>
                ))}
            </div>
            {error && <p className="text-xs pt-[3px] capitalize text-danger">{error}</p>}
        </div>
    );
}