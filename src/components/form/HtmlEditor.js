'use client'
import { useEditor } from '@tiptap/react'
import { EditorProvider } from '@tiptap/react'
import React from 'react'
import { extensions, MenuBar } from '../../utils/editorHelper'

export default function HtmlEditor({
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
    children
}) {

    const editor = useEditor({
        extensions: extensions, // Use the full extensions array instead of just StarterKit
        content: value || ""
    })

    let error = ""
    if (errors)
        error = errors[formProps?.name]?.type
    if (error === "pattern") {
        error = errors[formProps?.name]?.message
    }

    return (
        <div className={`laptop:mb-2 mb-3 w-full relative  ${containerClass}`}>
            {(label || inlineLabel) ? (inlineLabel ?
                <label className="text-sm font-medium text-secondary capitalize mb-1">
                    {label}{isRequired && <span className="text-danger">*</span>}
                </label>
                : <label className="text-sm font-medium text-secondary capitalize mb-1">
                    {label}{isRequired && <span className="text-danger">*</span>}
                </label>) : ""}


            <div className='tiptap border border-border2 rounded-[10px]'>
                <EditorProvider
                    editor={editor}
                    editable={!readOnly}
                    onUpdate={({ editor }) => {
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
                                <MenuBar editor={editor} />
                                {children && <div className="ml-4 flex items-center justify-center">{children}</div>}
                            </div>
                        )
                    }
                    extensions={extensions}
                    content={value || ""}
                // slotBefore={readOnly ? undefined : <div className=''><MenuBar /></div>}
                // extensions={extensions}
                // content={value || ""}
                />
            </div>
            {error && <div className="capitalize text-xs font-medium text-danger mt-1">{error}</div>}
        </div>
    )
}