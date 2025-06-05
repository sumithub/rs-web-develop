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

export default function ImportCustomer2({ onBack, activeStep, setActiveStep, onClose }) {
    const [sortBy, setSortBy] = useState("");
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tab, setTab] = useState(1);
    const [importDone, setImportDone] = useState(false);

    const [importData, setImportData] = useState({
        fileName: "",
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
        formState: { errors },
    } = useForm();

    const IMPORTSUMMARY = [
        { title: "File name", summary: "abc.csv" },
        { title: "total customers in file", summary: 250 },
        { title: "valid customers to import", summary: 245 },
        { title: "duplicates skipped", summary: "03" },
        { title: "assigned tag", summary: "VIP customers" },
    ];

    const IMPORTSUMMARY1 = [
        { title: "imported customers ", summary: 245 },
        { title: "customer list", summary: "new leads-march 2025" },
        { title: "assigned tag", summary: "VIP customers" },
    ];

    useEffect(() => {
        getData();
    }, [sortBy]);

    const getData = async () => {
        try {
            setLoading(true);
            setList([]);
            const res = await axios.get("/api");
            setList(res.data || fieldMapping);
            setLoading(false);
        } catch (error) {
            toast.error(getError(error));
            setLoading(false);
        }
    };

    const handleFileUpload = (file) => {
        setImportData(prev => ({
            ...prev,
            fileName: file?.name || "",
            csvFile: file
        }));
    };

    const handleFieldMappingChange = (index, value) => {
        const updatedMappings = [...importData.fieldMappings];
        updatedMappings[index] = {
            header: list[index]?.header,
            firstRow: list[index]?.firstRow,
            mappedTo: value
        };

        setImportData(prev => ({
            ...prev,
            fieldMappings: updatedMappings
        }));
    };

    const onSaveListDetails = (formData) => {
        setImportData(prev => ({
            ...prev,
            listName: formData.listName,
            tag: formData.tag,
            duplicateHandling: formData.duplicateHandling
        }));

        toast.success("List Details Added Successfully");
        handleNext();
    };

    const onSubmit = async (formData) => {
        if (tab === 3) {
            onSaveListDetails(formData);
        } else {
            try {
                toast.success("Saved Successfully");
            } catch (error) {
                toast.error(getError(error));
            }
        }
    };

    const handleNext = () => {
        if (tab < 6) {
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
            onClose();
        } catch (error) {
            toast.error(getError(error));
            setLoading(false);
        }
    };

    const handleBack = () => {
        if (tab > 1) {
            setTab(tab - 1);
            setActiveStep(activeStep - 1);
        } else if (onBack) {
            onBack();
        }
    };
    return (
        <main>
            <div>
                {!importDone && (<>
                    <ProgressBar
                        currentStep={activeStep}
                        stepTitle1="Upload File"
                        stepTitle2="Field Mapping"
                        stepTitle3="Add List Details"
                        stepTitle4="Validation & Errors"
                        stepTitle5="Import Confirmation"
                    />
                </>)}

                {tab === 1 && (
                    <FileInput
                        accept=".csv"
                        formProps={{
                            ...register('csvFile', {
                                required: false,
                                onChange: (e) => handleFileUpload(e.target.files[0])
                            })
                        }}
                        errors={errors}
                        isRequired={true}
                        label="Upload file"
                    />
                )}

                {tab === 2 && (
                    <div>
                        <div className="text-text3 text-sm capitalize">
                            Map your CSV columns to their corresponding fields. Header Row and
                            First Row reflect what's in your CSV file. Use the Mapping dropdown
                            to select which attribute the column is associated with.
                        </div>
                        <div className="table-class mt-8">
                            {loading ? (
                                <Loading />
                            ) : list?.length > 0 ? (
                                <table className="w-full">
                                    <thead>
                                        <tr>
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
                                        {list?.map((e, index) => (
                                            <tr key={index}>
                                                <td>{e.header}</td>
                                                <td>{e.firstRow}</td>
                                                <td>
                                                    <SelectForm
                                                        selectClass_="border-primary3/10"
                                                        class_="mt-0!"
                                                        onChange={(e) => handleFieldMappingChange(index, e.target.value)}
                                                    >
                                                        <option value="">Select mapping</option>
                                                        <option value="fullName">Full Name</option>
                                                        <option value="phoneNumber">Phone Number</option>
                                                        <option value="email">Email</option>
                                                    </SelectForm>
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
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
                        <InputForm
                            label="list name"
                            isRequired={true}
                            formProps={{ ...register("listName", { required: true }) }}
                            errors={errors}
                        />

                        <SelectForm
                            label="Tag"
                            selectClass_="py-3.5! px-2.5! focus:border-primary/60!"
                            formProps={{ ...register("tag", { required: false }) }}
                            errors={errors}
                            clearErrors={clearErrors}
                        >
                            <option value="">Select tag</option>
                            <option value="high value">High Value</option>
                            <option value="loyal">Loyal</option>
                            <option value="instead of source">Instead of source</option>
                        </SelectForm>

                        {tab !== 6 && (<div>
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
                                    inputClass='mb-2!'
                                    name="duplicateHandling"
                                    value="ignore"
                                    formProps={{ ...register("duplicateHandling", { required: true }) }}
                                    errors={errors}
                                />
                                <RadioForm
                                    label="Overwrite existing"
                                    inputClass='mb-2!'
                                    name="duplicateHandling"
                                    value="overwrite"
                                    formProps={{ ...register("duplicateHandling", { required: true }) }}
                                    errors={errors}
                                />
                                <RadioForm
                                    label="Allow duplicates"
                                    inputClass='mb-2!'
                                    name="duplicateHandling"
                                    value="allow"
                                    formProps={{ ...register("duplicateHandling", { required: true }) }}
                                    errors={errors}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3 mt-5">
                                <CancelButton title="Cancel" onClick={handleBack} />
                                <SecondaryButton
                                    title="Next"
                                    type="submit"
                                    disabled={loading}
                                />
                            </div>
                        </div>)}
                    </form>
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
                                    <SecondaryButton
                                        title="Download Error Report"
                                        type="button"
                                        onClick={() => { toast.success('Download Successfully') }}
                                        class_="shrink-0! text-xs!"
                                    />
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

                        {IMPORTSUMMARY.map((d, i) => (<div key={i}>
                            <div className="flex justify-between">
                                <div className="text-text3 capitalize">{d.title}</div>
                                <div className="text-secondary font-medium capitalize">{d.summary}</div>
                            </div>
                            <hr className="my-4 border-t border-border-color" />
                        </div>))}
                    </>
                )}

                {tab === 6 && (
                    <>
                        <div className="font-semibold text-xl mb-3">
                            Import Summary
                        </div>
                        <div>
                            <div className="gap-10">
                                {IMPORTSUMMARY1.map((d, i) => (<div key={i}>
                                    <div className="flex justify-between">
                                        <div className="text-text3 capitalize">{d.title}</div>
                                        <div className="text-secondary font-medium capitalize">{d.summary}</div>
                                    </div>
                                    <hr className="my-4 border-t border-border-color" />
                                </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                <div className={`grid gap-3 mt-5 ${tab === 6 ? "grid-cols-1" : "grid-cols-2"}`}>
                    {!importDone && tab !== 3 && (
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
        </main>
    );
}