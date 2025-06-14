"use client"
import Model from "../Model";
import CheckboxForm from "../../form/CheckboxForm";
import SecondaryButton from "../../common/SecondaryButton";
import CodePreviewBox from "./CodePreviewBox";
import { useEffect, useRef, useState } from "react";
import SelectForm from "../../form/SelectForm";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { getError } from "../../../../helper";
import InputForm from "../../form/InputForm";
import Image from "next/image";
import Switch from "../../../components/form/Switch";
import ColorInputForm from "../../form/ColorInputForm";
import Slider from "react-slick";
import ProgressBar from "@ramonak/react-progress-bar";

export default function AddReview({ heading = "", onClose, OnSave, id, onNext }) {
    const { register, setValue, handleSubmit, clearErrors, watch, formState: { errors } } = useForm();
    const [sending, setSending] = useState(false);
    const [open, setOpen] = useState(false);
    const [clickSwitch, setClickSwitch] = useState(false);
    const [clickSwitch1, setClickSwitch1] = useState(false);
    const [previewData, setPreviewData] = useState({});
    const [selectedSources, setSelectedSources] = useState([]);
    const [validationErrors, setValidationErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    const title = heading.replaceAll("_", "");
    const normalizedTitle = title?.toLowerCase();

    // Watch form values for real-time preview updates
    const watchedValues = watch();

    useEffect(() => {
        setValue("colorScheme", "#0396FF");
        setValue("fontFamily", "inter");
        setValue("borderRadius", "10");
        setValue("numberOfReviews", "5");
        setValue("minimumRating", "3");
        setValue("sorting", "latest");
        setValue("transitionEffect", "slide");
        setValue("popupDelay", "1000");
        setValue("buttonLabel", "Leave Review");

        // Set default switches
        setValue("showReviewerDetails", clickSwitch1);
        setValue("autoScroll", clickSwitch);
        setValue("autoTriggerPopup", clickSwitch);
    }, [setValue]);

    // Update preview data when form values change
    useEffect(() => {
        setPreviewData({
            ...watchedValues,
            showReviewerDetails: clickSwitch1,
            autoScroll: clickSwitch,
            autoTriggerPopup: clickSwitch,
            selectedSources: selectedSources
        });
    }, [watchedValues, clickSwitch1, clickSwitch, selectedSources]);

    // Validate form in real-time
    useEffect(() => {
        validateForm();
    }, [watchedValues, selectedSources, clickSwitch, clickSwitch1]);


    const validateForm = () => {
        const errors = {};
        let isValid = true;

        // Check required fields based on widget type
        if (hasDesignSection()) {
            if (!watchedValues.colorScheme && normalizedTitle.includes("carousel")) {
                errors.colorScheme = "Color scheme is required";
                isValid = false;
            }
            if (!watchedValues.fontFamily && normalizedTitle.includes("carousel")) {
                errors.fontFamily = "Font family is required";
                isValid = false;
            }
            if (!watchedValues.borderRadius && normalizedTitle.includes("carousel")) {
                errors.borderRadius = "Border radius is required";
                isValid = false;
            }
        }

        if (hasContentSection()) {
            if (normalizedTitle === "floatingbuttonwidget" && !watchedValues.buttonLabel) {
                errors.buttonLabel = "Button label is required";
                isValid = false;
            }
            if ((normalizedTitle === "carousel" || normalizedTitle === "gridwidget") && !watchedValues.numberOfReviews) {
                errors.numberOfReviews = "Number of reviews is required";
                isValid = false;
            }
            if (!watchedValues.sorting) {
                errors.sorting = "Sorting is required";
                isValid = false;
            }
        }

        if (hasBehaviorSection()) {
            if (normalizedTitle === "carousel" && !watchedValues.transitionEffect) {
                errors.transitionEffect = "Transition effect is required";
                isValid = false;
            }
            if (normalizedTitle === "floatingbuttonwidget" && !watchedValues.popupDelay) {
                errors.popupDelay = "Popup delay is required";
                isValid = false;
            }
        }

        // Check if at least one source is selected
        if (selectedSources.length === 0) {
            errors.sources = "Please select at least one review source";
            isValid = false;
        }

        // Check maximum of 3 sources
        if (selectedSources.length > 3) {
            errors.sources = "Please select maximum 3 review sources";
            isValid = false;
        }

        setValidationErrors(errors);
        setIsFormValid(isValid);
    };

    const handleSourceChange = (source, checked) => {
        if (checked) {
            if (selectedSources.length < 3) {
                setSelectedSources(prev => [...prev, source]);
                setValue(source, true);
            } else {
                toast.warning("You can select maximum 3 sources");
                return;
            }
        } else {
            setSelectedSources(prev => prev.filter(s => s !== source));
            setValue(source, false);
        }
    };

    const onSubmit = async (data) => {
        if (!isFormValid) {
            toast.error("Please fix all validation errors before saving");
            return;
        }

        try {
            setSending(true);

            const payload = {
                ...data,
                showReviewerDetails: clickSwitch1,
                autoScroll: clickSwitch,
                autoTriggerPopup: clickSwitch,
                selectedSources: selectedSources,
                widgetType: normalizedTitle,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            let res = await axios.post("/api", payload);
            toast.success("Widget created successfully");

            // Call parent callback if provided
            if (OnSave) {
                OnSave(res.data);
            }

            setSending(false);
            onClose();
        } catch (error) {
            toast.error(getError(error));
            setSending(false);
        }
    };

    const handleNext = () => {
        if (!isFormValid) {
            toast.error("Please complete all required fields before proceeding");
            return;
        }

        if (onNext) {
            const formData = {
                ...watchedValues,
                showReviewerDetails: clickSwitch1,
                autoScroll: clickSwitch,
                autoTriggerPopup: clickSwitch,
                selectedSources: selectedSources,
                widgetType: normalizedTitle
            };
            onNext(title, formData);
        }
    };

    const generateWidgetCode = () => {
        const config = {
            ...previewData,
            widgetType: normalizedTitle,
            id: normalizedTitle
        };

        // Generate HTML/JS code based on widget type and configuration
        return `
<!-- ${title} Widget -->
<div id="${config.id}" class="review-widget" data-widget-type="${normalizedTitle}">
    <!-- Widget will be rendered here -->
</div>

<script>
(function() {
    const config = ${JSON.stringify(config, null, 2)};
    
    // Initialize widget with configuration
    window.ReviewWidget = window.ReviewWidget || {};
    window.ReviewWidget.init('${config.id}', config);
})();
</script>

<style>
.review-widget {
    font-family: ${config.fontFamily || 'inter'};
    border-radius: ${config.borderRadius || '10'}px;
    color-scheme: ${config.colorScheme || '#0396FF'};
}
</style>`;
    };

    // Helper function to determine if widget needs design section
    const hasDesignSection = () => {
        return ["carousel", "gridwidget", "testimonialwidget", "starbadgewidget", "floatingbuttonwidget"].includes(normalizedTitle);
    }

    // Helper function to determine if widget needs content section
    const hasContentSection = () => {
        return ["carousel", "gridwidget", "testimonialwidget", "floatingbuttonwidget"].includes(normalizedTitle);
    }

    // Helper function to determine if widget needs behavior section
    const hasBehaviorSection = () => {
        return ["carousel", "floatingbuttonwidget"].includes(normalizedTitle);
    }

    return (<Model onClose={onClose} title={heading.replaceAll("_", " ")} modalClass="w-[80%]!">
        {open && (
            <CodePreviewBox
                code={generateWidgetCode()}
                onClose={() => setOpen(false)}
                onSave={() => setOpen(true)}
            />
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-5">
                <div>
                    {/* Design Section */}
                    {hasDesignSection() && (
                        <div className="p-[15px] bg-dark rounded-[15px]">
                            <h2 className="text-lg font-semibold">Design</h2>
                            <div className="grid grid-cols-3 items-center gap-[15px] pt-2.5">
                                <ColorInputForm
                                    label="Color Scheme"
                                    isRequired={normalizedTitle.includes("carousel")}
                                    class_="mt-0!"
                                    labelClass="pb-2.5! inline-block"
                                    bgClass="border border-primary3/10 bg-white!"
                                    formProps={{
                                        ...register("colorScheme", {
                                            required: normalizedTitle.includes("carousel")
                                        })
                                    }}
                                    errors={errors}
                                    setValue={setValue}
                                />

                                <SelectForm
                                    label="Font Family"
                                    isRequired={normalizedTitle.includes("carousel")}
                                    defaultOption="Select"
                                    formProps={{
                                        ...register("fontFamily", {
                                            required: normalizedTitle.includes("carousel")
                                        })
                                    }}
                                    errors={errors}
                                    class_="mt-0!"
                                    labelClass="pb-2.5 inline-block mb-0!"
                                    selectClass_="border border-primary3/10 py-3.5! px-2.5! bg-white! text-sm!"
                                    clearErrors={clearErrors}
                                >
                                    <option value="inter">Inter</option>
                                    <option value="arial">Arial</option>
                                    <option value="helvetica">Helvetica</option>
                                </SelectForm>

                                <InputForm
                                    label="Border Radius"
                                    isRequired={normalizedTitle.includes("carousel")}
                                    placeholder="Enter Border Radius"
                                    formProps={{
                                        ...register("borderRadius", {
                                            required: normalizedTitle.includes("carousel"),
                                            min: { value: 0, message: "Must be 0 or greater" },
                                            max: { value: 50, message: "Cannot exceed 50" }
                                        })
                                    }}
                                    errors={errors}
                                    inputClass="border border-primary3/10 py-[13.2px]! px-2.5! bg-white!"
                                    labelClass="pb-2.5! inline-block"
                                    class_="mt-0!"
                                    type="number"
                                />
                            </div>
                            {validationErrors.colorScheme && <p className="text-red-500 text-xs mt-1">{validationErrors.colorScheme}</p>}
                            {validationErrors.fontFamily && <p className="text-red-500 text-xs mt-1">{validationErrors.fontFamily}</p>}
                            {validationErrors.borderRadius && <p className="text-red-500 text-xs mt-1">{validationErrors.borderRadius}</p>}
                        </div>
                    )}

                    {/* Content Section */}
                    {hasContentSection() && (
                        <div className="p-[15px] bg-dark rounded-[15px] mt-5">
                            <h2 className="text-lg font-semibold">Content</h2>
                            <div className="grid grid-cols-2 gap-5">
                                {/* Number of Reviews - for carousel and gridwidget */}
                                {(normalizedTitle === "carousel" || normalizedTitle === "gridwidget") && (
                                    <InputForm
                                        label="Number of Reviews"
                                        isRequired={true}
                                        placeholder="Enter review count"
                                        formProps={{
                                            ...register("numberOfReviews", {
                                                required: "Number of reviews is required",
                                                min: { value: 1, message: "Must be at least 1" },
                                                max: { value: 100, message: "Cannot exceed 100" }
                                            })
                                        }}
                                        errors={errors}
                                        inputClass="border border-primary3/10 p-2.5! bg-white!"
                                        labelClass="pb-2.5! inline-block"
                                        class_="mt-0!"
                                        type="number"
                                    />
                                )}

                                {/* Button Label - for floating button widget */}
                                {normalizedTitle === "floatingbuttonwidget" && (
                                    <InputForm
                                        label="Button Label"
                                        isRequired={true}
                                        placeholder="Enter button text"
                                        formProps={{
                                            ...register("buttonLabel", {
                                                required: "Button label is required",
                                                minLength: { value: 2, message: "Must be at least 2 characters" },
                                                maxLength: { value: 20, message: "Cannot exceed 20 characters" }
                                            })
                                        }}
                                        errors={errors}
                                        inputClass="border border-primary3/10 p-2.5! bg-white!"
                                        labelClass="pb-2.5! inline-block"
                                        class_="mt-0!"
                                    />
                                )}

                                {/* Minimum Rating */}
                                {(normalizedTitle !== "testimonialwidget") && (
                                    <SelectForm
                                        label="Minimum Rating"
                                        isRequired={true}
                                        defaultOption="Select"
                                        formProps={{
                                            ...register("minimumRating", {
                                                required: "Minimum rating is required"
                                            })
                                        }}
                                        errors={errors}
                                        class_="mt-0!"
                                        labelClass="pb-2.5 inline-block mb-0!"
                                        selectClass_="border border-primary3/10 py-2.5! px-2.5! bg-white! text-sm!"
                                        clearErrors={clearErrors}
                                    >
                                        <option value="1">Rating 1</option>
                                        <option value="2">Rating 2</option>
                                        <option value="3">Rating 3</option>
                                        <option value="4">Rating 4</option>
                                        <option value="5">Rating 5</option>
                                    </SelectForm>
                                )}
                            </div>

                            {/* Sorting */}
                            {normalizedTitle !== "testimonialwidget" && (
                                <div className="mt-2.5">
                                    <SelectForm
                                        label="Sorting"
                                        isRequired={true}
                                        defaultOption="Select"
                                        formProps={{
                                            ...register("sorting", {
                                                required: "Sorting option is required"
                                            })
                                        }}
                                        errors={errors}
                                        class_="mt-0!"
                                        labelClass="pb-2.5 inline-block mb-0!"
                                        selectClass_="border border-primary3/10 py-2.5! px-2.5! bg-white! text-sm!"
                                        clearErrors={clearErrors}
                                    >
                                        <option value="latest">Latest</option>
                                        <option value="highest-rated">Highest Rated</option>
                                    </SelectForm>
                                </div>
                            )}

                            {(normalizedTitle === "testimonialwidget") && (
                                <div className="grid grid-cols-2 gap-5">
                                    <SelectForm
                                        label="Sorting"
                                        isRequired={true}
                                        defaultOption="Select"
                                        formProps={{
                                            ...register("sorting", {
                                                required: "Sorting option is required"
                                            })
                                        }}
                                        errors={errors}
                                        class_="mt-0!"
                                        labelClass="pb-2.5 inline-block mb-0!"
                                        selectClass_="border border-primary3/10 py-2.5! px-2.5! bg-white! text-sm!"
                                        clearErrors={clearErrors}
                                    >
                                        <option value="latest">Latest</option>
                                        <option value="highest-rated">Highest Rated</option>
                                    </SelectForm>
                                    <SelectForm
                                        label="Minimum Rating"
                                        isRequired={false}
                                        defaultOption="Select"
                                        formProps={{
                                            ...register("minimumRating", { required: false })
                                        }}
                                        errors={errors}
                                        class_="mt-0!"
                                        labelClass="pb-2.5 inline-block mb-0!"
                                        selectClass_="border border-primary3/10 py-2.5! px-2.5! bg-white! text-sm!"
                                        clearErrors={clearErrors}
                                    >
                                        <option value="1">Rating 1</option>
                                        <option value="2">Rating 2</option>
                                        <option value="3">Rating 3</option>
                                        <option value="4">Rating 4</option>
                                        <option value="5">Rating 5</option>
                                    </SelectForm>
                                </div>
                            )}

                            {/* Show Reviewer Details */}
                            <div className="pt-2.5 flex gap-[15px] items-center">
                                <h2 className="text-base font-medium">Show Reviewer Details</h2>
                                <Switch
                                    checked={clickSwitch1}
                                    onChange={() => {
                                        setClickSwitch1(prev => !prev);
                                        setValue("showReviewerDetails", !clickSwitch1);
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    <div className="p-[15px] bg-dark rounded-[15px] mt-5">
                        <h2 className="text-lg font-semibold">Review Sources</h2>
                        <h3 className="text-base pt-2.5 font-medium">Select up to 3</h3>
                        <div className="flex gap-[15px] items-center pt-[15px]">
                            <div className="flex gap-2.5 items-center">
                                <CheckboxForm
                                    formProps={{
                                        ...register("google"),
                                        onChange: (e) => handleSourceChange("google", e.target.checked)
                                    }}
                                    errors={errors}
                                    checked={selectedSources.includes("google")}
                                />
                                <div>Google</div>
                            </div>
                            <div className="flex gap-2.5 items-center">
                                <CheckboxForm
                                    formProps={{
                                        ...register("trustpilot"),
                                        onChange: (e) => handleSourceChange("trustpilot", e.target.checked)
                                    }}
                                    errors={errors}
                                    checked={selectedSources.includes("trustpilot")}
                                />
                                <div>Trustpilot</div>
                            </div>
                            <div className="flex gap-2.5 items-center">
                                <CheckboxForm
                                    formProps={{
                                        ...register("yelp"),
                                        onChange: (e) => handleSourceChange("yelp", e.target.checked)
                                    }}
                                    errors={errors}
                                    checked={selectedSources.includes("yelp")}
                                />
                                <div>Yelp</div>
                            </div>
                        </div>
                        {validationErrors.sources && <p className="text-red-500 text-xs mt-2">{validationErrors.sources}</p>}
                        <div className="mt-2 text-xs text-gray-400">
                            Selected: {selectedSources.length}/3
                        </div>
                    </div>

                    {/* Behavior Section */}
                    {hasBehaviorSection() && (
                        <div className="p-[15px] bg-dark rounded-[15px] mt-5">
                            <h2 className="text-lg font-semibold">Behavior</h2>
                            <div className="">
                                {normalizedTitle === "carousel" && (
                                    <SelectForm
                                        label="Transition Effect"
                                        isRequired={true}
                                        defaultOption="Select"
                                        formProps={{
                                            ...register("transitionEffect", {
                                                required: "Transition effect is required"
                                            })
                                        }}
                                        errors={errors}
                                        class_="mt-0!"
                                        labelClass="pb-2.5 inline-block mb-0!"
                                        selectClass_="border border-primary3/10 py-2.5! px-2.5! bg-white! text-sm!"
                                        clearErrors={clearErrors}
                                    >
                                        <option value="slide">Slide</option>
                                        <option value="fade">Fade</option>
                                    </SelectForm>
                                )}

                                {normalizedTitle === "floatingbuttonwidget" && (
                                    <SelectForm
                                        label="Popup Delay"
                                        isRequired={true}
                                        defaultOption="Select"
                                        formProps={{
                                            ...register("popupDelay", {
                                                required: "Popup delay is required"
                                            })
                                        }}
                                        errors={errors}
                                        class_="mt-0!"
                                        labelClass="pb-2.5 inline-block mb-0!"
                                        selectClass_="border border-primary3/10 py-2.5! px-2.5! bg-white! text-sm!"
                                        clearErrors={clearErrors}
                                    >
                                        <option value="0">Immediate</option>
                                        <option value="1000">1 Second</option>
                                        <option value="3000">3 Seconds</option>
                                        <option value="5000">5 Seconds</option>
                                    </SelectForm>
                                )}
                            </div>
                            <div className="flex gap-[15px] items-center mt-2.5">
                                <h2 className="text-base font-medium">
                                    {normalizedTitle === "carousel" ? "Auto-Scroll" : "Auto-Trigger Popup"}
                                </h2>
                                <Switch
                                    checked={clickSwitch}
                                    onChange={() => {
                                        setClickSwitch(prev => !prev);
                                        setValue(normalizedTitle === "carousel" ? "autoScroll" : "autoTriggerPopup", !clickSwitch);
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Form Validation Summary */}
                    {!isFormValid && Object.keys(validationErrors).length > 0 && (
                        <div className="p-[15px] bg-red-50 border border-red-200 rounded-[15px] mt-5">
                            <h3 className="text-red-800 font-medium mb-2">Please fix the following errors:</h3>
                            <ul className="text-red-600 text-sm space-y-1">
                                {Object.values(validationErrors).map((error, index) => (
                                    <li key={index}>• {error}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="mt-[30px] grid grid-cols-2 gap-5">
                        <SecondaryButton
                            title={sending ? "Saving..." : "Save"}
                            type="submit"
                            disabled={sending || !isFormValid}
                            class_={`bg-white! text-primary! ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                        />
                        <SecondaryButton
                            title="Next"
                            onClick={handleNext}
                            type="button"
                            disabled={!isFormValid}
                            class_={!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}
                        />
                    </div>
                </div>

                {/* Widget Preview Section */}
                <div className="shadow-sm rounded-[15px]">
                    <div className="bg-primary/10 rounded-t-[15px] px-5 py-[18px] flex gap-2.5 items-center">
                        <Image unoptimized={true} src="/images/eye1.svg" alt="eye1" width={22} height={22} />
                        <h2 className="text-lg font-semibold">Widget Preview</h2>
                        <div className="ml-auto flex items-center gap-2">
                            <span className={`inline-block w-2 h-2 rounded-full ${isFormValid ? 'bg-green-500' : 'bg-red-500'}`}></span>
                            <span className="text-xs">{isFormValid ? 'Valid' : 'Invalid'}</span>
                        </div>
                    </div>
                    <div className="p-5 h-[90%]">
                        {normalizedTitle === "carousel" ? (
                            <Carousel setOpen={setOpen} previewData={previewData} />
                        ) : normalizedTitle === "starbadgewidget" ? (
                            <StarBadgeWidget setOpen={setOpen} previewData={previewData} />
                        ) : (
                            <FloatingButtonWidget setOpen={setOpen} previewData={previewData} />
                        )}
                    </div>
                </div>
            </div>
        </form>
    </Model>
    );
}

const FloatingButtonWidget = ({ setOpen, previewData = {} }) => {
    const buttonText = previewData.buttonLabel || "Leave Review";
    const colorScheme = previewData.colorScheme || "#0396FF";
    const fontFamily = previewData.fontFamily || "inter";
    const borderRadius = previewData.borderRadius || "10";

    return (
        <div className="border border-border2 rounded-[10px] p-5" style={{ fontFamily, borderRadius: (borderRadius + "px") }}>
            <div className="flex justify-between items-start">
                <div className="flex gap-[15px]">
                    <Image src="/images/john-die2.png" alt="john-die2" width={71} height={71} className="" />
                    <div>
                        <h2 className="text-xl font-medium">John Die</h2>
                        <h3 className="text-text3 text-xs font-medium">Aug 25, 2025</h3>
                        <div className="flex gap-[5px]">
                            <Image unoptimized={true} src="/images/star.svg" alt="star" width={21} height={21} />
                            <Image unoptimized={true} src="/images/star.svg" alt="star" width={21} height={21} />
                            <Image unoptimized={true} src="/images/star.svg" alt="star" width={21} height={21} />
                            <Image unoptimized={true} src="/images/star.svg" alt="star" width={21} height={21} />
                            <Image unoptimized={true} src="/images/star2.svg" alt="star2" width={21} height={21} />
                        </div>
                    </div>
                </div>
                <button
                    className="border border-primary p-2.5 rounded-lg bg-dark"
                    style={{ borderColor: colorScheme, borderRadius: `${borderRadius}px` }}
                >
                    <span>
                        <Image unoptimized={true} src="/images/google.svg" alt="google" width={18} height={18} className="" />
                    </span>
                </button>
            </div>
            <p className="text-xs pt-[15px] capitalize">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.<br />
                <span className="font-medium" style={{ color: colorScheme }}>Read More</span>
            </p>
            <div className="mt-20">
                <SecondaryButton
                    title="Get Code"
                    onClick={() => { setOpen(true) }}
                    type="button"
                    style={{
                        backgroundColor: colorScheme,
                        borderRadius: `${borderRadius}px`,
                        fontFamily: fontFamily
                    }}
                />
            </div>
        </div>
    );
};

const StarBadgeWidget = ({ setOpen, previewData = {} }) => {
    const colorScheme = previewData.colorScheme || "#FFC107";
    const fontFamily = previewData.fontFamily || "inter";
    const borderRadius = previewData.borderRadius || "10";
    const progressColor = colorScheme === "#0396FF" ? "#FFC107" : colorScheme;

    return (
        <div className="border border-border2 rounded-[10px] p-5" style={{ fontFamily, borderRadius: (borderRadius + "px") }}>
            <div className="">
                <div>
                    <div className="text-secondary text-xl font-medium mb-[15px]">Star Rating Badge</div>
                    <div className="grid grid-cols-[0.8fr_auto_2fr] gap-5">
                        <div className="text-end">
                            <div className="text-[46px] text-end font-semibold" style={{ color: colorScheme }}>4.5</div>
                            <div className="flex gap-2.5 pt-[5px] justify-end">
                                <div className="flex items-center gap-1">
                                    <Image src="/images/star.svg" alt="star" height={14} width={14} unoptimized={true} />
                                    <Image src="/images/star.svg" alt="star" height={14} width={14} unoptimized={true} />
                                    <Image src="/images/star.svg" alt="star" height={14} width={14} unoptimized={true} />
                                    <Image src="/images/star.svg" alt="star" height={14} width={14} unoptimized={true} />
                                    <Image src="/images/star2.svg" alt="star2" height={14} width={14} unoptimized={true} />
                                </div>
                                <h2 className="text-sm font-semibold" style={{ color: colorScheme }}>&#40;200&#41;</h2>
                            </div>
                            <div className="pt-[5px]">
                                <h2 className="text-text3 text-sm">Food 4.5</h2>
                                <h2 className="text-text3 text-sm py-[5px]">Ambience 3.7</h2>
                                <h2 className="text-text3 text-sm">Service 4.2</h2>
                            </div>
                        </div>
                        <hr className="border border-border2 h-full" />
                        <div>
                            <div className="flex gap-10 items-center justify-between">
                                <div className="flex gap-[5px]">
                                    <Image unoptimized={true} src="/images/star.svg" alt="star" width={14} height={14} />
                                    <Image unoptimized={true} src="/images/star.svg" alt="star" width={14} height={14} />
                                    <Image unoptimized={true} src="/images/star.svg" alt="star" width={14} height={14} />
                                    <Image unoptimized={true} src="/images/star.svg" alt="star" width={14} height={14} />
                                    <Image unoptimized={true} src="/images/star.svg" alt="star" width={14} height={14} />
                                </div>
                                <div className="grid grid-cols-[0.9fr_auto] gap-2 w-full items-center justify-between">
                                    <ProgressBar
                                        completed={50}
                                        bgColor={progressColor}
                                        height="8px"
                                        width="180px"
                                        isLabelVisible={false}
                                        borderRadius={`${borderRadius}px`}
                                    />
                                    <div className="text-xs font-semibold">250</div>
                                </div>
                            </div>
                            <div className="flex gap-10 items-center justify-between mt-5">
                                <div className="flex gap-[5px]">
                                    <Image unoptimized={true} src="/images/star2.svg" alt="star2" width={14} height={14} />
                                    <Image unoptimized={true} src="/images/star.svg" alt="star" width={14} height={14} />
                                    <Image unoptimized={true} src="/images/star.svg" alt="star" width={14} height={14} />
                                    <Image unoptimized={true} src="/images/star.svg" alt="star" width={14} height={14} />
                                    <Image unoptimized={true} src="/images/star.svg" alt="star" width={14} height={14} />
                                </div>
                                <div className="grid grid-cols-[0.9fr_auto] gap-2 w-full items-center justify-between">
                                    <ProgressBar
                                        completed={40}
                                        bgColor={progressColor}
                                        height="8px"
                                        width="180px"
                                        isLabelVisible={false}
                                        borderRadius={`${borderRadius}px`}
                                    />
                                    <div className="text-xs font-semibold">200</div>
                                </div>
                            </div>
                            <div className="flex gap-10 items-center justify-between mt-5">
                                <div className="flex gap-[5px]">
                                    <Image unoptimized={true} src="/images/star2.svg" alt="star2" width={14} height={14} />
                                    <Image unoptimized={true} src="/images/star2.svg" alt="star2" width={14} height={14} />
                                    <Image unoptimized={true} src="/images/star.svg" alt="star" width={14} height={14} />
                                    <Image unoptimized={true} src="/images/star.svg" alt="star" width={14} height={14} />
                                    <Image unoptimized={true} src="/images/star.svg" alt="star" width={14} height={14} />
                                </div>
                                <div className="grid grid-cols-[0.9fr_auto] gap-2 w-full items-center justify-between">
                                    <ProgressBar
                                        completed={60}
                                        bgColor={progressColor}
                                        height="8px"
                                        width="180px"
                                        isLabelVisible={false}
                                        borderRadius={`${borderRadius}px`}
                                    />
                                    <div className="text-xs font-semibold">500</div>
                                </div>
                            </div>
                            <div className="flex gap-10 items-center justify-between mt-5">
                                <div className="flex gap-[5px]">
                                    <Image unoptimized={true} src="/images/star2.svg" alt="star2" width={14} height={14} />
                                    <Image unoptimized={true} src="/images/star2.svg" alt="star2" width={14} height={14} />
                                    <Image unoptimized={true} src="/images/star2.svg" alt="star2" width={14} height={14} />
                                    <Image unoptimized={true} src="/images/star.svg" alt="star" width={14} height={14} />
                                    <Image unoptimized={true} src="/images/star.svg" alt="star" width={14} height={14} />
                                </div>
                                <div className="grid grid-cols-[0.9fr_auto] gap-2 w-full items-center justify-between">
                                    <ProgressBar
                                        completed={15}
                                        bgColor={progressColor}
                                        height="8px"
                                        width="180px"
                                        isLabelVisible={false}
                                        borderRadius={`${borderRadius}px`}
                                    />
                                    <div className="text-xs font-semibold">10</div>
                                </div>
                            </div>
                            <div className="flex gap-10 items-center justify-between mt-5">
                                <div className="flex gap-[5px]">
                                    <Image unoptimized={true} src="/images/star2.svg" alt="star2" width={14} height={14} />
                                    <Image unoptimized={true} src="/images/star2.svg" alt="star2" width={14} height={14} />
                                    <Image unoptimized={true} src="/images/star2.svg" alt="star2" width={14} height={14} />
                                    <Image unoptimized={true} src="/images/star2.svg" alt="star2" width={14} height={14} />
                                    <Image unoptimized={true} src="/images/star.svg" alt="star" width={14} height={14} />
                                </div>
                                <div className="grid grid-cols-[0.9fr_auto] gap-2 w-full items-center justify-between">
                                    <ProgressBar
                                        completed={5}
                                        bgColor={progressColor}
                                        height="8px"
                                        width="180px"
                                        isLabelVisible={false}
                                        borderRadius={`${borderRadius}px`}
                                    />
                                    <div className="text-xs font-semibold">05</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-[30px]">
                <SecondaryButton
                    title="Get Code"
                    onClick={() => { setOpen(true) }}
                    type="button"
                    style={{
                        backgroundColor: colorScheme,
                        borderRadius: `${borderRadius}px`,
                        fontFamily: fontFamily
                    }}
                />
            </div>
        </div >
    );
};

const Carousel = ({ setOpen, previewData = {} }) => {
    const [show, setShow] = useState(false);
    const colorScheme = previewData.colorScheme || "#0396FF";
    const fontFamily = previewData.fontFamily || "inter";
    const borderRadius = previewData.borderRadius || "10";
    const transitionEffect = previewData.transitionEffect || "slide";
    const autoScroll = previewData.autoScroll || false;
    const showReviewerDetails = previewData.showReviewerDetails !== undefined ? previewData.showReviewerDetails : true;

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: transitionEffect === "fade",
        autoplay: autoScroll,
        autoplaySpeed: 3000
    };

    const sliderRef = useRef(null);

    useEffect(() => {
        if (autoScroll && sliderRef.current) {
            sliderRef.current.slickPlay();
        } else if (sliderRef.current) {
            sliderRef.current.slickPause();
        }
    }, [autoScroll]);

    return (
        <div
            className="border border-border2 rounded-[10px] p-5 flex flex-col justify-between h-full"
            style={{ fontFamily, borderRadius: `${borderRadius}px` }}
        >
            <div>
                <Slider {...settings} ref={sliderRef}>
                    {[1, 2].map((_, i) => (
                        <div key={i}>
                            <div>
                                <div className="text-center">
                                    <Image
                                        src="/images/john-die.png"
                                        alt="john-die"
                                        width={46}
                                        height={46}
                                        className="mx-auto"
                                        style={{ borderRadius: `${borderRadius}px` }}
                                    />
                                    {showReviewerDetails && (
                                        <h2 className="pt-[15px] pb-2.5 text-base font-medium">John Die</h2>
                                    )}
                                </div>
                                <div className="flex justify-between items-center gap-2.5">
                                    <button
                                        type="button"
                                        onClick={() => sliderRef.current?.slickPrev()}
                                        style={{ color: colorScheme }}
                                    >
                                        <Image
                                            unoptimized={true}
                                            src="/images/arrow-left.svg"
                                            alt="arrow-left"
                                            width={24}
                                            height={24}
                                            className=""
                                        />
                                    </button>
                                    {showReviewerDetails && (
                                        <h3 className="text-text3 text-xs font-medium">Aug 25, 2025</h3>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => sliderRef.current?.slickNext()}
                                        style={{ color: colorScheme }}
                                    >
                                        <Image
                                            unoptimized={true}
                                            src="/images/arrow-right2.svg"
                                            alt="arrow-right2"
                                            width={24}
                                            height={24}
                                        />
                                    </button>
                                </div>
                                <p className="text-center text-xs capitalize">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                    <br />
                                    {show && (
                                        <>
                                            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                            Read More
                                        </>
                                    )}
                                    <span
                                        onClick={() => { setShow(!show) }}
                                        className="cursor-pointer font-medium"
                                        style={{ color: colorScheme }}
                                    >
                                        Read {show ? "Less" : "More"}
                                    </span>
                                </p>
                                <div className="my-10 flex justify-center">
                                    <button
                                        className="text-xs font-medium flex items-center gap-2.5 py-[7px] px-2.5 rounded-lg border bg-dark"
                                        type="button"
                                        style={{
                                            borderColor: colorScheme,
                                            borderRadius: `${borderRadius}px`
                                        }}
                                    >
                                        <span>
                                            <Image
                                                unoptimized={true}
                                                src="/images/google.svg"
                                                alt="google"
                                                width={18}
                                                height={18}
                                                className=""
                                            />
                                        </span>
                                        Verified On Google
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
            <div className="">
                <SecondaryButton
                    title="Get Code"
                    onClick={() => { setOpen(true) }}
                    type="button"
                    style={{
                        backgroundColor: colorScheme,
                        borderRadius: `${borderRadius}px`,
                        fontFamily: fontFamily
                    }}
                />
            </div>
        </div>
    );
};