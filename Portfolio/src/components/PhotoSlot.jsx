import { ImageIcon } from 'lucide-react'

// Shows the image if src is set, otherwise a labelled placeholder.
// position is a CSS object-position, e.g. 'center top', to steer the crop.
export default function PhotoSlot({ src, alt, label = 'Add photo', position, className = '' }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={position ? { objectPosition: position } : undefined}
        className={`h-full w-full object-cover ${className}`}
      />
    )
  }
  return (
    <div className={`grid h-full w-full place-items-center border border-dashed border-line bg-raised/40 text-muted ${className}`}>
      <div className="flex flex-col items-center gap-2 p-4 text-center">
        <ImageIcon size={22} strokeWidth={1.5} />
        <span className="font-mono text-[11px]">{label}</span>
      </div>
    </div>
  )
}
