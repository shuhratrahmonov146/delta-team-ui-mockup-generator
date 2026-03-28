import React from "react";
import Image from "next/image";

interface ImageProps {
  className?: string;
  size?: number;
  width?: number;
  height?: number;
}

export const PhoneMini: React.FC<ImageProps> = ({
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
      src="/case/paragon/phone_mini.svg"
      alt="Phone Mini"
      fill
      className="object-cover"
    />
  </div>
);
