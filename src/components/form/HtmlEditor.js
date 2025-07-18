'use client'
import { EditorProvider } from '@tiptap/react'
import React, { useState } from 'react'
import { extensions, getTextLength, MenuBar } from '../../utils/editorHelper'
import CustomSelectBox from './CustomSelectBox'

export default function HtmlEditor({
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
    limit,
    type
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

    let options = []
    if (type === "sms") options = [
        { value: "full_name", label: "Customer Name", type: "sms" },
        { value: "business_phone", label: "Business Phone", type: "sms" },
    ]
    else if (type === "email" || type == "reviewResponseTemplate") options = [
        { value: "full_name", label: "Customer Full Name", type: "email" },
        { value: "first_name", label: "Customer First Name", type: "email" },
        { value: "business_name", label: "Business Name", type: "email" },
        { value: "direct_feedback", label: "Direct Feedback", type: "email" },
    ]
    // else if (type === "reviewResponseTemplate") options = [
    //     { value: "Suggest Response", label: "Suggest Response", type: "reviewResponseTemplate" },
    //     { value: "Hope To see you again", label: "Hope To see you again", type: "reviewResponseTemplate" },
    //     { value: "thanks for sharing!", label: "thanks for sharing!", type: "reviewResponseTemplate" },
    //     { value: "Appreciate the kind feedback", label: "Appreciate the kind feedback", type: "reviewResponseTemplate" }
    // ];

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
                        const html = editor.getHTML();
                        if (html && clearErrors) {
                            clearErrors(formProps?.name)
                        }
                        if (limit && getTextLength(html) > limit) {
                            editor.chain().clearContent().run();
                            editor.chain().focus().insertContent(value).run();
                            return
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
                                            // if (type === "sms" || type === "email")
                                            editor
                                                .chain()
                                                .focus()
                                                .insertContent(`{{${selectedValue}}}`)
                                                .run();
                                            // else if (type === "reviewResponseTemplate")
                                            //     editor
                                            //         .chain()
                                            //         .focus()
                                            //         .insertContent(selectedValue)
                                            //         .run();

                                        }}
                                    >
                                        {options.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </CustomSelectBox>
                                </div>}
                            </div>
                        )
                    }

                    slotAfter={<div>
                        {!limit ? null : <div className="text-[12px] text-right text-secondary mt-1 p-4">{getTextLength(editor.getHTML())}/{limit}</div>}
                    </div>
                    }
                    extensions={[...extensions,]}
                    content={value || ""}
                // slotBefore={readOnly ? undefined : <div className=''><MenuBar /></div>}
                // extensions={extensions}
                // content={value || ""}
                />
            </div>
            {error && <div className="text-xs pt-[3px] capitalize text-danger mt-1">{error}</div>}
        </div >
    )
}