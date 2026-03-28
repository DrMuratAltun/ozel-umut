@AGENTS.md

# Umut Ozel Egitim ve Rehabilitasyon Merkezi

## Proje Bilgisi
- **Site:** ozelegitimumut.com
- **Lokasyon:** Korkuteli, Antalya
- **Telefon:** 0242 643 01 45
- **Stack:** Next.js 16 + TypeScript + Tailwind CSS v4 + Supabase + Prisma

## Mimari
- Prisma: tum icerik CRUD (type-safe)
- Supabase: Auth + Storage
- Server Actions: admin mutations
- shadcn/ui (new-york style)

## Onemli Dosyalar
- `prisma/schema.prisma` - 10 model
- `src/app/admin/actions.ts` - Tum server actions
- `middleware.ts` - Admin rota korumasi
- `src/lib/constants.ts` - Site sabitleri

## Gelistirme
```bash
npm run dev          # Dev server
npx prisma db push   # Schema'yi DB'ye yansit
npx prisma studio    # DB GUI
```
