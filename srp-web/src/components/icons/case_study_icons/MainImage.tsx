import React from "react";
import Image from "next/image";

interface ImageProps {
  className?: string;
  size?: number;
  width?: number;
  height?: number;
}

export const MainImage: React.FC<ImageProps> = ({
  className,
  width,
  height,
}) => (
  <div
    className={className}
    style={{
      position: "relative",
      width: width || "100%",
      height: height || "100%",
    }}
  >
    <Image
      src="/case/paragon/main_image.svg"
      alt="Main Image"
      fill
      className="object-cover"
    />
  </div>
);
