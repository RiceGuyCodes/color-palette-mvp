'use client'
import { useState, useRef } from 'react'
import { Upload } from 'lucide-react'

interface ImageUploadProps {
  onImageLoad: (imageData: string, file: File) => void
}

export default function ImageUpload({ onImageLoad }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return
    
    const file = files[0]
    if (!file.type.startsWith('image/')) return

    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        onImageLoad(e.target.result as string, file)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    handleFiles(e.dataTransfer.files)
  }

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2 text-sm text-gray-600">
        Click to upload or drag and drop your design
      </p>
      <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  )
}
