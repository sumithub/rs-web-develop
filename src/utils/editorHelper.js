import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import Placeholder from '@tiptap/extension-placeholder'
import TextStyle from '@tiptap/extension-text-style'
import { useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { Extension } from '@tiptap/core'
import { useCallback, useEffect, useState } from 'react'

// Custom FontSize extension
const FontSize = Extension.create({
    name: 'fontSize',

    addOptions() {
        return {
            types: ['textStyle'],
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    fontSize: {
                        default: null,
                        parseHTML: element => element.style.fontSize.replace(/['"]+/g, ''),
                        renderHTML: attributes => {
                            if (!attributes.fontSize) {
                                return {}
                            }
                            return {
                                style: `font-size: ${attributes.fontSize}`,
                            }
                        },
                    },
                },
            },
        ]
    },

    addCommands() {
        return {
            setFontSize: fontSize => ({ chain }) => {
                return chain()
                    .setMark('textStyle', { fontSize })
                    .run()
            },
            unsetFontSize: () => ({ chain }) => {
                return chain()
                    .setMark('textStyle', { fontSize: null })
                    .removeEmptyTextStyle()
                    .run()
            },
        }
    },
})

export const MenuBar = ({ disable }) => {
    const { editor } = useCurrentEditor()
    const [showFontSizeDropdown, setShowFontSizeDropdown] = useState(false)

    const fontSizes = [8, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 60]

    if (!editor) {
        return null
    }

    const getCurrentFontSize = () => {
        const fontSize = editor.getAttributes('textStyle').fontSize
        return fontSize ? parseInt(fontSize.replace('px', '')) : 16
    }

    const setFontSize = (size) => {
        editor.chain().focus().setFontSize(`${size}px`).run()
        setShowFontSizeDropdown(false)
    }

    const applyColoredHighlight = (textColor, bgColor) => {
        editor.chain().focus().toggleHighlight({ color: bgColor }).run()
        setTimeout(() => {
            editor.chain().focus().setColor(textColor).run()
        }, 10)
    }

    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)

        // cancelled
        if (url === null) {
            return
        }

        // empty
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
            return
        }

        // update link
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }, [editor])


    const handleImageFile = useCallback((file) => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.onload = (e) => {
                editor.chain().focus().setImage({ src: e.target.result }).run()
            }
            reader.readAsDataURL(file)
        }
    }, [editor])

    const addImageFromFile = useCallback(() => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.onchange = (event) => {
            const file = event.target.files[0]
            if (file) {
                handleImageFile(file)
            }
        }
        input.click()
    }, [editor, handleImageFile])

    // Set up drag and drop functionality
    useEffect(() => {
        if (!editor) return

        const editorElement = editor.view.dom

        const handleDragOver = (e) => {
            e.preventDefault()
            e.stopPropagation()
            editorElement.classList.add('drag-over')
        }

        const handleDragLeave = (e) => {
            e.preventDefault()
            e.stopPropagation()
            editorElement.classList.remove('drag-over')
        }

        const handleDrop = (e) => {
            e.preventDefault()
            e.stopPropagation()
            editorElement.classList.remove('drag-over')

            const files = Array.from(e.dataTransfer.files)
            const imageFiles = files.filter(file => file.type.startsWith('image/'))

            if (imageFiles.length > 0) {
                // Handle multiple images
                imageFiles.forEach(file => {
                    handleImageFile(file)
                })
            }
        }

        editorElement.addEventListener('dragover', handleDragOver)
        editorElement.addEventListener('dragleave', handleDragLeave)
        editorElement.addEventListener('drop', handleDrop)

        return () => {
            editorElement.removeEventListener('dragover', handleDragOver)
            editorElement.removeEventListener('dragleave', handleDragLeave)
            editorElement.removeEventListener('drop', handleDrop)
        }
    }, [editor, handleImageFile])

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.font-size-dropdown')) {
                setShowFontSizeDropdown(false)
            }
        }

        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [])

    return (<div className="button-group">
        <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={disable || !editor.can().chain().focus().undo().run()}>
            Undo
        </button>
        <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={disable || !editor.can().chain().focus().redo().run()}>
            redo
        </button>

        {/* Font Size Dropdown */}
        <div className="font-size-dropdown" style={{ position: 'relative', display: 'inline-block' }}>
            <button
                type="button"
                onClick={() => setShowFontSizeDropdown(!showFontSizeDropdown)}
                disabled={disable}
                style={{
                    minWidth: '50px',
                    padding: '4px 8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    backgroundColor: '#fff',
                    cursor: 'pointer'
                }}>
                {getCurrentFontSize()}px
            </button>
            {showFontSizeDropdown && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: '0',
                    backgroundColor: '#fff',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    zIndex: 1000,
                    minWidth: '80px',
                    maxHeight: '200px',
                    overflowY: 'auto'
                }}>
                    {fontSizes.map(size => (
                        <button
                            key={size}
                            type="button"
                            onClick={() => setFontSize(size)}
                            style={{
                                display: 'block',
                                width: '100%',
                                padding: '6px 12px',
                                border: 'none',
                                backgroundColor: getCurrentFontSize() === size ? '#e3f2fd' : 'transparent',
                                cursor: 'pointer',
                                textAlign: 'left',
                                fontSize: '14px'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = getCurrentFontSize() === size ? '#e3f2fd' : 'transparent'}>
                            {size}px
                        </button>
                    ))}
                </div>
            )}
        </div>

        <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={disable || !editor.can().chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is-active' : ''}>
            B
        </button>
        <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={disable || !editor.can().chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}>
            I
        </button>
        <button
            type="button"
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive('paragraph') ? 'is-active' : ''}
            disabled={disable}>
            P
        </button>
        <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
            disabled={disable}>
            H1
        </button>
        <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
            disabled={disable}>
            H2
        </button>
        <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
            disabled={disable}>
            H3
        </button>
        <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
            disabled={disable}>
            Bullet list
        </button>
        <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'is-active' : ''}
            disabled={disable}>
            Number list
        </button>
        <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'is-active' : ''}
            disabled={disable}>
            quote
        </button>

        {/* Link Button */}
        <button
            type="button"
            onClick={setLink}
            className={editor.isActive('link') ? 'is-active' : ''}
            disabled={disable}
        >
            🔗 Link
        </button>

        {/* Image from File Button */}
        <button
            type="button"
            onClick={addImageFromFile}
            disabled={disable}
        >
            📁 Upload Image
        </button>

        {/* Color Highlight Buttons */}
        <button
            type="button"
            onClick={() => {
                editor.chain().focus().setColor('#171717').run()
                editor.chain().focus().toggleHighlight({ color: '#FFFFFF' }).run()
            }}
            className={`${editor.isActive('highlight', { color: '#FFFFFF' }) ? 'is-active' : ''}`}
            disabled={disable}>
            A
        </button>
        <button
            type="button"
            onClick={() => {
                applyColoredHighlight(editor.isActive('highlight', { color: '#dcfce7' }) ? "#171717" : " #008236", "#dcfce7")
            }}
            className={`bg-green-100! text-success! ${editor.isActive('highlight', { color: '#dcfce7' }) ? 'is-active' : ''}`}
            disabled={disable}>
            A
        </button>
        <button
            type="button"
            onClick={() => {
                applyColoredHighlight(editor.isActive('highlight', { color: '#ffe2e2' }) ? "#171717" : "#c10007", "#ffe2e2")
            }}
            className={`bg-red-100! text-danger! ${editor.isActive('highlight', { color: '#ffe2e2' }) ? 'is-active' : ''}`}
            disabled={disable}>
            A
        </button>
        <button
            type="button"
            onClick={() => {
                applyColoredHighlight(editor.isActive('highlight', { color: '#dff2fe' }) ? "#171717" : "#0069a8", "#dff2fe")
            }}
            className={`bg-sky-100! text-sky-700! ${editor.isActive('highlight', { color: '#dff2fe' }) ? 'is-active' : ''}`}
            disabled={disable}>
            A
        </button>
        <button
            type="button"
            onClick={() => {
                applyColoredHighlight(editor.isActive('highlight', { color: '#fef9c2' }) ? "#171717" : "#a65f00", "#fef9c2")
            }}
            className={`bg-yellow-100! text-yellow-700! ${editor.isActive('highlight', { color: '#fef9c2' }) ? 'is-active' : ''}`}
            disabled={disable}>
            A
        </button>
    </div >
    )
}

export const extensions = [
    FontSize,
    Highlight.configure({
        multicolor: true,
    }),
    Link.configure({
        linkOnPaste: true,
        openOnClick: false, // Prevents auto-opening links in editor
        autolink: true, // Automatically detects links
        HTMLAttributes: {
            class: 'custom-link',
        },
    }),
    Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
            class: 'custom-image',
        },
    }),
    Placeholder.configure({ placeholder: 'Start typing here...', }),
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false,
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false,
        },
    }),
]