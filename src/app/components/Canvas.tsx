'use client'
import { useRef, useEffect, useState } from 'react'

interface CanvasProps {
  imageData: string
  selectedColor: string
  tolerance: number
}

export default function Canvas({ imageData, selectedColor, tolerance }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [originalImageData, setOriginalImageData] = useState<ImageData | null>(null)
  const [clickedColor, setClickedColor] = useState<string>('')

  // Load image onto canvas
  useEffect(() => {
    if (!imageData || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')!
    const img = new Image()

    img.onload = () => {
      // Set canvas dimensions to match image
      canvas.width = Math.min(img.width, 800)
      canvas.height = (canvas.width / img.width) * img.height
      
      // Draw image and store original pixel data
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      setOriginalImageData(ctx.getImageData(0, 0, canvas.width, canvas.height))
    }
    
    img.src = imageData
  }, [imageData])

  // Handle canvas click to select color
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !originalImageData) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')!
    const rect = canvas.getBoundingClientRect()
    
    const x = Math.floor((e.clientX - rect.left) * (canvas.width / rect.width))
    const y = Math.floor((e.clientY - rect.top) * (canvas.height / rect.height))
    
    const pixel = ctx.getImageData(x, y, 1, 1)
    const [r, g, b] = pixel.data
    
    const hexColor = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
    setClickedColor(hexColor)
    
    // Replace color
    replaceColor(r, g, b, selectedColor, tolerance)
  }

  // Color replacement algorithm
  const replaceColor = (targetR: number, targetG: number, targetB: number, newColor: string, tolerance: number) => {
    if (!canvasRef.current || !originalImageData) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')!
    const imageData = new ImageData(
      new Uint8ClampedArray(originalImageData.data),
      originalImageData.width,
      originalImageData.height
    )

    // Convert hex color to RGB
    const newColorRgb = hexToRgb(newColor)
    if (!newColorRgb) return

    const data = imageData.data
    
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i]
      const g = data[i + 1] 
      const b = data[i + 2]
      
      // Calculate color distance
      const distance = Math.sqrt(
        Math.pow(r - targetR, 2) + 
        Math.pow(g - targetG, 2) + 
        Math.pow(b - targetB, 2)
      )
      
      // Replace if within tolerance
      if (distance <= tolerance) {
        data[i] = newColorRgb.r
        data[i + 1] = newColorRgb.g
        data[i + 2] = newColorRgb.b
      }
    }
    
    ctx.putImageData(imageData, 0, 0)
  }

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16), 
      b: parseInt(result[3], 16)
    } : null
  }

  return (
    <div className="space-y-4">
      <canvas
        ref={canvasRef}
        className="border rounded-lg cursor-crosshair max-w-full"
        onClick={handleCanvasClick}
      />
      {clickedColor && (
        <div className="flex items-center gap-2">
          <div 
            className="w-6 h-6 rounded border"
            style={{ backgroundColor: clickedColor }}
          />
          <span className="text-sm text-gray-600">Selected: {clickedColor}</span>
        </div>
      )}
    </div>
  )
}
