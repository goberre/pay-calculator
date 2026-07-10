type BlogInfographicProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

export default function BlogInfographic({
  src,
  alt,
  className = "",
  priority = false,
}: BlogInfographicProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
