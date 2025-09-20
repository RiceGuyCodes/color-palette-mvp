'use client'
import { useState } from 'react'
import ImageUpload from '../components/ImageUpload'
import Canvas from '../components/Canvas'  
import ColorPicker from '../components/ColorPicker'
import { Download } from 'lucide-react'

export default function Dashboard() {
  const [imageData, setImageData] = useState<string>('')
  const [originalFile, setOriginalFile] = useState<File | null>(null)
  const [selectedColor, setSelectedColor] = useState('#FF6B6B')
  const [tolerance, setTolerance] = useState(30)

  const handleImageLoad = (data: string, file: File) => {
    setImageData(data)
    setOriginalFile(file)
  }

  const handleDownload = () => {
    const canvas = document.querySelector('canvas')
    if (!canvas) return

    const link = document.createElement('a')
    link.download = `edited-${originalFile?.name || 'image.png'}`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Color Palette Editor</h1>
          <p className="text-gray-600 mt-2">Upload your design and see color changes instantly</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Upload & Canvas */}
          <div className="lg:col-span-2 space-y-6">
            {!imageData ? (
              <ImageUpload onImageLoad={handleImageLoad} />
            ) : (
              <>
                <Canvas 
                  imageData={imageData}
                  selectedColor={selectedColor}
                  tolerance={tolerance}
                />
                <div className="flex gap-4">
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Download size={16} />
                    Download
                  </button>
                  <button
                    onClick={() => setImageData('')}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Upload New Image
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Right Column - Color Controls */}
          <div>
            <ColorPicker
              selectedColor={selectedColor}
              onColorChange={setSelectedColor}
              tolerance={tolerance}
              onToleranceChange={setTolerance}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
