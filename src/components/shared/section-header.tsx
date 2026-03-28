import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  centered = true,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn(centered && "text-center", "mb-10", className)}>
      <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
      )}
      <div
        className={cn(
          "mt-4 h-1 w-16 rounded-full bg-primary",
          centered && "mx-auto"
        )}
      />
    </div>
  );
}
