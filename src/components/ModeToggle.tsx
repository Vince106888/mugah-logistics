import { motion } from 'framer-motion';
import { useMode } from '../contexts/ModeContext';
import type { SiteMode } from '../types/vehicle';

const options: {value: SiteMode;label: string;}[] = [
{ value: 'buy', label: 'Buy a car' },
{ value: 'hire', label: 'Hire a car' }];


interface ModeToggleProps {
  tone?: 'light' | 'dark';
  size?: 'sm' | 'lg';
  className?: string;
}

export function ModeToggle({ tone = 'light', size = 'sm', className = '' }: ModeToggleProps) {
  const { mode, setMode } = useMode();
  const isDark = tone === 'dark';

  return (
    <div
      role="tablist"
      aria-label="Choose whether you want to buy or hire"
      className={`relative inline-flex rounded-full p-1 ${
      isDark ? 'bg-white/10 ring-1 ring-white/20' : 'bg-bone-dim ring-1 ring-bone-line'} ${
      className}`}>
      
      {options.map((option) => {
        const active = mode === option.value;
        return (
          <button
            key={option.value}
            role="tab"
            aria-selected={active}
            onClick={() => setMode(option.value)}
            className={`relative rounded-full font-medium transition-colors duration-200 ease-swift focus:outline-none focus-visible:ring-2 focus-visible:ring-amber ${
            size === 'lg' ? 'px-6 py-3 text-base' : 'px-4 py-1.5 text-sm'} ${

            active ?
            isDark ?
            'text-ink' :
            'text-bone' :
            isDark ?
            'text-white/70 hover:text-white' :
            'text-ink-600 hover:text-ink'}`
            }>
            
            {active &&
            <motion.span
              layoutId={`mode-pill-${tone}-${size}`}
              transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
              className={`absolute inset-0 rounded-full ${isDark ? 'bg-amber-bright' : 'bg-forest'}`} />

            }
            <span className="relative z-10 whitespace-nowrap">{option.label}</span>
          </button>);

      })}
    </div>);

}
