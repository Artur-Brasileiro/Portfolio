import { useState } from "react";

/**
 * Avatar do hero: Imagem circular limpa, sem bordas pesadas ou sombras exageradas.
 * Design premium e minimalista.
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
    <div className="relative inline-flex items-center justify-center">
      {showImg ? (
        <img
          src={src}
          alt={alt}
          onError={() => setErrored(true)}
          className="h-48 w-48 md:h-64 md:w-64 lg:h-80 lg:w-80 rounded-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
        />
      ) : (
        <div className="h-48 w-48 md:h-64 md:w-64 lg:h-80 lg:w-80 rounded-full flex items-center justify-center bg-secondary font-display text-4xl md:text-5xl font-medium text-muted-foreground select-none">
          AB
        </div>
      )}
    </div>
  );
};

export default ProfileAvatar;
