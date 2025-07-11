"use client";
import { useEffect, useState } from "react";
import ProgressBar from "../../../components/common/Progress";
import SelectForm from "../../form/SelectForm";
import Loading from "../../Loading";
import TableOrder from "../../TableOrder";
import axios from "axios";
import { getError } from "../../../../helper";
import { toast } from "react-toastify";
import { fieldMapping } from "../../../constent/constArray";
import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import InputForm from "../../form/InputForm";
import { useForm } from "react-hook-form";
import RadioForm from "../../form/RadioForm";
import Image from "next/image";
import FileInput from "../../form/FileInput";
import { useRole } from "../../../utils/hooks";

export default function ImportCustomer({ onBack, activeStep, setActiveStep, onClose, icon = false }) {
    const [sortBy, setSortBy] = useState("");
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tab, setTab] = useState(1);
    const [importDone, setImportDone] = useState(false);
    const [mappingErrors, setMappingErrors] = useState({});
    const [file, setFile] = useState(null)
    const { isAdmin } = useRole();

    const [importData, setImportData] = useState({
        fileName: "",
        selectedFile: null,
        fieldMappings: [],
        validationResults: {
            totalCustomers: 250,
            validCustomers: 245,
            duplicatesSkipped: 3,
            importedCustomers: 245
        }
    });

    const {
        register,
        handleSubmit,
        clearErrors,
        getValues,
        trigger,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        mode: 'onChange'
    });

    useEffect(() => {
        getData();
    }, [sortBy]);

    // Add useEffect to restore file when navigating back to step 1
    useEffect(() => {
        if (tab === 1 && importData.selectedFile) {
            setFile(importData.selectedFile);
            // Set the form value
            setValue('csvFile', importData.selectedFile);
        }

    }, [tab, importData.selectedFile, setValue]);

    const getData = async () => {
        try {
            setLoading(true);
            setList([]);
            // const res = await axios.get("/api");
            // setList(res.data || fieldMapping);
            setList(fieldMapping);
            setLoading(false);
        } catch (error) {
            toast.error(getError(error));
            setLoading(false);
        }
    };

    const handleFieldMappingChange = (index, value) => {
        console.log(index, value)
        const updatedMappings = [...importData.fieldMappings];
        console.log(updatedMappings)
        updatedMappings[index] = {
            header: list[index]?.header,
            firstRow: list[index]?.firstRow,
            mappedTo: value
        };
        console.log(updatedMappings)

        setImportData(prev => ({
            ...prev,
            fieldMappings: updatedMappings
        }));

        // Clear mapping error for this field when user selects a value
        if (value && mappingErrors[index]) {
            setMappingErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[index];
                return newErrors;
            });
        }
    };

    // Add validation function for field mappings
    const validateFieldMappings = () => {
        const errors = {};
        let hasErrors = false;

        list.forEach((item, index) => {
            const mapping = importData.fieldMappings[index];
            if (!mapping || !mapping.mappedTo) {
                errors[index] = "Please select a mapping for this field";
                hasErrors = true;
            }
        });

        setMappingErrors(errors);
        return !hasErrors;
    };

    const validateCurrentStep = async () => {
        let isValid = true;
        console.log(file)
        switch (tab) {
            case 1:
                isValid = !file ? await trigger('csvFile') : true
                break;
            case 2:
                // Add validation for field mappings
                isValid = validateFieldMappings();
                if (!isValid) {
                    // toast.error("Please select mapping for all fields before proceeding");
                }
                break;
            case 3:
                isValid = await trigger(['listName', 'duplicateHandling']);
                break;
            default:
                isValid = true;
        }
        return isValid;
    };

    const handleNext = async () => {
        const isValid = await validateCurrentStep();
        console.log(isValid, tab)
        if (isValid && tab < 6) {
            // Store file in importData when moving from step 1
            if (tab === 1 && file) {
                setImportData(prev => ({
                    ...prev,
                    selectedFile: file,
                    fileName: file.name
                }));
            }

            if (tab === 3) {
                const formData = getValues();
                setImportData(prev => ({
                    ...prev,
                    listName: formData.listName,
                    tag: formData.tag,
                    duplicateHandling: formData.duplicateHandling
                }));
                // toast.success("List Details Added Successfully");
            }

            setTab(tab + 1);
            setActiveStep(activeStep + 1);
        }
    };

    const handleDone = async () => {
        try {
            setLoading(true);

            const currentFormData = getValues();
            const postData = {
                fileName: importData.fileName || "abc.csv",
                listName: importData.listName || currentFormData.listName,
                assignedTag: importData.tag || currentFormData.tag,
                duplicateHandling: importData.duplicateHandling || currentFormData.duplicateHandling,
                fieldMappings: importData.fieldMappings,
                totalCustomers: importData.validationResults.totalCustomers,
                validCustomers: importData.validationResults.validCustomers,
                duplicatesSkipped: importData.validationResults.duplicatesSkipped,
                importedCustomers: importData.validationResults.importedCustomers,
                importedAt: new Date().toISOString(),
                customerList: "new leads-march 2025"
            };

            await axios.post("/api", postData);
            toast.success("Imported Successfully");
            onClose(2);
        } catch (error) {
            toast.error(getError(error));
            setLoading(false);
        }
    };

    const handleBack = () => {
        if (tab > 1) {
            setTab(tab - 1);
            setActiveStep(activeStep - 1);
        } else if (tab === 1) {
            // Close the modal when on first tab
            onClose(0);
        } else if (onBack) {
            onBack();
        }
    };


    const handleSetFile = (selectedFile) => {
        setFile(selectedFile);
        if (selectedFile) {
            setImportData(prev => ({
                ...prev,
                selectedFile: selectedFile,
                fileName: selectedFile.name
            }));
        }
    };

    return (
        <main>

            {icon && activeStep !== 6 && <div className="flex gap-4 items-center">
                <button type="button" onClick={handleBack}><Image src="/images/arrow-box.svg" alt="arrow" height={30} width={30} unoptimized={true} /></button>
                <div className="text-sm">Import</div>
            </div>}

            <form onSubmit={handleSubmit(() => { })}>
                <div>
                    {!importDone && (
                        <ProgressBar
                            class_="mt-8!"
                            currentStep={activeStep}
                            stepTitle1="Upload File"
                            stepTitle2="Field Mapping"
                            stepTitle3="Add List Details"
                            stepTitle4="Validation & Errors"
                            stepTitle5="Import Confirmation"
                        />
                    )}

                    {tab === 1 && (
                        <div>
                            <FileInput
                                accept=".csv"
                                formProps={{
                                    ...register('csvFile', {
                                        required: true,
                                        validate: (value) => {
                                            if (!value || (value instanceof FileList && value.length === 0)) {
                                                return 'Please select a CSV file';
                                            }
                                            return true;
                                        }
                                    })
                                }}
                                setFile={setFile}
                                selectedFile={file}
                                errors={errors}
                                isRequired={true}
                                label="Upload file"
                                showToast={toast.error}
                            />
                        </div>
                    )}

                    {tab === 2 && (
                        <div>
                            <div className="text-text3 text-sm capitalize">
                                Map your CSV columns to their corresponding fields. Header Row and
                                First Row reflect what's in your CSV file. Use the Mapping dropdown
                                to select which attribute the column is associated with.
                            </div>
                            <div className="w-full border border-border-color mt-8">
                                {loading ? (
                                    <Loading class_="min-h-[300px]!" />
                                ) : list?.length > 0 ? (
                                    <table className="w-full">
                                        <thead>
                                            <tr className="rounded-[20px]!">
                                                <th>
                                                    <TableOrder
                                                        title="Header Row"
                                                        sortBy={sortBy}
                                                        setSortBy={setSortBy}
                                                        field="header-row"
                                                    />
                                                </th>
                                                <th>
                                                    <TableOrder
                                                        title="First Row"
                                                        sortBy={sortBy}
                                                        setSortBy={setSortBy}
                                                        field="first-row"
                                                    />
                                                </th>
                                                <th>
                                                    <TableOrder
                                                        title="Mapping"
                                                        sortBy={sortBy}
                                                        setSortBy={setSortBy}
                                                        field="mapping"
                                                    />
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {list?.map((e, index) => (<tr key={index} className={index === list.length - 1 ? '' : 'border-b border-border-color'}>
                                                <td>{e.header}</td>
                                                <td>{e.firstRow}</td>
                                                <td>
                                                    {/* <CustomSelectBox selectClass_={`border-primary3/10 ${mappingErrors[index] ? 'border-red-500' : ''}`}
                                                            class_="mt-0! w-full!"
                                                            positionClass=""
                                                            onChange={(e) => handleFieldMappingChange(index, e.target.value)}
                                                            defaultOption="Select mapping"
                                                            value={importData.fieldMappings[index]?.mappedTo || ''}>

                                                            <option value="fullName">Full Name</option>
                                                            <option value="phoneNumber">Phone Number</option>
                                                            <option value="email">Email</option>
                                                        </CustomSelectBox>

                                                        {mappingErrors[index] && (
                                                            <div className="text-red-500 text-xs mt-1">
                                                                {mappingErrors[index]}
                                                            </div>
                                                        )} */}
                                                    <SelectForm
                                                        key={index}
                                                        selectClass_={`border-primary3/10 ${mappingErrors[index] ? 'border-red-500' : ''}`}
                                                        class_="mt-0!"
                                                        formProps={{ ...register("mapping" + index, { required: true }) }}
                                                        errors={errors}
                                                        clearErrors={clearErrors}
                                                        setValue={setValue}
                                                        watch={watch}
                                                        onChange={(e) => handleFieldMappingChange(index, e.target.value)}
                                                        defaultOption="Select mapping"
                                                        value={importData.fieldMappings[index]?.mappedTo || ''}
                                                    >
                                                        <option value="fullName">Full Name</option>
                                                        <option value="phoneNumber">Phone Number</option>
                                                        <option value="email">Email</option>
                                                    </SelectForm>
                                                    {mappingErrors[index] && (
                                                        <div className="text-danger text-xs mt-1">
                                                            {mappingErrors[index]}
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="text-center text-2xl text-danger mx-auto py-20">
                                        No Data
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {tab === 3 && (
                        <div className="mt-5">
                            <InputForm
                                label="list name"
                                isRequired={true}
                                formProps={{ ...register("listName", { required: "List name is required" }) }}
                                errors={errors}
                            />

                            <SelectForm
                                label="Tag"
                                selectClass_="py-3.5! px-2.5! focus:border-primary/60!"
                                formProps={{ ...register("tag", { required: false }) }}
                                errors={errors}
                                clearErrors={clearErrors} setValue={setValue} watch={watch}
                            >
                                <option value="high value">High Value</option>
                                <option value="loyal">Loyal</option>
                                <option value="instead of source">Instead of source</option>
                            </SelectForm>

                            <div>
                                <div className="flex gap-2 mt-4">
                                    <div className="text-sm text-secondary font-medium">
                                        Duplicate Handling<span className="text-danger">*</span>
                                    </div>
                                    <button type="button">
                                        <Image
                                            src="/images/info.svg"
                                            alt="info"
                                            height={16}
                                            width={16}
                                            unoptimized={true}
                                        />
                                    </button>
                                </div>

                                <div className="flex gap-4">
                                    <RadioForm
                                        label="Ignore duplicates"
                                        name="duplicateHandling"
                                        value="ignore"
                                        formProps={{ ...register("duplicateHandling", { required: true }) }}
                                        errors={errors}
                                    />
                                    <RadioForm
                                        label="Overwrite existing"
                                        name="duplicateHandling"
                                        value="overwrite"
                                        formProps={{ ...register("duplicateHandling", { required: true }) }}
                                        errors={errors}
                                    />
                                    <RadioForm
                                        label="Allow duplicates"
                                        name="duplicateHandling"
                                        value="allow"
                                        formProps={{ ...register("duplicateHandling", { required: true }) }}
                                        errors={errors}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {tab === 4 && (
                        <div>
                            <div className="border border-border-color rounded-[20px] pt-3">
                                <div className="px-3">
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center gap-2">
                                            <Image
                                                unoptimized={true}
                                                src="/images/warning.svg"
                                                alt="warning"
                                                height={22}
                                                width={22}
                                            />
                                            <div className="text-danger text-sm capitalize">
                                                There is 1 row(s) with errors in your CSV. Please address
                                                these errors and upload the file again.
                                            </div>
                                        </div>
                                        {!isAdmin && <SecondaryButton
                                            title="Download Error Report"
                                            type="button"
                                            onClick={() => { toast.success('Download Successfully') }}
                                            class_="shrink-0! text-xs!"
                                        />}
                                    </div>
                                    <div className="text-danger text-xs capitalize mt-2">
                                        No customers have been added
                                    </div>
                                </div>

                                <div className="bg-danger-light2 rounded-[20px] overflow-hidden mt-3">
                                    <div className="grid grid-cols-3 p-4">
                                        <TableOrder
                                            title="Row"
                                            sortBy={sortBy}
                                            setSortBy={setSortBy}
                                            field="row"
                                        />
                                        <TableOrder
                                            title="First Row"
                                            sortBy={sortBy}
                                            setSortBy={setSortBy}
                                            field="first-row"
                                        />
                                        <TableOrder
                                            title="Mapping"
                                            sortBy={sortBy}
                                            setSortBy={setSortBy}
                                            field="mapping"
                                        />
                                    </div>
                                    <hr className="border-t border-border-color my-3" />
                                    <div className="grid grid-cols-3 px-4 pb-4 gap-y-8">
                                        <TableOrder
                                            title="2"
                                            sortBy={sortBy}
                                            setSortBy={setSortBy}
                                            field="2"
                                        />
                                        <TableOrder
                                            title="First Row"
                                            sortBy={sortBy}
                                            setSortBy={setSortBy}
                                            field="first-row"
                                        />
                                        <TableOrder
                                            title="Mapping"
                                            sortBy={sortBy}
                                            setSortBy={setSortBy}
                                            field="mapping"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {tab === 5 && (
                        <>
                            <div className="flex items-center justify-between w-full">
                                <div className="text-success text-xl font-semibold capitalize">
                                    File validated successfully!
                                </div>
                                <button type="button" className="text-white text-xs font-medium bg-primary p-2 rounded-lg border border-primary cursor-pointer capitalize disabled:pointer-events-none disabled:opacity-50 flex items-center gap-2" onClick={() => { toast.success('Download Successfully') }}>
                                    <Image src="/images/info-circle.svg" alt="info" height={16} width={16} unoptimized={true} />
                                    Download Sample CSV
                                </button>
                            </div>

                            <div className="font-semibold text-xl mb-3 mt-4">
                                Import Summary
                            </div>


                            <div>
                                <div className="flex justify-between text-base">
                                    <div className="text-text3 capitalize">File Name
                                    </div>
                                    <div className="text-secondary font-medium capitalize">Abc.Csv </div>
                                </div>
                                <hr className="my-4 border-t border-border-color" />

                                <div className="flex justify-between text-base">
                                    <div className="text-text3 capitalize">total customers in file
                                    </div>
                                    <div className="text-secondary font-medium capitalize">250</div>
                                </div>
                                <hr className="my-4 border-t border-border-color" />

                                <div className="flex justify-between text-base">
                                    <div className="text-text3 capitalize">valid customers to import
                                    </div>
                                    <div className="text-secondary font-medium capitalize">245</div>
                                </div>
                                <hr className="my-4 border-t border-border-color" />

                                <div className="flex justify-between text-base">
                                    <div className="text-text3 capitalize">duplicates skipped
                                    </div>
                                    <div className="text-secondary font-medium capitalize">03</div>
                                </div>
                                <hr className="my-4 border-t border-border-color" />

                                <div className="flex justify-between text-base">
                                    <div className="text-text3 capitalize">invalid entries
                                    </div>
                                    <button

                                    >02<span className="border-r pr-2 border-border-color"></span><span className="text-primary underline pl-2 cursor-pointer disabled:pointer-events-none capitalize">View Detail</span>
                                    </button>
                                </div>
                                <hr className="my-4 border-t border-border-color" />

                                <div className="flex justify-between text-base">
                                    <div className="text-text3 capitalize">assigned tag
                                    </div>
                                    <div className="text-secondary font-medium capitalize">VIP Customers</div>
                                </div>
                            </div>
                        </>
                    )}

                    {tab === 6 && (
                        <>
                            <div className="font-semibold text-xl my-3">
                                Import Summary
                            </div>
                            <div>
                                <div className="gap-10">

                                    <div>
                                        <div className="flex justify-between">
                                            <div className="text-text3 capitalize">imported customers</div>
                                            <div className="text-secondary font-medium capitalize">254</div>
                                        </div>

                                        <hr className="my-4 border-t border-border-color" />

                                        <div className="flex justify-between">
                                            <div className="text-text3 capitalize">customer list</div>
                                            <div className="text-secondary font-medium capitalize">new leads-march 2025</div>
                                        </div>

                                        <hr className="my-4 border-t border-border-color" />

                                        <div className="flex justify-between">
                                            <div className="text-text3 capitalize">assigned tag</div>
                                            <div className="text-secondary font-medium capitalize">VIP customers</div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    <div className={`grid gap-3 mt-5 ${tab === 6 ? "grid-cols-1" : "grid-cols-2"}`}>
                        {!importDone && (
                            <>
                                <CancelButton title="Cancel" onClick={handleBack} />
                                {tab === 5 ? (
                                    <SecondaryButton
                                        title="Import Customer"
                                        type="button"
                                        onClick={() => {
                                            setTab(6);
                                            setActiveStep(6);
                                            setImportDone(true);
                                        }}
                                    />
                                ) : (
                                    <SecondaryButton
                                        title="Next"
                                        type="button"
                                        disabled={loading}
                                        onClick={handleNext}
                                    />
                                )}
                            </>
                        )}
                        {importDone && (
                            <SecondaryButton
                                title="Done"
                                type="button"
                                onClick={handleDone}
                                class_="w-full!"
                                disabled={loading}
                            />
                        )}
                    </div>
                </div>
            </form>
        </main>
    );
}