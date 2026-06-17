import { useState } from "react";

/**
 * Avatar do hero: imagem circular com anel gradiente + status dot.
 * Se `src` faltar ou falhar ao carregar, exibe um monograma como fallback.
 */
const ProfileAvatar = ({
  src,
  alt = "Artur Brasileiro",
}: {
  src?: string;
  alt?: string;
}) => {
  const [errored, setErrored] = useState(false);
  const showImg = Boolean(src) && !errored;

  return (
    <div className="relative inline-block">
      <div className="rounded-full p-[3px] bg-gradient-primary shadow-glow">
        <div className="rounded-full bg-background p-1">
          {showImg ? (
            <img
              src={src}
              alt={alt}
              onError={() => setErrored(true)}
              className="h-28 w-28 md:h-32 md:w-32 rounded-full object-cover"
            />
          ) : (
            <div className="h-28 w-28 md:h-32 md:w-32 rounded-full grid place-items-center bg-secondary font-display text-4xl font-bold gradient-text select-none">
              AB
            </div>
          )}
        </div>
      </div>
      <span
        className="absolute bottom-2 right-2 h-4 w-4 rounded-full bg-primary ring-4 ring-background"
        aria-hidden="true"
      />
    </div>
  );
};

export default ProfileAvatar;
