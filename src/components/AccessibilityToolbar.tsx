import { ZoomIn, ZoomOut, Keyboard } from 'lucide-react';

interface AccessibilityToolbarProps {
  textScale: number;
  setTextScale: (value: number) => void;
}

export function AccessibilityToolbar({
  textScale,
  setTextScale
}: AccessibilityToolbarProps) {
  return (
    <div className="border-b bg-white border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Keyboard className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">WCAG 2.1 AA Compliant</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Text Scaling */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-2 py-1">
              <button
                onClick={() => setTextScale(Math.max(0.8, textScale - 0.1))}
                disabled={textScale <= 0.8}
                className="p-1.5 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Decrease text size"
                title="Decrease Text Size"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              
              <span className="text-sm font-medium min-w-[3rem] text-center">
                {Math.round(textScale * 100)}%
              </span>
              
              <button
                onClick={() => setTextScale(Math.min(1.5, textScale + 0.1))}
                disabled={textScale >= 1.5}
                className="p-1.5 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Increase text size"
                title="Increase Text Size"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            {/* Keyboard Navigation Indicator */}
            <div className="text-sm text-gray-600 hidden md:block">
              Press <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Tab</kbd> to navigate
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}