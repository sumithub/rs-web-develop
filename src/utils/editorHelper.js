import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import Placeholder from '@tiptap/extension-placeholder'
import TextStyle from '@tiptap/extension-text-style'
import { useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { Extension, Node } from '@tiptap/core'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FontFamily } from '@tiptap/extension-font-family'
import Model from '../components/Models/Model'
import CancelButton from '../components/common/CancelButton'
import SecondaryButton from '../components/common/SecondaryButton'

const ImageEditorModal = ({ isOpen, onClose, imageSrc, onImageComplete }) => {
    const canvasRef = useRef(null);
    const imageRef = useRef(null);
    const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 200, height: 200 });
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [resizeHandle, setResizeHandle] = useState('');
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [imageData, setImageData] = useState({ width: 0, height: 0, naturalWidth: 0, naturalHeight: 0 });
    const [activeTab, setActiveTab] = useState('crop'); // 'crop' or 'resize'

    // Resize states
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
    const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
    const [processedImageSrc, setProcessedImageSrc] = useState('');

    useEffect(() => {
        if (isOpen && imageSrc) {
            const img = document.createElement('img');
            img.onload = () => {
                const canvas = canvasRef.current;
                if (canvas) {
                    const ctx = canvas.getContext('2d');
                    const maxWidth = 500;
                    const maxHeight = 400;

                    let { width, height } = img;
                    if (width > maxWidth || height > maxHeight) {
                        const ratio = Math.min(maxWidth / width, maxHeight / height);
                        width *= ratio;
                        height *= ratio;
                    }

                    canvas.width = width;
                    canvas.height = height;

                    setImageData({
                        width,
                        height,
                        naturalWidth: img.naturalWidth,
                        naturalHeight: img.naturalHeight
                    });

                    setCropArea({
                        x: 0,
                        y: 0,
                        width: Math.min(200, width),
                        height: Math.min(200, height)
                    });

                    // Set resize dimensions
                    setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
                    setOriginalDimensions({ width: img.naturalWidth, height: img.naturalHeight });

                    ctx.drawImage(img, 0, 0, width, height);
                    setProcessedImageSrc(imageSrc);
                }
            };
            img.src = imageSrc;
        }
    }, [isOpen, imageSrc]);

    const drawCropOverlay = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas || activeTab !== 'crop') return;

        const ctx = canvas.getContext('2d');
        const img = imageRef.current;

        if (img && img.complete) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, imageData.width, imageData.height);

            // Draw overlay
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Clear crop area
            ctx.clearRect(cropArea.x, cropArea.y, cropArea.width, cropArea.height);
            ctx.drawImage(img,
                (cropArea.x / imageData.width) * img.naturalWidth,
                (cropArea.y / imageData.height) * img.naturalHeight,
                (cropArea.width / imageData.width) * img.naturalWidth,
                (cropArea.height / imageData.height) * img.naturalHeight,
                cropArea.x, cropArea.y, cropArea.width, cropArea.height
            );

            // Draw crop border
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.strokeRect(cropArea.x, cropArea.y, cropArea.width, cropArea.height);

            // Draw resize handles
            const handleSize = 8;
            ctx.fillStyle = '#fff';
            const handles = [
                { x: cropArea.x - handleSize / 2, y: cropArea.y - handleSize / 2 },
                { x: cropArea.x + cropArea.width - handleSize / 2, y: cropArea.y - handleSize / 2 },
                { x: cropArea.x - handleSize / 2, y: cropArea.y + cropArea.height - handleSize / 2 },
                { x: cropArea.x + cropArea.width - handleSize / 2, y: cropArea.y + cropArea.height - handleSize / 2 },
            ];

            handles.forEach(handle => {
                ctx.fillRect(handle.x, handle.y, handleSize, handleSize);
            });
        }
    }, [cropArea, imageData, activeTab]);

    const drawResizePreview = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas || activeTab !== 'resize') return;

        const ctx = canvas.getContext('2d');
        const img = imageRef.current;

        if (img && img.complete) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Calculate preview dimensions
            const maxWidth = 500;
            const maxHeight = 400;
            let previewWidth = dimensions.width;
            let previewHeight = dimensions.height;

            if (previewWidth > maxWidth || previewHeight > maxHeight) {
                const ratio = Math.min(maxWidth / previewWidth, maxHeight / previewHeight);
                previewWidth *= ratio;
                previewHeight *= ratio;
            }

            // Center the preview
            const x = (canvas.width - previewWidth) / 2;
            const y = (canvas.height - previewHeight) / 2;

            ctx.drawImage(img, x, y, previewWidth, previewHeight);

            // Draw border
            ctx.strokeStyle = '#3b82f6';
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, previewWidth, previewHeight);
        }
    }, [dimensions, activeTab]);

    useEffect(() => {
        if (imageRef.current && imageRef.current.complete) {
            if (activeTab === 'crop') {
                drawCropOverlay();
            } else {
                drawResizePreview();
            }
        }
    }, [drawCropOverlay, drawResizePreview, activeTab]);

    const handleMouseDown = (e) => {
        if (activeTab !== 'crop') return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Check if clicking on resize handles
        const handleSize = 8;
        const handles = [
            { x: cropArea.x - handleSize / 2, y: cropArea.y - handleSize / 2, type: 'nw' },
            { x: cropArea.x + cropArea.width - handleSize / 2, y: cropArea.y - handleSize / 2, type: 'ne' },
            { x: cropArea.x - handleSize / 2, y: cropArea.y + cropArea.height - handleSize / 2, type: 'sw' },
            { x: cropArea.x + cropArea.width - handleSize / 2, y: cropArea.y + cropArea.height - handleSize / 2, type: 'se' },
        ];

        for (const handle of handles) {
            if (x >= handle.x && x <= handle.x + handleSize && y >= handle.y && y <= handle.y + handleSize) {
                setIsResizing(true);
                setResizeHandle(handle.type);
                setDragStart({ x, y });
                return;
            }
        }

        // Check if clicking inside crop area for dragging
        if (x >= cropArea.x && x <= cropArea.x + cropArea.width &&
            y >= cropArea.y && y <= cropArea.y + cropArea.height) {
            setIsDragging(true);
            setDragStart({ x: x - cropArea.x, y: y - cropArea.y });
        }
    };

    const handleMouseMove = (e) => {
        if (activeTab !== 'crop') return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (isDragging) {
            const newX = Math.max(0, Math.min(x - dragStart.x, imageData.width - cropArea.width));
            const newY = Math.max(0, Math.min(y - dragStart.y, imageData.height - cropArea.height));
            setCropArea(prev => ({ ...prev, x: newX, y: newY }));
        } else if (isResizing) {
            const deltaX = x - dragStart.x;
            const deltaY = y - dragStart.y;

            setCropArea(prev => {
                let newCrop = { ...prev };

                switch (resizeHandle) {
                    case 'nw':
                        newCrop.x = Math.max(0, prev.x + deltaX);
                        newCrop.y = Math.max(0, prev.y + deltaY);
                        newCrop.width = Math.max(20, prev.width - deltaX);
                        newCrop.height = Math.max(20, prev.height - deltaY);
                        break;
                    case 'ne':
                        newCrop.y = Math.max(0, prev.y + deltaY);
                        newCrop.width = Math.max(20, Math.min(prev.width + deltaX, imageData.width - prev.x));
                        newCrop.height = Math.max(20, prev.height - deltaY);
                        break;
                    case 'sw':
                        newCrop.x = Math.max(0, prev.x + deltaX);
                        newCrop.width = Math.max(20, prev.width - deltaX);
                        newCrop.height = Math.max(20, Math.min(prev.height + deltaY, imageData.height - prev.y));
                        break;
                    case 'se':
                        newCrop.width = Math.max(20, Math.min(prev.width + deltaX, imageData.width - prev.x));
                        newCrop.height = Math.max(20, Math.min(prev.height + deltaY, imageData.height - prev.y));
                        break;
                }

                return newCrop;
            });

            setDragStart({ x, y });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setIsResizing(false);
        setResizeHandle('');
    };

    const handleWidthChange = (width) => {
        setDimensions(prev => {
            if (maintainAspectRatio) {
                const ratio = originalDimensions.height / originalDimensions.width;
                return { width, height: Math.round(width * ratio) };
            }
            return { ...prev, width };
        });
    };

    const handleHeightChange = (height) => {
        setDimensions(prev => {
            if (maintainAspectRatio) {
                const ratio = originalDimensions.width / originalDimensions.height;
                return { height, width: Math.round(height * ratio) };
            }
            return { ...prev, height };
        });
    };

    const applyCrop = () => {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = imageRef.current;

            if (!img) {
                resolve(processedImageSrc);
                return;
            }

            canvas.width = cropArea.width;
            canvas.height = cropArea.height;

            const scaleX = img.naturalWidth / imageData.width;
            const scaleY = img.naturalHeight / imageData.height;

            ctx.drawImage(
                img,
                cropArea.x * scaleX,
                cropArea.y * scaleY,
                cropArea.width * scaleX,
                cropArea.height * scaleY,
                0, 0,
                cropArea.width,
                cropArea.height
            );

            canvas.toBlob((blob) => {
                const reader = new FileReader();
                reader.onload = () => {
                    resolve(reader.result);
                };
                reader.readAsDataURL(blob);
            });
        });
    };

    const applyResize = (imageSrc) => {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = document.createElement('img');

            img.onload = () => {
                canvas.width = dimensions.width;
                canvas.height = dimensions.height;

                ctx.drawImage(img, 0, 0, dimensions.width, dimensions.height);

                canvas.toBlob((blob) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        resolve(reader.result);
                    };
                    reader.readAsDataURL(blob);
                });
            };

            img.src = imageSrc;
        });
    };

    const handleComplete = async () => {
        let finalImageSrc = processedImageSrc;

        // Apply crop first
        finalImageSrc = await applyCrop();

        // Then apply resize
        finalImageSrc = await applyResize(finalImageSrc);

        onImageComplete(finalImageSrc);
        onClose();
    };

    const resetToOriginal = () => {
        setActiveTab('crop');
        setCropArea({
            x: 0,
            y: 0,
            width: Math.min(200, imageData.width),
            height: Math.min(200, imageData.height)
        });
        setDimensions({ width: originalDimensions.width, height: originalDimensions.height });
    };

    if (!isOpen) return null;

    return (<Model onClose={onClose} title="Edit Image" modalClass='!w-[800px]' >
        <div>
            {/* Tab Navigation */}
            <div className=" space-x-1 mb-4 bg-gray-100 rounded-lg p-1 hidden">
                <button
                    onClick={() => setActiveTab('crop')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'crop'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Crop
                </button>
                <button
                    onClick={() => setActiveTab('resize')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'resize'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Resize
                </button>
            </div>

            <div className="flex gap-6">
                {/* Canvas Preview */}
                <div className="flex-1">
                    <canvas
                        ref={canvasRef}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        className="border border-gray-300 cursor-move max-w-full"
                    />
                    <img
                        ref={imageRef}
                        src={imageSrc}
                        onLoad={() => {
                            if (activeTab === 'crop') {
                                drawCropOverlay();
                            } else {
                                drawResizePreview();
                            }
                        }}
                        className="hidden"
                        alt="Source"
                    />
                </div>

                {/* Controls Panel */}
                <div className="w-80">
                    {activeTab === 'crop' && (
                        <div className="space-y-4">
                            <h4 className="font-medium text-gray-900">Crop Settings</h4>
                            <div className="text-sm text-gray-600">
                                <p>• Drag the crop area to reposition</p>
                                <p>• Drag corner handles to resize</p>
                                {/* <p>• Switch to resize tab to change dimensions</p> */}
                            </div>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <label className="block text-gray-600">X Position</label>
                                    <div className="text-gray-900">{Math.round(cropArea.x)}px</div>
                                </div>
                                <div>
                                    <label className="block text-gray-600">Y Position</label>
                                    <div className="text-gray-900">{Math.round(cropArea.y)}px</div>
                                </div>
                                <div>
                                    <label className="block text-gray-600">Width</label>
                                    <div className="text-gray-900">{Math.round(cropArea.width)}px</div>
                                </div>
                                <div>
                                    <label className="block text-gray-600">Height</label>
                                    <div className="text-gray-900">{Math.round(cropArea.height)}px</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'resize' && (
                        <div className="space-y-4">
                            <h4 className="font-medium text-gray-900">Resize Settings</h4>
                            <div>
                                <label className="block text-sm font-medium mb-1">Width (px)</label>
                                <input
                                    type="number"
                                    value={dimensions.width}
                                    onChange={(e) => handleWidthChange(Number(e.target.value))}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Height (px)</label>
                                <input
                                    type="number"
                                    value={dimensions.height}
                                    onChange={(e) => handleHeightChange(Number(e.target.value))}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="aspectRatio"
                                    checked={maintainAspectRatio}
                                    onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                                    className="rounded"
                                />
                                <label htmlFor="aspectRatio" className="text-sm">Maintain aspect ratio</label>
                            </div>
                            <div className="text-sm text-gray-600">
                                Original: {originalDimensions.width} × {originalDimensions.height}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-3 mt-5">
                <CancelButton title="Reset to Original" onClick={resetToOriginal} class_='custom-button' />
                <SecondaryButton title="Cancel" class_='bg-white! text-primary! hover:text-white! hover:bg-primary! custom-button' onClick={onClose} />
                <SecondaryButton title="Insert Image" onClick={handleComplete} class_='custom-button' />
            </div>
        </div>
    </Model>
    );
};

// Simple Image Node (no toolbar buttons)
const SimpleImage = Node.create({
    name: 'simpleImage',

    group: 'block',

    atom: true,

    addAttributes() {
        return {
            src: {
                default: null,
            },
            alt: {
                default: null,
            },
            title: {
                default: null,
            },
            width: {
                default: null,
            },
            height: {
                default: null,
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'img[src]',
                getAttrs: element => {
                    return {
                        src: element.getAttribute('src'),
                        alt: element.getAttribute('alt'),
                        title: element.getAttribute('title'),
                        width: element.getAttribute('width'),
                        height: element.getAttribute('height'),
                    }
                },
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['img', HTMLAttributes]
    },

    addCommands() {
        return {
            setImage: (options) => ({ commands }) => {
                return commands.insertContent({
                    type: this.name,
                    attrs: options,
                })
            },
        }
    },
});

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
    const [showImageEditor, setShowImageEditor] = useState(false)
    const [currentImageSrc, setCurrentImageSrc] = useState('')
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
                setCurrentImageSrc(e.target.result);
                setShowImageEditor(true);
            }
            reader.readAsDataURL(file)
        }
    }, [editor])

    const handleImageComplete = (finalImageSrc) => {
        editor.chain().focus().setImage({ src: finalImageSrc }).run();
        setShowImageEditor(false);
        setCurrentImageSrc('');
    };

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
            padding: '4px',
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
                    padding: '2px 4px',
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
                <path d="M5.84741 13.7324H11.8474C13.9174 13.7324 15.5974 12.0524 15.5974 9.98242C15.5974 7.91242 13.9174 6.23242 11.8474 6.23242H3.59741" stroke="#ADADAD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinejoin="round" />
                <path d="M5.32259 8.10758L3.40259 6.18758L5.32259 4.26758" stroke="#ADADAD" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
        </button>

        <button className='border-r border-text3'
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={disable || !editor.can().chain().focus().redo().run()}>
            <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.1526 13.7324H7.15259C5.08259 13.7324 3.40259 12.0524 3.40259 9.98242C3.40259 7.91242 5.08259 6.23242 7.15259 6.23242H15.4026" stroke="#ADADAD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinejoin="round" />
                <path d="M13.6775 8.10758L15.5975 6.18758L13.6775 4.26758" stroke="#ADADAD" strokeWidth="1.5" strokeLinejoin="round" />
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
                    <path d="M10.46 4.47469L7.20004 7.73469C6.81504 8.11969 6.18504 8.11969 5.80004 7.73469L2.54004 4.47469" stroke="#ADADAD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinejoin="round" />
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
                    padding: '2px 4px',
                    // border: '1px solid #ccc',
                    // borderRadius: '4px',
                    // backgroundColor: '#fff',
                    cursor: 'pointer'
                }}>
                {getCurrentFontSize()}px

                <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.46 4.47469L7.20004 7.73469C6.81504 8.11969 6.18504 8.11969 5.80004 7.73469L2.54004 4.47469" stroke="#ADADAD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinejoin="round" />
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
                <path d="M3.34668 2.62565C3.34668 1.98398 3.87168 1.45898 4.51335 1.45898H7.50001C9.02835 1.45898 10.2708 2.70148 10.2708 4.22982C10.2708 5.75815 9.02835 7.00065 7.50001 7.00065H3.34668V2.62565Z" stroke="#1F2933" strokeWidth="2" strokeLinejoin="round" />
                <path d="M3.34668 7H8.88835C10.4167 7 11.6592 8.2425 11.6592 9.77083C11.6592 11.2992 10.4167 12.5417 8.88835 12.5417H4.51335C3.87168 12.5417 3.34668 12.0167 3.34668 11.375V7V7Z" stroke="#1F2933" strokeWidth="2" strokeLinejoin="round" />
            </svg>
        </button>

        <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={disable || !editor.can().chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}>
            <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.11157 1.75H11.5074" stroke="#1F2933" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M3.48657 12.25H8.88241" stroke="#1F2933" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M8.8125 1.75L6.1875 12.25" stroke="#1F2933" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>

        </button>

        {/* Underline Button */}
        <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={disable || !editor.can().chain().focus().toggleUnderline().run()}
            className={`${editor.isActive('underline') ? 'is-active' : ''} border-r border-text3`} >
            <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.5 2V6.5C3.5 9.26 5.74 11.5 8.5 11.5C11.26 11.5 13.5 9.26 13.5 6.5V2" stroke="#1F2933" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M2.5 13H12.5" stroke="#1F2933" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
        </button>

        {/* Text Color Dropdown */}
        <div className="text-color-dropdown" style={{ position: 'relative', display: 'inline-block' }}>
            <button
                type="button"
                onClick={() => setShowTextColorDropdown(!showTextColorDropdown)}
                disabled={disable}
                style={{
                    padding: '2px 4px',
                    // border: '1px solid #ccc',
                    // borderRadius: '4px',
                    // backgroundColor: '#fff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px'
                }}
                title="Text Color">
                <svg width="18" height="18" viewBox="0 0 9 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.19602 9.5H0.798295L3.93892 0.772727H5.46023L8.60085 9.5H7.20312L4.7358 2.35795H4.66761L2.19602 9.5ZM2.4304 6.08239H6.96449V7.19034H2.4304V6.08239Z" fill={getCurrentTextColor()} />
                    <path d="M0.5 11.8864H8.89915V12.7045H0.5V11.8864Z" fill={getCurrentTextColor()} />
                </svg>
                <svg width="15" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.46 4.47469L7.20004 7.73469C6.81504 8.11969 6.18504 8.11969 5.80004 7.73469L2.54004 4.47469" stroke="#ADADAD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" />
                </svg>


                {/* <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.5 1L3.5 13H5L6 10H9L10 13H11.5L7.5 1Z" fill={getCurrentTextColor()} />
                    <path d="M6.5 8L7.5 5L8.5 8H6.5Z" fill="#fff" />
                </svg> */}
                {/* <div style={{
                    width: '12px',
                    height: '3px',
                    backgroundColor: getCurrentTextColor(),
                    borderRadius: '1px'
                }} /> */}
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
                    padding: '2px 4px',
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

                <svg width="18" height="18" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.75 12.834H2.25C2.01083 12.834 1.8125 12.6357 1.8125 12.3965C1.8125 12.1573 2.01083 11.959 2.25 11.959H12.75C12.9892 11.959 13.1875 12.1573 13.1875 12.3965C13.1875 12.6357 12.9892 12.834 12.75 12.834Z" fill={getCurrentBackgroundColor()} />
                    <path d="M11.5951 2.02964C10.4634 0.897977 9.35508 0.868811 8.19425 2.02964L7.48842 2.73548C7.43008 2.79381 7.40675 2.88714 7.43008 2.96881C7.87342 4.51464 9.11008 5.75131 10.6559 6.19464C10.6793 6.20048 10.7026 6.20631 10.7259 6.20631C10.7901 6.20631 10.8484 6.18298 10.8951 6.13631L11.5951 5.43048C12.1726 4.85881 12.4526 4.30464 12.4526 3.74464C12.4584 3.16714 12.1784 2.60714 11.5951 2.02964Z" fill={getCurrentBackgroundColor()} />
                    <path d="M9.60586 6.72596C9.43669 6.6443 9.27336 6.56263 9.11586 6.4693C8.98752 6.39346 8.86502 6.3118 8.74252 6.2243C8.64336 6.16013 8.52669 6.0668 8.41586 5.97346C8.40419 5.96763 8.36336 5.93263 8.31669 5.88596C8.12419 5.72263 7.90836 5.51263 7.71586 5.2793C7.69836 5.26763 7.66919 5.2268 7.62836 5.1743C7.57002 5.1043 7.47086 4.98763 7.38336 4.85346C7.31336 4.76596 7.23169 4.63763 7.15586 4.5093C7.06252 4.3518 6.98086 4.1943 6.89919 4.03096C6.79211 3.80152 6.49097 3.73335 6.31192 3.9124L3.03169 7.19263C2.95586 7.26846 2.88586 7.4143 2.86836 7.51346L2.55336 9.74763C2.49502 10.1443 2.60586 10.5176 2.85086 10.7685C3.06086 10.9726 3.35252 11.0835 3.66752 11.0835C3.73752 11.0835 3.80752 11.0776 3.87752 11.066L6.11752 10.751C6.22252 10.7335 6.36836 10.6635 6.43836 10.5876L9.724 7.30198C9.89947 7.12652 9.83354 6.82463 9.60586 6.72596Z" fill={getCurrentBackgroundColor()} />
                </svg>

                <svg width="15" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.46 4.47469L7.20004 7.73469C6.81504 8.11969 6.18504 8.11969 5.80004 7.73469L2.54004 4.47469" stroke="#ADADAD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" />
                </svg>

                {/* <svg width="20" height="20" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 10H12L10 7L8 9L6 6L3 10Z" fill="#1F2933" />
                    <circle cx="5" cy="4" r="1.5" fill="#1F2933" />
                </svg>
                <div style={{
                    width: '12px',
                    height: '3px',
                    backgroundColor: getCurrentBackgroundColor(),
                    borderRadius: '1px'
                }} /> */}
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
            <svg width="18" height="18" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.345 9.81084L11.5191 5.54084C11.1866 4.75918 10.6908 4.31584 10.125 4.28668C9.56496 4.25751 9.02246 4.64834 8.60829 5.39501L7.49996 7.38418C7.26662 7.80418 6.93412 8.05501 6.57246 8.08418C6.20496 8.11918 5.83746 7.92668 5.53996 7.54751L5.41162 7.38418C4.99746 6.86501 4.48412 6.61418 3.95912 6.66668C3.43412 6.71918 2.98496 7.08084 2.68746 7.67001L1.67829 9.68251C1.31662 10.4117 1.35162 11.2575 1.77746 11.9458C2.20329 12.6342 2.94412 13.0483 3.75496 13.0483H11.1983C11.98 13.0483 12.7091 12.6575 13.1408 12.0042C13.5841 11.3508 13.6541 10.5283 13.345 9.81084Z" fill="#1F2933" />
                <path d="M4.5659 4.88865C5.65483 4.88865 6.53757 4.0059 6.53757 2.91698C6.53757 1.82806 5.65483 0.945312 4.5659 0.945312C3.47698 0.945312 2.59424 1.82806 2.59424 2.91698C2.59424 4.0059 3.47698 4.88865 4.5659 4.88865Z" fill="#1F2933" />
            </svg>

        </button>

        {/* Link Button */}
        <button
            type="button"
            onClick={setLink}
            className={`${editor.isActive('link') ? 'is-active' : ''} border-r border-text3`}
            disabled={disable}
        >
            <svg width="18" height="18" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                <path d="M1.5 2.5H13.5" stroke="#1F2933" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M1.5 5.5H9.5" stroke="#1F2933" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M1.5 8.5H11.5" stroke="#1F2933" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M1.5 11.5H7.5" stroke="#1F2933" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
        </button>
        <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
            disabled={disable}
            title="Align Center">
            <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 2.5H13.5" stroke="#1F2933" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M3.5 5.5H11.5" stroke="#1F2933" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M2.5 8.5H12.5" stroke="#1F2933" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M4.5 11.5H10.5" stroke="#1F2933" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
        </button>
        <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
            disabled={disable}
            title="Align Right">
            <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 2.5H13.5" stroke="#1F2933" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M5.5 5.5H13.5" stroke="#1F2933" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M3.5 8.5H13.5" stroke="#1F2933" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M7.5 11.5H13.5" stroke="#1F2933" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
        </button>
        <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
            disabled={disable}
            title="Justify">
            <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 2.5H13.5" stroke="#1F2933" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M1.5 5.5H13.5" stroke="#1F2933" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M1.5 8.5H13.5" stroke="#1F2933" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M1.5 11.5H13.5" stroke="#1F2933" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
        </button>
        <ImageEditorModal
            isOpen={showImageEditor}
            onClose={() => {
                setShowImageEditor(false);
                setCurrentImageSrc('');
            }}
            imageSrc={currentImageSrc}
            onImageComplete={handleImageComplete}
        />
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
    SimpleImage,
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


