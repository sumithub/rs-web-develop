import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import Placeholder from '@tiptap/extension-placeholder'
import TextStyle from '@tiptap/extension-text-style'
import { useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { Extension } from '@tiptap/core'
import { useCallback, useEffect, useState } from 'react'
import { FontFamily } from '@tiptap/extension-font-family'

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
    const [showFontFamilyDropdown, setShowFontFamilyDropdown] = useState(false)
    const [showTextColorDropdown, setShowTextColorDropdown] = useState(false)
    const [showBackgroundColorDropdown, setShowBackgroundColorDropdown] = useState(false)

    const fontSizes = [8, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 60]

    const fontFamilies = [
        { name: 'Inter', value: null },
        { name: 'Arial', value: 'Arial, sans-serif' },
        { name: 'Helvetica', value: 'Helvetica, Arial, sans-serif' },
        { name: 'Times New Roman', value: 'Times New Roman, Times, serif' },
        { name: 'Georgia', value: 'Georgia, serif' },
        { name: 'Courier New', value: 'Courier New, Courier, monospace' },
    ]

    // Predefined colors
    const colors = [
        '#000000', '#333333', '#666666', '#999999', '#CCCCCC', '#FFFFFF',
        '#FF0000', '#FF6600', '#FFCC00', '#00FF00', '#0066FF', '#6600FF',
        '#FF3366', '#FF9933', '#FFFF00', '#33FF66', '#3366FF', '#9933FF',
        '#990000', '#CC3300', '#996600', '#006600', '#003366', '#330066',
        '#FF99CC', '#FFCC99', '#FFFF99', '#99FFCC', '#99CCFF', '#CC99FF'
    ]

    if (!editor) {
        return null
    }

    const getCurrentFontSize = () => {
        const fontSize = editor.getAttributes('textStyle').fontSize
        return fontSize ? parseInt(fontSize.replace('px', '')) : 16
    }

    const getCurrentFontFamily = () => {
        const fontFamily = editor.getAttributes('textStyle').fontFamily
        const currentFont = fontFamilies.find(font => font.value === fontFamily)
        return currentFont ? currentFont.name : 'Inter'
    }

    const getCurrentTextColor = () => {
        const color = editor.getAttributes('textStyle').color
        return color || '#000000'
    }

    const getCurrentBackgroundColor = () => {
        const highlight = editor.getAttributes('highlight')
        return highlight.color || '#FFFF00'
    }

    const setFontSize = (size) => {
        editor.chain().focus().setFontSize(`${size}px`).run()
        setShowFontSizeDropdown(false)
    }

    const setFontFamily = (fontFamily) => {
        if (fontFamily) {
            editor.chain().focus().setMark('textStyle', { fontFamily }).run()
        } else {
            editor.chain().focus().unsetMark('textStyle').run()
        }
        setShowFontFamilyDropdown(false)
    }

    const setTextColor = (color) => {
        editor.chain().focus().setColor(color).run()
        setShowTextColorDropdown(false)
    }

    const setBackgroundColor = (color) => {
        editor.chain().focus().toggleHighlight({ color }).run()
        setShowBackgroundColorDropdown(false)
    }

    const removeTextColor = () => {
        editor.chain().focus().unsetColor().run()
        setShowTextColorDropdown(false)
    }

    const removeBackgroundColor = () => {
        editor.chain().focus().unsetHighlight().run()
        setShowBackgroundColorDropdown(false)
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

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.font-size-dropdown')) {
                setShowFontSizeDropdown(false)
            }
            if (!event.target.closest('.font-family-dropdown')) {
                setShowFontFamilyDropdown(false)
            }
            if (!event.target.closest('.text-color-dropdown')) {
                setShowTextColorDropdown(false)
            }
            if (!event.target.closest('.background-color-dropdown')) {
                setShowBackgroundColorDropdown(false)
            }
        }

        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [])

    const ColorPicker = ({ colors, onColorSelect, onRemoveColor, currentColor, title }) => (
        <div style={{
            position: 'absolute',
            top: '100%',
            left: '0',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            zIndex: 1000,
            padding: '8px',
            minWidth: '200px'
        }}>
            <div style={{ marginBottom: '8px', fontSize: '12px', fontWeight: 'bold', color: '#666' }}>
                {title}
            </div>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 1fr)',
                gap: '4px',
                marginBottom: '8px'
            }}>
                {colors.map(color => (
                    <button
                        key={color}
                        type="button"
                        onClick={() => onColorSelect(color)}
                        style={{
                            width: '24px',
                            height: '24px',
                            backgroundColor: color,
                            border: currentColor === color ? '2px solid #000' : '1px solid #ccc',
                            borderRadius: '3px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        title={color}
                    >
                        {color === '#FFFFFF' && <div style={{ width: '2px', height: '12px', backgroundColor: '#ccc' }} />}
                    </button>
                ))}
            </div>
            <button
                type="button"
                onClick={onRemoveColor}
                style={{
                    width: '100%',
                    padding: '4px 8px',
                    border: '1px solid #ccc',
                    borderRadius: '3px',
                    backgroundColor: '#f5f5f5',
                    cursor: 'pointer',
                    fontSize: '12px'
                }}
            >
                Remove {title.toLowerCase()}
            </button>
        </div>
    )
    return (<div className="button-group bg-[#F8F8F8] p-2 border-b border-border2 rounded-tr-[10px] rounded-tl-[10px]">
        <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={disable || !editor.can().chain().focus().undo().run()}>

            <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.84741 13.7324H11.8474C13.9174 13.7324 15.5974 12.0524 15.5974 9.98242C15.5974 7.91242 13.9174 6.23242 11.8474 6.23242H3.59741" stroke="#ADADAD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinejoin="round" stroke-linejoin="round" />
                <path d="M5.32259 8.10758L3.40259 6.18758L5.32259 4.26758" stroke="#ADADAD" strokeWidth="1.5" strokeLinejoin="round" stroke-linejoin="round" />
            </svg>

        </button>
        <button className='border-r border-text3'
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={disable || !editor.can().chain().focus().redo().run()}>
            <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.1526 13.7324H7.15259C5.08259 13.7324 3.40259 12.0524 3.40259 9.98242C3.40259 7.91242 5.08259 6.23242 7.15259 6.23242H15.4026" stroke="#ADADAD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinejoin="round" stroke-linejoin="round" />
                <path d="M13.6775 8.10758L15.5975 6.18758L13.6775 4.26758" stroke="#ADADAD" strokeWidth="1.5" strokeLinejoin="round" stroke-linejoin="round" />
            </svg>
        </button>

        {/* Font Family Dropdown */}
        <div className="font-family-dropdown" style={{ position: 'relative', display: 'inline-block' }}>
            <button className='border-r border-text3'
                type="button"
                onClick={() => setShowFontFamilyDropdown(!showFontFamilyDropdown)}
                disabled={disable}
                style={{
                    // minWidth: '120px',
                    // padding: '4px 8px',
                    // border: '1px solid #ccc',
                    // borderRadius: '4px',
                    // backgroundColor: '#fff',
                    cursor: 'pointer',
                    textAlign: 'left'
                }}>
                {getCurrentFontFamily()}

                <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ float: 'right', marginTop: '2px' }}>
                    <path d="M10.46 4.47469L7.20004 7.73469C6.81504 8.11969 6.18504 8.11969 5.80004 7.73469L2.54004 4.47469" stroke="#ADADAD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinejoin="round" stroke-linejoin="round" />
                </svg>
            </button>
            {showFontFamilyDropdown && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: '0',
                    backgroundColor: '#fff',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    zIndex: 1000,
                    minWidth: '180px',
                    maxHeight: '300px',
                    overflowY: 'auto'
                }}>
                    {fontFamilies.map(font => (
                        <button
                            key={font.name}
                            type="button"
                            onClick={() => setFontFamily(font.value)}
                            style={{
                                display: 'block',
                                width: '100%',
                                padding: '8px 12px',
                                border: 'none',
                                backgroundColor: getCurrentFontFamily() === font.name ? '#e3f2fd' : 'transparent',
                                cursor: 'pointer',
                                textAlign: 'left',
                                fontSize: '14px',
                                fontFamily: font.value || 'inherit'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = getCurrentFontFamily() === font.name ? '#e3f2fd' : 'transparent'}>
                            {font.name}
                        </button>
                    ))}
                </div>
            )}
        </div>

        {/* Font Size Dropdown */}
        <div className="font-size-dropdown" style={{ position: 'relative', display: 'inline-block' }}>
            <button className='border-r border-text3'
                type="button"
                onClick={() => setShowFontSizeDropdown(!showFontSizeDropdown)}
                disabled={disable}
                style={{
                    minWidth: '20px',
                    padding: '4px 8px',
                    // border: '1px solid #ccc',
                    // borderRadius: '4px',
                    // backgroundColor: '#fff',
                    cursor: 'pointer'
                }}>
                {getCurrentFontSize()}px

                <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.46 4.47469L7.20004 7.73469C6.81504 8.11969 6.18504 8.11969 5.80004 7.73469L2.54004 4.47469" stroke="#ADADAD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinejoin="round" stroke-linejoin="round" />
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
                <path d="M3.34668 2.62565C3.34668 1.98398 3.87168 1.45898 4.51335 1.45898H7.50001C9.02835 1.45898 10.2708 2.70148 10.2708 4.22982C10.2708 5.75815 9.02835 7.00065 7.50001 7.00065H3.34668V2.62565Z" stroke="#1F2933" strokeWidth="2" strokeLinejoin="round" stroke-linejoin="round" />
                <path d="M3.34668 7H8.88835C10.4167 7 11.6592 8.2425 11.6592 9.77083C11.6592 11.2992 10.4167 12.5417 8.88835 12.5417H4.51335C3.87168 12.5417 3.34668 12.0167 3.34668 11.375V7V7Z" stroke="#1F2933" strokeWidth="2" strokeLinejoin="round" stroke-linejoin="round" />
            </svg>
        </button>

        <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={disable || !editor.can().chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}>
            <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.11157 1.75H11.5074" stroke="#1F2933" strokeWidth="1.5" strokeLinejoin="round" stroke-linejoin="round" />
                <path d="M3.48657 12.25H8.88241" stroke="#1F2933" strokeWidth="1.5" strokeLinejoin="round" stroke-linejoin="round" />
                <path d="M8.8125 1.75L6.1875 12.25" stroke="#1F2933" strokeWidth="1.5" strokeLinejoin="round" stroke-linejoin="round" />
            </svg>

        </button>

        {/* Underline Button */}
        <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={disable || !editor.can().chain().focus().toggleUnderline().run()}
            className={`${editor.isActive('underline') ? 'is-active' : ''} border-r border-text3`} >
            <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.5 2V6.5C3.5 9.26 5.74 11.5 8.5 11.5C11.26 11.5 13.5 9.26 13.5 6.5V2" stroke="#1F2933" strokeWidth="1.5" strokeLinejoin="round" stroke-linejoin="round" />
                <path d="M2.5 13H12.5" stroke="#1F2933" strokeWidth="1.5" strokeLinejoin="round" stroke-linejoin="round" />
            </svg>
        </button>


        {/* Text Color Dropdown */}
        <div className="text-color-dropdown" style={{ position: 'relative', display: 'inline-block' }}>
            <button
                type="button"
                onClick={() => setShowTextColorDropdown(!showTextColorDropdown)}
                disabled={disable}
                style={{
                    padding: '4px 8px',
                    // border: '1px solid #ccc',
                    borderRadius: '4px',
                    // backgroundColor: '#fff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px'
                }}
                title="Text Color">
                <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.5 1L3.5 13H5L6 10H9L10 13H11.5L7.5 1Z" fill={getCurrentTextColor()} />
                    <path d="M6.5 8L7.5 5L8.5 8H6.5Z" fill="#fff" />
                </svg>
                <div style={{
                    width: '12px',
                    height: '3px',
                    backgroundColor: getCurrentTextColor(),
                    borderRadius: '1px'
                }} />
            </button>
            {showTextColorDropdown && (
                <ColorPicker
                    colors={colors}
                    onColorSelect={setTextColor}
                    onRemoveColor={removeTextColor}
                    currentColor={getCurrentTextColor()}
                    title="Text Color"
                />
            )}
        </div>

        {/* Background Color Dropdown */}
        <div className="background-color-dropdown" style={{ position: 'relative', display: 'inline-block' }}>
            <button
                type="button"
                onClick={() => setShowBackgroundColorDropdown(!showBackgroundColorDropdown)}
                disabled={disable}
                style={{
                    padding: '4px 8px',
                    // border: '1px solid #ccc',
                    // borderRadius: '4px',
                    // backgroundColor: '#fff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px'
                }}
                className={`${editor.isActive('highlight') ? 'is-active' : ''} border-r border-text3`}
                title="Background Color">
                <svg width="20" height="20" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 10H12L10 7L8 9L6 6L3 10Z" fill="#1F2933" />
                    <circle cx="5" cy="4" r="1.5" fill="#1F2933" />
                </svg>
                <div style={{
                    width: '12px',
                    height: '3px',
                    backgroundColor: getCurrentBackgroundColor(),
                    borderRadius: '1px'
                }} />
            </button>
            {showBackgroundColorDropdown && (
                <ColorPicker
                    colors={colors}
                    onColorSelect={setBackgroundColor}
                    onRemoveColor={removeBackgroundColor}
                    currentColor={getCurrentBackgroundColor()}
                    title="Background Color"
                />
            )}
        </div>

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

        {/* Link Button */}
        <button
            type="button"
            onClick={setLink}
            className={`${editor.isActive('link') ? 'is-active' : ''} border-r border-text3 mr-1`}
            disabled={disable}
        >
            <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.125 10.6452H9.24414C9.00497 10.6452 8.80664 10.4468 8.80664 10.2077C8.80664 9.96851 9.00497 9.77018 9.24414 9.77018H10.125C11.6533 9.77018 12.8958 8.52768 12.8958 6.99935C12.8958 5.47102 11.6533 4.22852 10.125 4.22852H9.24997C9.01081 4.22852 8.81247 4.03018 8.81247 3.79102C8.81247 3.55185 9.00497 3.35352 9.24997 3.35352H10.125C12.1375 3.35352 13.7708 4.98685 13.7708 6.99935C13.7708 9.01185 12.1375 10.6452 10.125 10.6452Z" fill="#1F2933" />
                <path d="M5.75008 10.6452H4.87508C2.86258 10.6452 1.22925 9.01185 1.22925 6.99935C1.22925 4.98685 2.86258 3.35352 4.87508 3.35352H5.75008C5.98925 3.35352 6.18758 3.55185 6.18758 3.79102C6.18758 4.03018 5.98925 4.22852 5.75008 4.22852H4.87508C3.34675 4.22852 2.10425 5.47102 2.10425 6.99935C2.10425 8.52768 3.34675 9.77018 4.87508 9.77018H5.75008C5.98925 9.77018 6.18758 9.96851 6.18758 10.2077C6.18758 10.4468 5.98925 10.6452 5.75008 10.6452Z" fill="#1F2933" />
                <path d="M9.83341 7.4375H5.16675C4.92758 7.4375 4.72925 7.23917 4.72925 7C4.72925 6.76083 4.92758 6.5625 5.16675 6.5625H9.83341C10.0726 6.5625 10.2709 6.76083 10.2709 7C10.2709 7.23917 10.0726 7.4375 9.83341 7.4375Z" fill="#1F2933" />
            </svg>

        </button>



        {/* Alignment Buttons */}
        <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
            disabled={disable}
            title="Align Left">
            <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 2.5H13.5" stroke="#1F2933" strokeWidth="1.5" strokeLinejoin="round" stroke-linejoin="round" />
                <path d="M1.5 5.5H9.5" stroke="#1F2933" strokeWidth="1.5" strokeLinejoin="round" stroke-linejoin="round" />
                <path d="M1.5 8.5H11.5" stroke="#1F2933" strokeWidth="1.5" strokeLinejoin="round" stroke-linejoin="round" />
                <path d="M1.5 11.5H7.5" stroke="#1F2933" strokeWidth="1.5" strokeLinejoin="round" stroke-linejoin="round" />
            </svg>
        </button>
        <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
            disabled={disable}
            title="Align Center">
            <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 2.5H13.5" stroke="#1F2933" strokeWidth="1.5" strokeLinejoin="round" stroke-linejoin="round" />
                <path d="M3.5 5.5H11.5" stroke="#1F2933" strokeWidth="1.5" strokeLinejoin="round" stroke-linejoin="round" />
                <path d="M2.5 8.5H12.5" stroke="#1F2933" strokeWidth="1.5" strokeLinejoin="round" stroke-linejoin="round" />
                <path d="M4.5 11.5H10.5" stroke="#1F2933" strokeWidth="1.5" strokeLinejoin="round" stroke-linejoin="round" />
            </svg>
        </button>
        <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
            disabled={disable}
            title="Align Right">
            <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 2.5H13.5" stroke="#1F2933" strokeWidth="1.5" strokeLinejoin="round" stroke-linejoin="round" />
                <path d="M5.5 5.5H13.5" stroke="#1F2933" strokeWidth="1.5" strokeLinejoin="round" stroke-linejoin="round" />
                <path d="M3.5 8.5H13.5" stroke="#1F2933" strokeWidth="1.5" strokeLinejoin="round" stroke-linejoin="round" />
                <path d="M7.5 11.5H13.5" stroke="#1F2933" strokeWidth="1.5" strokeLinejoin="round" stroke-linejoin="round" />
            </svg>
        </button>
        <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
            disabled={disable}
            title="Justify">
            <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 2.5H13.5" stroke="#1F2933" strokeWidth="1.5" strokeLinejoin="round" stroke-linejoin="round" />
                <path d="M1.5 5.5H13.5" stroke="#1F2933" strokeWidth="1.5" strokeLinejoin="round" stroke-linejoin="round" />
                <path d="M1.5 8.5H13.5" stroke="#1F2933" strokeWidth="1.5" strokeLinejoin="round" stroke-linejoin="round" />
                <path d="M1.5 11.5H13.5" stroke="#1F2933" strokeWidth="1.5" strokeLinejoin="round" stroke-linejoin="round" />
            </svg>
        </button>
        {/* Color Highlight Buttons */}
        {/* <button
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
        </button> */}
    </div >
    )
}

export const extensions = [
    FontSize,
    FontFamily.configure({
        types: ['textStyle'], // This tells the extension which marks can have font family
    }),
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
    TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
        defaultAlignment: 'left',
    }),
    Underline.configure({
        HTMLAttributes: {
            class: 'custom-underline',
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