import { useState } from "react";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

/**
 * Avatar mínimo: um círculo pequeno com anel de 1px, do tamanho de um elemento
 * de interface e não de uma foto de capa. A identidade fica no nome e no
 * trabalho, não no rosto.
 */
const ProfileAvatar = ({
  src,
  alt = profile.name,
  className,
}: {
  src?: string;
  alt?: string;
  className?: string;
}) => {
  const [errored, setErrored] = useState(false);
  const showImg = Boolean(src) && !errored;

  const base = cn("h-12 w-12 shrink-0 rounded-full sm:h-14 sm:w-14", className);

  return showImg ? (
    <img
      src={src}
      alt={alt}
      width={56}
      height={56}
      onError={() => setErrored(true)}
      className={cn(base, "object-cover ring-1 ring-border")}
    />
  ) : (
    <span
      aria-label={alt}
      className={cn(
        base,
        "flex select-none items-center justify-center bg-muted text-sm font-semibold text-muted-foreground ring-1 ring-border",
      )}
    >
      {profile.initials}
    </span>
  );
};

export default ProfileAvatar;
