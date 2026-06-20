"use client";

import Image, { type ImageProps } from "next/image";
import { isRemoteMedia } from "@/lib/media";

type CmsImageProps = Omit<ImageProps, "src"> & { src: string };

export default function CmsImage({ src, alt, fill, className, style, width, height, sizes, loading, quality }: CmsImageProps) {
  if (isRemoteMedia(src)) {
    if (fill) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover ${className ?? ""}`}
        />
      );
    }
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        width={typeof width === "number" ? width : undefined}
        height={typeof height === "number" ? height : undefined}
        className={className}
        style={style}
        loading={loading === "eager" ? "eager" : "lazy"}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={className}
      style={style}
      width={width}
      height={height}
      sizes={sizes}
      loading={loading}
      quality={quality}
    />
  );
}
