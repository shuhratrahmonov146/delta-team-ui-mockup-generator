declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

declare module "react-world-flags" {
  import React from "react";

  interface FlagProps extends React.HTMLAttributes<HTMLImageElement> {
    code?: string;
    fallback?: React.ReactNode;
    height?: string | number;
    width?: string | number;
  }

  const Flag: React.FC<FlagProps>;
  export default Flag;
}

declare module "swiper/css";
declare module "swiper/css/pagination";
declare module "swiper/css/autoplay";
declare module "swiper/css/navigation";
