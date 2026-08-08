import { useState } from "react";
import { profile } from "@/data/profile";

/**
 * Retrato emoldurado. Um retângulo 4/5 com borda e sombra lê como foto
 * institucional; um círculo lê como avatar de rede social. A moldura deslocada
 * atrás é um recurso editorial clássico — dá profundidade sem sombra pesada.
 */
const ProfileAvatar = ({
  src,
  alt = profile.name,
}: {
  src?: string;
  alt?: string;
}) => {
  const [errored, setErrored] = useState(false);
  const showImg = Boolean(src) && !errored;

  return (
    <div className="relative w-full max-w-[19rem] sm:max-w-sm">
      {/* Moldura deslocada — puramente decorativa. */}
      <div
        aria-hidden
        className="absolute -bottom-4 -right-4 hidden h-full w-full rounded-lg border border-primary/25 sm:block"
      />

      <div className="relative overflow-hidden rounded-lg border border-border bg-surface shadow-soft-lg">
        {showImg ? (
          <img
            src={src}
            alt={alt}
            onError={() => setErrored(true)}
            className="aspect-[4/5] w-full object-cover"
          />
        ) : (
          <div className="flex aspect-[4/5] w-full items-center justify-center bg-muted text-5xl font-semibold tracking-tight text-muted-foreground select-none">
            {profile.initials}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileAvatar;
