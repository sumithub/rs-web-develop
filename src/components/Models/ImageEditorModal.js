import { useCallback, useEffect, useRef, useState } from 'react'
import SecondaryButton from '../common/SecondaryButton'
import Model from './Model';
import CancelButton from '../common/CancelButton';

export default function ImageEditorModal({ isOpen, onClose, imageSrc, onImageComplete }) {
    const canvasRef = useRef(null);
    const imageRef = useRef(null);
    const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 200, height: 200 });
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [resizeHandle, setResizeHandle] = useState('');
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [imageData, setImageData] = useState({ width: 0, height: 0, naturalWidth: 0, naturalHeight: 0 });
    const [canvasCursor, setCanvasCursor] = useState('default');
    const [originalImage, setOriginalImage] = useState(null);

    // Function to redraw the canvas with crop overlay
    const redrawCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas || !originalImage) return;

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the image
        ctx.drawImage(originalImage, 0, 0, imageData.width, imageData.height);

        // Draw semi-transparent overlay over entire image
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Clear the crop area (make it fully visible)
        ctx.clearRect(cropArea.x, cropArea.y, cropArea.width, cropArea.height);

        // Redraw the image in the crop area only
        ctx.drawImage(
            originalImage,
            cropArea.x * (originalImage.naturalWidth / imageData.width),
            cropArea.y * (originalImage.naturalHeight / imageData.height),
            cropArea.width * (originalImage.naturalWidth / imageData.width),
            cropArea.height * (originalImage.naturalHeight / imageData.height),
            cropArea.x,
            cropArea.y,
            cropArea.width,
            cropArea.height
        );

        // Draw crop area border
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2;
        ctx.strokeRect(cropArea.x, cropArea.y, cropArea.width, cropArea.height);

        // Draw resize handles
        const handleSize = 8;
        const handles = [
            { x: cropArea.x - handleSize / 2, y: cropArea.y - handleSize / 2 },
            { x: cropArea.x + cropArea.width - handleSize / 2, y: cropArea.y - handleSize / 2 },
            { x: cropArea.x - handleSize / 2, y: cropArea.y + cropArea.height - handleSize / 2 },
            { x: cropArea.x + cropArea.width - handleSize / 2, y: cropArea.y + cropArea.height - handleSize / 2 },
        ];

        ctx.fillStyle = '#3b82f6';
        handles.forEach(handle => {
            ctx.fillRect(handle.x, handle.y, handleSize, handleSize);
        });
    }, [cropArea, imageData, originalImage]);

    useEffect(() => {
        if (isOpen && imageSrc) {
            const img = new Image();
            img.onload = () => {
                const canvas = canvasRef.current;
                if (!canvas) return;

                const containerWidth = 750; // Full width within the modal
                let { width, height } = img;

                // Scale to fit container width while maintaining aspect ratio
                if (width > containerWidth) {
                    const ratio = containerWidth / width;
                    width = containerWidth;
                    height = height * ratio;
                }

                canvas.width = width;
                canvas.height = height;

                setImageData({
                    width,
                    height,
                    naturalWidth: img.naturalWidth,
                    naturalHeight: img.naturalHeight,
                });

                const initialCropSize = Math.min(200, width * 0.8, height * 0.8);
                setCropArea({
                    x: (width - initialCropSize) / 2,
                    y: (height - initialCropSize) / 2,
                    width: initialCropSize,
                    height: initialCropSize,
                });

                setOriginalImage(img);
            };
            img.src = imageSrc;
        }
    }, [isOpen, imageSrc]);

    // Redraw canvas whenever crop area changes
    useEffect(() => {
        redrawCanvas();
    }, [redrawCanvas]);

    const constrainCropArea = (area) => {
        return {
            x: Math.max(0, Math.min(area.x, imageData.width - area.width)),
            y: Math.max(0, Math.min(area.y, imageData.height - area.height)),
            width: Math.max(20, Math.min(area.width, imageData.width - area.x)),
            height: Math.max(20, Math.min(area.height, imageData.height - area.y)),
        };
    };

    const handleMouseMove = (e) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        const handleSize = 8;
        const handles = [
            { x: cropArea.x - handleSize / 2, y: cropArea.y - handleSize / 2, type: 'nw' },
            { x: cropArea.x + cropArea.width - handleSize / 2, y: cropArea.y - handleSize / 2, type: 'ne' },
            { x: cropArea.x - handleSize / 2, y: cropArea.y + cropArea.height - handleSize / 2, type: 'sw' },
            { x: cropArea.x + cropArea.width - handleSize / 2, y: cropArea.y + cropArea.height - handleSize / 2, type: 'se' },
        ];

        let hoveringHandle = false;
        for (const handle of handles) {
            if (
                x >= handle.x && x <= handle.x + handleSize &&
                y >= handle.y && y <= handle.y + handleSize
            ) {
                hoveringHandle = true;
                setCanvasCursor('nwse-resize');
                break;
            }
        }

        if (!hoveringHandle) {
            if (
                x >= cropArea.x && x <= cropArea.x + cropArea.width &&
                y >= cropArea.y && y <= cropArea.y + cropArea.height
            ) {
                setCanvasCursor('move');
            } else {
                setCanvasCursor('default');
            }
        }

        if (isDragging) {
            const newArea = {
                ...cropArea,
                x: x - dragStart.x,
                y: y - dragStart.y
            };
            setCropArea(constrainCropArea(newArea));
        } else if (isResizing) {
            setCropArea(prev => {
                let updated = { ...prev };
                switch (resizeHandle) {
                    case 'nw':
                        const newWidth = Math.max(20, prev.x + prev.width - x);
                        const newHeight = Math.max(20, prev.y + prev.height - y);
                        updated.x = prev.x + prev.width - newWidth;
                        updated.y = prev.y + prev.height - newHeight;
                        updated.width = newWidth;
                        updated.height = newHeight;
                        break;
                    case 'ne':
                        const neHeight = Math.max(20, prev.y + prev.height - y);
                        updated.y = prev.y + prev.height - neHeight;
                        updated.width = Math.max(20, x - prev.x);
                        updated.height = neHeight;
                        break;
                    case 'sw':
                        const swWidth = Math.max(20, prev.x + prev.width - x);
                        updated.x = prev.x + prev.width - swWidth;
                        updated.width = swWidth;
                        updated.height = Math.max(20, y - prev.y);
                        break;
                    case 'se':
                        updated.width = Math.max(20, x - prev.x);
                        updated.height = Math.max(20, y - prev.y);
                        break;
                }
                return constrainCropArea(updated);
            });
        }
    };

    const handleMouseDown = (e) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        const handleSize = 8;
        const handles = [
            { x: cropArea.x - handleSize / 2, y: cropArea.y - handleSize / 2, type: 'nw' },
            { x: cropArea.x + cropArea.width - handleSize / 2, y: cropArea.y - handleSize / 2, type: 'ne' },
            { x: cropArea.x - handleSize / 2, y: cropArea.y + cropArea.height - handleSize / 2, type: 'sw' },
            { x: cropArea.x + cropArea.width - handleSize / 2, y: cropArea.y + cropArea.height - handleSize / 2, type: 'se' },
        ];

        for (const handle of handles) {
            if (
                x >= handle.x && x <= handle.x + handleSize &&
                y >= handle.y && y <= handle.y + handleSize
            ) {
                setIsResizing(true);
                setResizeHandle(handle.type);
                setDragStart({ x, y });
                return;
            }
        }

        if (
            x >= cropArea.x && x <= cropArea.x + cropArea.width &&
            y >= cropArea.y && y <= cropArea.y + cropArea.height
        ) {
            setIsDragging(true);
            setDragStart({ x: x - cropArea.x, y: y - cropArea.y });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setIsResizing(false);
        setResizeHandle('');
    };

    const handleCropComplete = () => {
        if (!originalImage) return;

        // Create a new canvas for the cropped image
        const cropCanvas = document.createElement('canvas');
        const cropCtx = cropCanvas.getContext('2d');

        // Calculate the actual crop area in the original image coordinates
        const scaleX = originalImage.naturalWidth / imageData.width;
        const scaleY = originalImage.naturalHeight / imageData.height;

        const actualCropArea = {
            x: cropArea.x * scaleX,
            y: cropArea.y * scaleY,
            width: cropArea.width * scaleX,
            height: cropArea.height * scaleY
        };

        cropCanvas.width = actualCropArea.width;
        cropCanvas.height = actualCropArea.height;

        // Draw the cropped portion
        cropCtx.drawImage(
            originalImage,
            actualCropArea.x,
            actualCropArea.y,
            actualCropArea.width,
            actualCropArea.height,
            0,
            0,
            actualCropArea.width,
            actualCropArea.height
        );

        // Convert to data URL and pass to parent
        const croppedImageSrc = cropCanvas.toDataURL('image/png');
        onImageComplete(croppedImageSrc);
    };

    const handleReset = () => {
        const initialCropSize = Math.min(200, imageData.width * 0.8, imageData.height * 0.8);
        setCropArea({
            x: (imageData.width - initialCropSize) / 2,
            y: (imageData.height - initialCropSize) / 2,
            width: initialCropSize,
            height: initialCropSize,
        });
    };

    if (!isOpen) return null;

    return (
        <Model onClose={onClose} title="Edit Image" modalClass="!w-[800px]">
            <div>
                <div className="flex gap-6">
                    <div className="flex-1">
                        <canvas
                            ref={canvasRef}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            style={{ cursor: canvasCursor }}
                            className="border border-gray-300 w-full"
                        />
                        <img
                            ref={imageRef}
                            src={imageSrc}
                            className="hidden"
                            alt="preview"
                        />
                        <div className="mt-2 text-sm text-gray-600">
                            Drag to move crop area, drag corners to resize
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mt-5">
                    <CancelButton title="Reset" onClick={handleReset} />
                    <SecondaryButton title="Cancel" onClick={onClose} />
                    <SecondaryButton title="Insert" onClick={handleCropComplete} />
                </div>
            </div>
        </Model>
    );
}