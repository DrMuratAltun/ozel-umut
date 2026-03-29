import Image from "next/image";
import { Breadcrumbs, type BreadcrumbItem } from "./breadcrumbs";

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
}

export function PageHeader({ title, description, breadcrumbs }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-primary py-14 md:py-20">
      {/* Background image */}
      <div className="absolute inset-0 opacity-20">
        <Image
          src="/images/hero/hero-1.jpg"
          alt=""
          fill
          className="object-cover"
          aria-hidden="true"
        />
      </div>
      {/* Decorative shapes */}
      <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/5 blur-2xl" />
      <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-accent/10 blur-2xl" />

      <div className="relative container mx-auto px-4">
        {breadcrumbs && (
          <div className="[&_a]:text-white/70 [&_a:hover]:text-white [&_span]:text-white [&_svg]:text-white/50">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-2">{title}</h1>
        {description && (
          <p className="mt-3 text-lg text-white/80 max-w-2xl">{description}</p>
        )}
      </div>
    </section>
  );
}
