import DolphinLogo from "@/components/DolphinLogo";

type BrandLockupProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: { icon: 24, text: "text-sm" },
  md: { icon: 28, text: "text-base" },
  lg: { icon: 36, text: "text-xl" },
} as const;

export default function BrandLockup({ className, size = "md" }: BrandLockupProps) {
  const { icon, text } = sizes[size];

  return (
    <div className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <DolphinLogo size={icon} className="text-blue-600" />
      <span className={`${text} font-semibold tracking-tight text-gray-900`}>돌고래</span>
    </div>
  );
}
