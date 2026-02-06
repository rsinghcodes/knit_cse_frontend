import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
    label: string;
    value: string;
    onChange: (url: string) => void;
    accept?: string;
    maxSizeMB?: number;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
    label,
    value,
    onChange,
    accept = 'image/*',
    maxSizeMB = 5,
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [urlInput, setUrlInput] = useState(value);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files[0]) {
            handleFile(files[0]);
        }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            handleFile(files[0]);
        }
    };

    const handleFile = (file: File) => {
        // Check file size
        const sizeMB = file.size / (1024 * 1024);
        if (sizeMB > maxSizeMB) {
            alert(`File size must be less than ${maxSizeMB}MB`);
            return;
        }

        // Convert to base64 or upload to server
        // For now, we'll use base64 for local storage
        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target?.result as string;
            onChange(result);
            setUrlInput(result);
        };
        reader.readAsDataURL(file);
    };

    const handleUrlChange = (url: string) => {
        setUrlInput(url);
        onChange(url);
    };

    const handleClear = () => {
        onChange('');
        setUrlInput('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">{label}</label>

            {/* Image preview */}
            {value && (
                <div className="relative inline-block">
                    <img
                        src={value}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg border-2 border-gray-300"
                    />
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Drag and drop area */}
            <div
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${isDragging
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={accept}
                    onChange={handleFileInput}
                    className="hidden"
                />

                <div className="flex flex-col items-center gap-2">
                    {value ? (
                        <ImageIcon className="w-10 h-10 text-gray-400" />
                    ) : (
                        <Upload className="w-10 h-10 text-gray-400" />
                    )}

                    <div className="text-sm text-gray-600">
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Click to upload
                        </button>
                        {' or drag and drop'}
                    </div>

                    <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to {maxSizeMB}MB
                    </p>
                </div>
            </div>

            {/* URL input */}
            <div className="space-y-2">
                <label className="block text-xs font-medium text-gray-600">
                    Or enter image URL
                </label>
                <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </div>
    );
};
