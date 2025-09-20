'use client'

interface ColorPickerProps {
  selectedColor: string
  onColorChange: (color: string) => void
  tolerance: number
  onToleranceChange: (tolerance: number) => void
}

const PRESET_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
  '#F7DC6F', '#BB8FCE', '#85C1E9', '#F8C471', '#82E0AA'
]

export default function ColorPicker({ 
  selectedColor, 
  onColorChange, 
  tolerance, 
  onToleranceChange 
}: ColorPickerProps) {
  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm border">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Replacement Color
        </label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={selectedColor}
            onChange={(e) => onColorChange(e.target.value)}
            className="w-12 h-12 rounded border border-gray-300 cursor-pointer"
          />
          <input
            type="text"
            value={selectedColor}
            onChange={(e) => onColorChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm font-mono"
            placeholder="#000000"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Preset Colors
        </label>
        <div className="grid grid-cols-5 gap-2">
          {PRESET_COLORS.map((color) => (
            <button
              key={color}
              className={`w-10 h-10 rounded border-2 transition-all ${
                selectedColor === color ? 'border-gray-800 scale-110' : 'border-gray-200'
              }`}
              style={{ backgroundColor: color }}
              onClick={() => onColorChange(color)}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Color Tolerance: {tolerance}
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={tolerance}
          onChange={(e) => onToleranceChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Precise</span>
          <span>Broad</span>
        </div>
      </div>
    </div>
  )
}
