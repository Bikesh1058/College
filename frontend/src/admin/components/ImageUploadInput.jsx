import { useRef, useState } from 'react';
import { Upload } from 'lucide-react';

/**
 * Reusable Image URL Input with a Left-Side "Upload" Button.
 * Supports either selecting a local image file (converted to an instant Data URL)
 * or typing/pasting an external image URL.
 */
export default function ImageUploadInput({
  value,
  onChange,
  placeholder = 'https://... or click Upload on the left',
  required = false,
  accept = 'image/*',
  buttonLabel = 'Upload',
  className = ''
}) {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        onChange(reader.result);
      }
      setUploading(false);
    };
    reader.onerror = () => {
      setUploading(false);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <div className={`mt-1 flex items-stretch gap-2 ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#101B2D] text-[#C5A15B] text-xs sm:text-sm font-bold hover:bg-[#1B293E] transition shrink-0 shadow-xs cursor-pointer"
        title="Upload file from your computer"
      >
        <Upload className="h-4 w-4" />
        <span>{uploading ? 'Reading...' : buttonLabel}</span>
      </button>
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="flex-1 min-w-0 px-3.5 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-sm text-[#101B2D] outline-none focus:border-[#C5A15B] focus:bg-white"
      />
    </div>
  );
}

