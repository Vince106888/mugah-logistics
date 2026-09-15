import React, { useEffect, useRef, useState } from 'react';
import { EraserIcon, PenLineIcon } from 'lucide-react';

interface SignaturePadProps {
  onChange: (hasSignature: boolean) => void;
}

export function SignaturePad({ onChange }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);
  const [hasInk, setHasInk] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ratio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    const context = canvas.getContext('2d');
    if (!context) return;
    context.scale(ratio, ratio);
    context.lineWidth = 2.2;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.strokeStyle = '#0d1411';
  }, []);

  const pointFrom = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const start = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const context = canvasRef.current?.getContext('2d');
    if (!context) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drawing.current = true;
    const { x, y } = pointFrom(event);
    context.beginPath();
    context.moveTo(x, y);
  };

  const move = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const context = canvasRef.current?.getContext('2d');
    if (!context) return;
    const { x, y } = pointFrom(event);
    context.lineTo(x, y);
    context.stroke();
    if (!hasInk) {
      setHasInk(true);
      onChange(true);
    }
  };

  const end = () => {
    drawing.current = false;
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    setHasInk(false);
    onChange(false);
  };

  return (
    <div>
      <div className="relative overflow-hidden rounded-xl border border-bone-line bg-white">
        <canvas
          ref={canvasRef}
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerLeave={end}
          className="h-40 w-full touch-none cursor-crosshair"
          aria-label="Signature area — draw your signature with a finger, stylus or mouse"
          role="img" />
        
        {!hasInk &&
        <p className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2 text-sm text-ink-600">
            <PenLineIcon className="h-4 w-4" aria-hidden="true" />
            Sign here with your finger or mouse
          </p>
        }
        <span
          className="pointer-events-none absolute bottom-6 left-6 right-6 border-b border-dashed border-bone-line"
          aria-hidden="true" />
        
      </div>
      <div className="mt-2 flex items-center justify-between gap-4">
        <p className="text-xs text-ink-600">
          Your signature is timestamped and bound to this agreement.
        </p>
        <button
          type="button"
          onClick={clear}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-600 transition-colors duration-150 ease-swift hover:text-ink">
          
          <EraserIcon className="h-3.5 w-3.5" aria-hidden="true" />
          Clear
        </button>
      </div>
    </div>);

}