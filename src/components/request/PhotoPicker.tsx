import { ImagePlus, X } from "lucide-react";
import { useEffect, useRef } from "react";

export type Photo = { id: string; file: File; url: string };

const MAX_PHOTOS = 5;

export function PhotoPicker({ photos, onChange }: { photos: Photo[]; onChange: (p: Photo[]) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const latest = useRef(photos);
  latest.current = photos;

  // Free preview URLs when the page closes.
  useEffect(() => () => latest.current.forEach((p) => URL.revokeObjectURL(p.url)), []);

  function add(files: FileList | null) {
    if (!files) return;
    const picked = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, MAX_PHOTOS - photos.length)
      .map((file) => ({ id: crypto.randomUUID(), file, url: URL.createObjectURL(file) }));
    onChange([...photos, ...picked]);
    if (inputRef.current) inputRef.current.value = "";
  }

  function remove(id: string) {
    const p = photos.find((x) => x.id === id);
    if (p) URL.revokeObjectURL(p.url);
    onChange(photos.filter((x) => x.id !== id));
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
        {photos.map((p) => (
          <div key={p.id} className="relative aspect-square overflow-hidden rounded-2xl border border-border">
            <img src={p.url} alt={p.file.name} className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => remove(p.id)}
              aria-label={`Remove ${p.file.name}`}
              className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-navy text-navy-foreground shadow-soft hover:opacity-90"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
        {photos.length < MAX_PHOTOS && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex aspect-square flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-input text-sm font-medium text-muted-foreground transition hover:border-primary hover:text-primary"
          >
            <ImagePlus className="h-6 w-6" aria-hidden />
            Add photo
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
        multiple
        className="sr-only"
        aria-label="Upload photos"
        onChange={(e) => add(e.target.files)}
      />
      <p className="mt-2 text-sm text-muted-foreground">Up to {MAX_PHOTOS} photos · JPG, PNG, WEBP or HEIC</p>
    </div>
  );
}
