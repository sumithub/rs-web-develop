'use client'

import { MenuBar, extensions, getTextLength } from '../../utils/editorHelper'
import React, { useState } from 'react'

import CustomSelectBox from './CustomSelectBox'
import { EditorProvider } from '@tiptap/react'
import ImageEditorModal from "../Models/ImageEditorModal";

export default function HtmlEditor({
    type,
    editorClass,
    isRequired = false,
    readOnly = false,
    inlineLabel = false,
    onChange,
    label,
    value,
    setValue,
    formProps,
    errors,
    clearErrors,
    containerClass = "",
    children,
    dynamicFields = false, // For dynamic fields, we can pass the formProps to setValue
    shoeMenu = true,
    limit
}) {
    const [editor, setEditor] = useState(null);

    // const editor = useEditor({
    //     extensions: extensions, // Use the full extensions array instead of just StarterKit
    //     content: value || ""
    // })

    let error = ""
    if (errors)
        error = errors[formProps?.name]?.type
    if (error === "pattern") {
        error = errors[formProps?.name]?.message
    }

    const options = [
        { value: "full_name", label: "Customer Name", type: "sms" },
        { value: "business_phone", label: "Business Phone", type: "sms" },
        { value: "full_name", label: "Customer Full Name", type: "email" },
        { value: "first_name", label: "Customer First Name", type: "email" },
        { value: "business_name", label: "Business Name", type: "email" },
        { value: "direct_feedback", label: "Direct Feedback", type: "email" }
    ];

        const [cropModalOpen, setCropModalOpen] = React.useState(false);
        const [imageToCrop, setImageToCrop] = React.useState(null);
        const [onCropDoneCallback, setOnCropDoneCallback] = React.useState(null);

        React.useEffect(() => {
            function openCropper(event) {
            setImageToCrop(event.detail.src);
            setOnCropDoneCallback(() => event.detail.onCrop);
            setCropModalOpen(true);
            }
            window.addEventListener("open-image-cropper", openCropper);
            return () => window.removeEventListener("open-image-cropper", openCropper);
        }, []);

        const handleCropComplete = (newSrc) => {
            if (onCropDoneCallback) {
            onCropDoneCallback(newSrc);
            }
            setCropModalOpen(false);
        };

        const handleImageUpload = (e) => {
            const file = e.target.files?.[0];
            if (file && editor) {
                insertResizableImage(editor, file);
            }
            };

    return (
        <div className={`laptop:mb-2 mb-3 w-full relative  ${containerClass}`}>
            {(label || inlineLabel) ? (inlineLabel ?
                <label className="text-sm font-medium text-secondary capitalize mb-1">
                    {label}{isRequired && <span className="text-danger">*</span>}
                </label>
                : <label className="text-sm font-medium text-secondary capitalize mb-1">
                    {label}{isRequired && <span className="text-danger">*</span>}
                </label>) : ""}


            <div className={`tiptap border border-border2 rounded-[10px] ${editorClass}`}>
                <EditorProvider
                    // editor={editor}
                    editable={!readOnly}
                    onCreate={({ editor }) => {
                        setEditor(editor)
                    }}
                    onUpdate={({ editor }) => {
                        console.log("Editor content updated:", editor.getHTML());
                        const html = editor.getHTML();
                        if (html && clearErrors) {
                            clearErrors(formProps?.name)
                        }
                        if (onChange) {
                            onChange(html)
                        }
                        if (setValue && formProps) {
                            setValue(formProps.name, html)
                        }
                    }}

                    slotBefore={
                        readOnly ? undefined : (
                            <div>
                                {shoeMenu && <MenuBar editor={editor} />}
                                {children && <div className="ml-4 flex items-center justify-center">{children}</div>}
                                {dynamicFields && <div className="ml-4 flex items-center justify-center">
                                    <CustomSelectBox
                                        class_='mt-5!'
                                        defaultOption="Insert Dynamic Fields"
                                        value={""}
                                        onChange={(e) => {
                                            const selectedValue = e.target.value;
                                            console.log("Selected Value:", selectedValue, editor
                                                .chain()
                                                .focus());
                                            if (!selectedValue || !editor) return;

                                            // Insert `{{selectedValue}}` at current cursor position
                                            editor
                                                .chain()
                                                .focus()
                                                .insertContent(`{{${selectedValue}}}`)
                                                .run();
                                        }}
                                    >
                                        {options.filter(e => e.type === type).map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </CustomSelectBox>
                                </div>}
                            </div>
                        )
                    }

                    slotAfter={!limit ? undefined : <div className="text-[12px] text-right text-secondary mt-1 p-4">{getTextLength(editor.getHTML())}/{limit}</div>}
                    extensions={[...extensions,]}
                    content={value || ""}
                // slotBefore={readOnly ? undefined : <div className=''><MenuBar /></div>}
                // extensions={extensions}
                // content={value || ""}
                />
                <ImageEditorModal
                    isOpen={cropModalOpen}
                    imageSrc={imageToCrop}
                    onClose={() => setCropModalOpen(false)}
                    onImageComplete={handleCropComplete}
      />
            </div>
            {error && <div className="capitalize text-xs font-medium text-danger mt-1">{error}</div>}
        </div>
    )
}