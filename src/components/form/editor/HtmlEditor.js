"use client"
import isHotkey from 'is-hotkey'
import React, { useCallback, useMemo } from 'react'
import {
    Editor,
    Element as SlateElement,
    Transforms,
    createEditor,
} from 'slate'
import { withHistory } from 'slate-history'
import { Editable, Slate, useSlate, withReact } from 'slate-react'
import { Button, Icon, Toolbar } from './Tools'

const HOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code',
}
const LIST_TYPES = ['numbered-list', 'bulleted-list']
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']
const RichTextExample = ({ children, value, onChange }) => {
    const renderElement = useCallback(props => <Element {...props} />, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])
    const editor = useMemo(() => withHistory(withReact(createEditor())), [])
    return (<div className='border border-[#F4F4F4] rounded-lg mt-[15px] w-full'>
        <Slate editor={editor}
            initialValue={initialValue2}
            value={value || []}
            onChange={value => {
                onChange(value)
            }}
        >
            <div className="bg-dark rounded-tr-lg rounded-tl-lg">
                <Toolbar >
                    <MarkButton format="bold" icon={<svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.34668 2.62565C3.34668 1.98398 3.87168 1.45898 4.51335 1.45898H7.50001C9.02835 1.45898 10.2708 2.70148 10.2708 4.22982C10.2708 5.75815 9.02835 7.00065 7.50001 7.00065H3.34668V2.62565Z" stroke="#1F2933" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3.34668 7H8.88835C10.4167 7 11.6592 8.2425 11.6592 9.77083C11.6592 11.2992 10.4167 12.5417 8.88835 12.5417H4.51335C3.87168 12.5417 3.34668 12.0167 3.34668 11.375V7V7Z" stroke="#1F2933" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    } />
                    <MarkButton format="italic" icon={<svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.11157 1.75H11.5074" stroke="#1F2933" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3.48657 12.25H8.88241" stroke="#1F2933" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8.8125 1.75L6.1875 12.25" stroke="#1F2933" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    } />
                    <MarkButton format="underline" icon={<svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.41675 12.25H11.5834" stroke="#1F2933" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3.41675 1.75V5.83333C3.41675 8.09083 5.24258 9.91667 7.50008 9.91667C9.75758 9.91667 11.5834 8.09083 11.5834 5.83333V1.75" stroke="#1F2933" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    } />
                    {/* <MarkButton format="code" icon="code" />
                <BlockButton format="heading-one" icon="looks_one" />
                <BlockButton format="heading-two" icon="looks_two" />
                <BlockButton format="block-quote" icon="format_quote" />
                <BlockButton format="numbered-list" icon="format_list_numbered" />
                <BlockButton format="bulleted-list" icon="format_list_bulleted" /> */}
                    <BlockButton format="left" icon={<svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.75 3.0625H2.25C2.01083 3.0625 1.8125 2.86417 1.8125 2.625C1.8125 2.38583 2.01083 2.1875 2.25 2.1875H12.75C12.9892 2.1875 13.1875 2.38583 13.1875 2.625C13.1875 2.86417 12.9892 3.0625 12.75 3.0625Z" fill="#1F2933" />
                        <path d="M7.77417 5.97852H2.25C2.01083 5.97852 1.8125 5.78018 1.8125 5.54102C1.8125 5.30185 2.01083 5.10352 2.25 5.10352H7.77417C8.01333 5.10352 8.21167 5.30185 8.21167 5.54102C8.21167 5.78018 8.01917 5.97852 7.77417 5.97852Z" fill="#1F2933" />
                        <path d="M12.75 8.89648H2.25C2.01083 8.89648 1.8125 8.69815 1.8125 8.45898C1.8125 8.21982 2.01083 8.02148 2.25 8.02148H12.75C12.9892 8.02148 13.1875 8.21982 13.1875 8.45898C13.1875 8.69815 12.9892 8.89648 12.75 8.89648Z" fill="#1F2933" />
                        <path d="M7.77417 11.8125H2.25C2.01083 11.8125 1.8125 11.6142 1.8125 11.375C1.8125 11.1358 2.01083 10.9375 2.25 10.9375H7.77417C8.01333 10.9375 8.21167 11.1358 8.21167 11.375C8.21167 11.6142 8.01917 11.8125 7.77417 11.8125Z" fill="#1F2933" />
                    </svg>
                    } />
                    <BlockButton format="center" icon={<svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.75 10.9375H2.25C2.01083 10.9375 1.8125 11.1358 1.8125 11.375C1.8125 11.6142 2.01083 11.8125 2.25 11.8125H12.75C12.9892 11.8125 13.1875 11.6142 13.1875 11.375C13.1875 11.1358 12.9892 10.9375 12.75 10.9375Z" fill="#1F2933" />
                        <path d="M10.2651 8.02148H4.73511C4.49594 8.02148 4.29761 8.21982 4.29761 8.45898C4.29761 8.69815 4.49594 8.89648 4.73511 8.89648H10.2593C10.4984 8.89648 10.6968 8.69815 10.6968 8.45898C10.6968 8.21982 10.5043 8.02148 10.2651 8.02148Z" fill="#1F2933" />
                        <path d="M12.75 5.10352H2.25C2.01083 5.10352 1.8125 5.30185 1.8125 5.54102C1.8125 5.78018 2.01083 5.97852 2.25 5.97852H12.75C12.9892 5.97852 13.1875 5.78018 13.1875 5.54102C13.1875 5.30185 12.9892 5.10352 12.75 5.10352Z" fill="#1F2933" />
                        <path d="M10.2651 2.1875H4.73511C4.49594 2.1875 4.29761 2.38583 4.29761 2.625C4.29761 2.86417 4.49594 3.0625 4.73511 3.0625H10.2593C10.4984 3.0625 10.6968 2.86417 10.6968 2.625C10.6968 2.38583 10.5043 2.1875 10.2651 2.1875Z" fill="#1F2933" />
                    </svg>
                    } />
                    <BlockButton format="right" icon={<svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.75 3.0625H2.25C2.01083 3.0625 1.8125 2.86417 1.8125 2.625C1.8125 2.38583 2.01083 2.1875 2.25 2.1875H12.75C12.9892 2.1875 13.1875 2.38583 13.1875 2.625C13.1875 2.86417 12.9892 3.0625 12.75 3.0625Z" fill="#1F2933" />
                        <path d="M12.75 5.97852H7.22583C6.98666 5.97852 6.78833 5.78018 6.78833 5.54102C6.78833 5.30185 6.98666 5.10352 7.22583 5.10352H12.75C12.9892 5.10352 13.1875 5.30185 13.1875 5.54102C13.1875 5.78018 12.9892 5.97852 12.75 5.97852Z" fill="#1F2933" />
                        <path d="M12.75 8.89648H2.25C2.01083 8.89648 1.8125 8.69815 1.8125 8.45898C1.8125 8.21982 2.01083 8.02148 2.25 8.02148H12.75C12.9892 8.02148 13.1875 8.21982 13.1875 8.45898C13.1875 8.69815 12.9892 8.89648 12.75 8.89648Z" fill="#1F2933" />
                        <path d="M12.75 11.8125H7.22583C6.98666 11.8125 6.78833 11.6142 6.78833 11.375C6.78833 11.1358 6.98666 10.9375 7.22583 10.9375H12.75C12.9892 10.9375 13.1875 11.1358 13.1875 11.375C13.1875 11.6142 12.9892 11.8125 12.75 11.8125Z" fill="#1F2933" />
                    </svg>
                    } />
                    <BlockButton format="justify" icon={<svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.75 3.0625H2.25C2.01083 3.0625 1.8125 2.86417 1.8125 2.625C1.8125 2.38583 2.01083 2.1875 2.25 2.1875H12.75C12.9892 2.1875 13.1875 2.38583 13.1875 2.625C13.1875 2.86417 12.9892 3.0625 12.75 3.0625Z" fill="#1F2933" />
                        <path d="M12.75 5.97852H2.25C2.01083 5.97852 1.8125 5.78018 1.8125 5.54102C1.8125 5.30185 2.01083 5.10352 2.25 5.10352H12.75C12.9892 5.10352 13.1875 5.30185 13.1875 5.54102C13.1875 5.78018 12.9892 5.97852 12.75 5.97852Z" fill="#1F2933" />
                        <path d="M12.75 8.89648H2.25C2.01083 8.89648 1.8125 8.69815 1.8125 8.45898C1.8125 8.21982 2.01083 8.02148 2.25 8.02148H12.75C12.9892 8.02148 13.1875 8.21982 13.1875 8.45898C13.1875 8.69815 12.9892 8.89648 12.75 8.89648Z" fill="#1F2933" />
                        <path d="M12.75 11.8125H2.25C2.01083 11.8125 1.8125 11.6142 1.8125 11.375C1.8125 11.1358 2.01083 10.9375 2.25 10.9375H12.75C12.9892 10.9375 13.1875 11.1358 13.1875 11.375C13.1875 11.6142 12.9892 11.8125 12.75 11.8125Z" fill="#1F2933" />
                    </svg>
                    } />
                </Toolbar>
            </div>

            <div className=' py-3 px-2.5'>
                <Editable className='outline-none'
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    placeholder="Enter some rich text…"
                    spellCheck
                    autoFocus

                    onKeyDown={event => {
                        for (const hotkey in HOTKEYS) {
                            if (isHotkey(hotkey, event)) {
                                event.preventDefault()
                                const mark = HOTKEYS[hotkey]
                                toggleMark(editor, mark)
                            }
                        }
                    }}
                /> </div>
            <div className='py-3 px-2.5'>
                {children}
            </div>
        </Slate>
    </div>
    )
}
const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(
        editor,
        format,
        isAlignType(format) ? 'align' : 'type'
    )
    const isList = isListType(format)
    Transforms.unwrapNodes(editor, {
        match: n =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            isListType(n.type) &&
            !isAlignType(format),
        split: true,
    })
    let newProperties
    if (isAlignType(format)) {
        newProperties = {
            align: isActive ? undefined : format,
        }
    } else {
        newProperties = {
            type: isActive ? 'paragraph' : isList ? 'list-item' : format,
        }
    }
    Transforms.setNodes(editor, newProperties)
    if (!isActive && isList) {
        const block = { type: format, children: [] }
        Transforms.wrapNodes(editor, block)
    }
}
const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format)
    if (isActive) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true)
    }
}
const isBlockActive = (editor, format, blockType = 'type') => {
    const { selection } = editor
    if (!selection) return false
    const [match] = Array.from(
        Editor.nodes(editor, {
            at: Editor.unhangRange(editor, selection),
            match: n => {
                if (!Editor.isEditor(n) && SlateElement.isElement(n)) {
                    if (blockType === 'align' && isAlignElement(n)) {
                        return n.align === format
                    }
                    return n.type === format
                }
                return false
            },
        })
    )
    return !!match
}
const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
}
const Element = ({ attributes, children, element }) => {
    const style = {}
    if (isAlignElement(element)) {
        style.textAlign = element.align
    }
    switch (element.type) {
        case 'block-quote':
            return (
                <blockquote style={style} {...attributes}>
                    {children}
                </blockquote>
            )
        case 'bulleted-list':
            return (
                <ul className='list list-disc' style={style} {...attributes}>
                    {children}
                </ul>
            )
        case 'heading-one':
            return (
                <h1 style={style} {...attributes}>
                    {children}
                </h1>
            )
        case 'heading-two':
            return (
                <h2 style={style} {...attributes}>
                    {children}
                </h2>
            )
        case 'list-item':
            return (
                <li style={style} {...attributes}>
                    {children}
                </li>
            )
        case 'numbered-list':
            return (
                <ol className='list list-decimal' style={style} {...attributes}>
                    {children}
                </ol>
            )
        default:
            return (
                <p style={style} {...attributes}>
                    {children}
                </p>
            )
    }
}
const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>
    }
    if (leaf.code) {
        children = <code>{children}</code>
    }
    if (leaf.italic) {
        children = <em>{children}</em>
    }
    if (leaf.underline) {
        children = <u>{children}</u>
    }
    return <span {...attributes}>{children}</span>
}
const BlockButton = ({ format, icon }) => {
    const editor = useSlate()
    return (
        <Button
            active={isBlockActive(
                editor,
                format,
                isAlignType(format) ? 'align' : 'type'
            )}
            onMouseDown={event => {
                event.preventDefault()
                toggleBlock(editor, format)
            }}
        >
            <Icon>{icon}</Icon>
        </Button>
    )
}
const MarkButton = ({ format, icon }) => {
    const editor = useSlate()
    return (
        <Button
            active={isMarkActive(editor, format)}
            onMouseDown={event => {
                event.preventDefault()
                toggleMark(editor, format)
            }}
        >
            <Icon>{icon}</Icon>
        </Button>
    )
}
const isAlignType = format => {
    return TEXT_ALIGN_TYPES.includes(format)
}
const isListType = format => {
    return LIST_TYPES.includes(format)
}
const isAlignElement = element => {
    return 'align' in element
}

const initialValue2 = [
    {
        type: 'paragraph',
        children: [
            { text: ' ' },
        ]
    }
]

const initialValue = [
    {
        type: 'paragraph',
        children: [
            { text: 'This is editable ' },
            { text: 'rich', bold: true },
            { text: ' text, ' },
            { text: 'much', italic: true },
            { text: ' better than a ' },
            { text: '<textarea>', code: true },
            { text: '!' },
        ],
    },
    {
        type: 'paragraph',
        children: [
            {
                text: "Since it's rich text, you can do things like turn a selection of text ",
            },
            { text: 'bold', bold: true },
            {
                text: ', or add a semantically rendered block quote in the middle of the page, like this:',
            },
        ],
    },
    {
        type: 'block-quote',
        children: [{ text: 'A wise quote.' }],
    },
    {
        type: 'paragraph',
        align: 'center',
        children: [{ text: 'Try it out for yourself!' }],
    },
]
export default RichTextExample