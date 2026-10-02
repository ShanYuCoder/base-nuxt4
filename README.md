# Platform Base (Nuxt 4)

Auth-first Nuxt 4 — shadcn dashboard, kiến trúc 4 tầng, harness AI (code lane).

## Quick start

```bash
pnpm install
pnpm dev
```

`devServer` listen `0.0.0.0`. WSL ext4: watch polling tắt mặc định — bật `NUXT_WATCH_POLLING=1` khi Docker hoặc project trên `/mnt/c`.

## Commands

| Command | Mô tả |
|---------|--------|
| `pnpm dev` | Nuxt dev |
| `pnpm build` / `preview` | Production build |
| `pnpm storybook` | UI catalog (port 6006) |
| `pnpm test:unit` | Vitest |
| `pnpm test:e2e` | Playwright |

## Repo này

Skeleton: `/auth/*`, `/password/reset/*`, `/` (protected), `404`, `forbidden`.  
Chi tiết: `pages/`, `middleware/`, `components/`, `composables/`, `services/`, `stores/`.

API client (`$apiFetch`) dùng prefix **`/api/auth/*`**.

Registries product: `registries/`.
