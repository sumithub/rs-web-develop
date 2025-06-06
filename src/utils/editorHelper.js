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

            <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.84741 13.7324H11.8474C13.9174 13.7324 15.5974 12.0524 15.5974 9.98242C15.5974 7.91242 13.9174 6.23242 11.8474 6.23242H3.59741" stroke="#ADADAD" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M5.32259 8.10758L3.40259 6.18758L5.32259 4.26758" stroke="#ADADAD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

        </button>
        <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={disable || !editor.can().chain().focus().redo().run()}>
            <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.1526 13.7324H7.15259C5.08259 13.7324 3.40259 12.0524 3.40259 9.98242C3.40259 7.91242 5.08259 6.23242 7.15259 6.23242H15.4026" stroke="#ADADAD" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M13.6775 8.10758L15.5975 6.18758L13.6775 4.26758" stroke="#ADADAD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

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

                <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.46 4.47469L7.20004 7.73469C6.81504 8.11969 6.18504 8.11969 5.80004 7.73469L2.54004 4.47469" stroke="#ADADAD" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                </svg>


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
            <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.34668 2.62565C3.34668 1.98398 3.87168 1.45898 4.51335 1.45898H7.50001C9.02835 1.45898 10.2708 2.70148 10.2708 4.22982C10.2708 5.75815 9.02835 7.00065 7.50001 7.00065H3.34668V2.62565Z" stroke="#1F2933" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M3.34668 7H8.88835C10.4167 7 11.6592 8.2425 11.6592 9.77083C11.6592 11.2992 10.4167 12.5417 8.88835 12.5417H4.51335C3.87168 12.5417 3.34668 12.0167 3.34668 11.375V7V7Z" stroke="#1F2933" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

        </button>
        <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={disable || !editor.can().chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}>
            <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.11157 1.75H11.5074" stroke="#1F2933" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M3.48657 12.25H8.88241" stroke="#1F2933" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M8.8125 1.75L6.1875 12.25" stroke="#1F2933" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

        </button>
        <button
            type="button"
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive('paragraph') ? 'is-active' : ''}
            disabled={disable}>
            <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.75 13.2715H2.25C2.01083 13.2715 1.8125 13.0732 1.8125 12.834C1.8125 12.5948 2.01083 12.3965 2.25 12.3965H12.75C12.9892 12.3965 13.1875 12.5948 13.1875 12.834C13.1875 13.0732 12.9892 13.2715 12.75 13.2715Z" fill="#1F2933" />
                <path d="M12.75 1.60352H2.25C2.01083 1.60352 1.8125 1.40518 1.8125 1.16602C1.8125 0.926849 2.01083 0.728516 2.25 0.728516H12.75C12.9892 0.728516 13.1875 0.926849 13.1875 1.16602C13.1875 1.40518 12.9892 1.60352 12.75 1.60352Z" fill="#1F2933" />
                <path d="M8.84163 8.95909L7.93746 9.86325V3.90742L8.84163 4.81159C8.92913 4.89909 9.03996 4.93992 9.15079 4.93992C9.26163 4.93992 9.37246 4.89909 9.45996 4.81159C9.62913 4.64242 9.62913 4.36242 9.45996 4.19326L7.80913 2.54242C7.64579 2.37909 7.35413 2.37909 7.19079 2.54242L5.53996 4.19326C5.37079 4.36242 5.37079 4.64242 5.53996 4.81159C5.70913 4.98076 5.98913 4.98076 6.15829 4.81159L7.06246 3.90742V9.86325L6.15829 8.95909C5.98913 8.78992 5.70913 8.78992 5.53996 8.95909C5.37079 9.12825 5.37079 9.40825 5.53996 9.57742L7.19079 11.2283C7.27246 11.3099 7.38329 11.3566 7.49996 11.3566C7.61663 11.3566 7.72746 11.3099 7.80913 11.2283L9.45996 9.57742C9.62913 9.40825 9.62913 9.12825 9.45996 8.95909C9.29079 8.78992 9.01079 8.78992 8.84163 8.95909Z" fill="#1F2933" />
            </svg>
        </button>

        {/* <button
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
        </button> */}

        {/* Link Button */}
        <button
            type="button"
            onClick={setLink}
            className={editor.isActive('link') ? 'is-active' : ''}
            disabled={disable}
        >
            <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.125 10.6452H9.24414C9.00497 10.6452 8.80664 10.4468 8.80664 10.2077C8.80664 9.96851 9.00497 9.77018 9.24414 9.77018H10.125C11.6533 9.77018 12.8958 8.52768 12.8958 6.99935C12.8958 5.47102 11.6533 4.22852 10.125 4.22852H9.24997C9.01081 4.22852 8.81247 4.03018 8.81247 3.79102C8.81247 3.55185 9.00497 3.35352 9.24997 3.35352H10.125C12.1375 3.35352 13.7708 4.98685 13.7708 6.99935C13.7708 9.01185 12.1375 10.6452 10.125 10.6452Z" fill="#1F2933" />
                <path d="M5.75008 10.6452H4.87508C2.86258 10.6452 1.22925 9.01185 1.22925 6.99935C1.22925 4.98685 2.86258 3.35352 4.87508 3.35352H5.75008C5.98925 3.35352 6.18758 3.55185 6.18758 3.79102C6.18758 4.03018 5.98925 4.22852 5.75008 4.22852H4.87508C3.34675 4.22852 2.10425 5.47102 2.10425 6.99935C2.10425 8.52768 3.34675 9.77018 4.87508 9.77018H5.75008C5.98925 9.77018 6.18758 9.96851 6.18758 10.2077C6.18758 10.4468 5.98925 10.6452 5.75008 10.6452Z" fill="#1F2933" />
                <path d="M9.83341 7.4375H5.16675C4.92758 7.4375 4.72925 7.23917 4.72925 7C4.72925 6.76083 4.92758 6.5625 5.16675 6.5625H9.83341C10.0726 6.5625 10.2709 6.76083 10.2709 7C10.2709 7.23917 10.0726 7.4375 9.83341 7.4375Z" fill="#1F2933" />
            </svg>

        </button>

        {/* Image from File Button */}
        <button
            type="button"
            onClick={addImageFromFile}
            disabled={disable}
        >
            <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.345 9.81084L11.5191 5.54084C11.1866 4.75918 10.6908 4.31584 10.125 4.28668C9.56496 4.25751 9.02246 4.64834 8.60829 5.39501L7.49996 7.38418C7.26662 7.80418 6.93412 8.05501 6.57246 8.08418C6.20496 8.11918 5.83746 7.92668 5.53996 7.54751L5.41162 7.38418C4.99746 6.86501 4.48412 6.61418 3.95912 6.66668C3.43412 6.71918 2.98496 7.08084 2.68746 7.67001L1.67829 9.68251C1.31662 10.4117 1.35162 11.2575 1.77746 11.9458C2.20329 12.6342 2.94412 13.0483 3.75496 13.0483H11.1983C11.98 13.0483 12.7091 12.6575 13.1408 12.0042C13.5841 11.3508 13.6541 10.5283 13.345 9.81084Z" fill="#1F2933" />
                <path d="M4.5659 4.88865C5.65483 4.88865 6.53757 4.0059 6.53757 2.91698C6.53757 1.82806 5.65483 0.945312 4.5659 0.945312C3.47698 0.945312 2.59424 1.82806 2.59424 2.91698C2.59424 4.0059 3.47698 4.88865 4.5659 4.88865Z" fill="#1F2933" />
            </svg>

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