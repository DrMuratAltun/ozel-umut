export type NavLink = {
  label: string;
  href: string;
};

export type AdminNavLink = NavLink & {
  icon: string;
};

export type SiteSettings = Record<string, string>;
