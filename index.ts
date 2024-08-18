import { $ } from "bun";

await Promise.all([
    $`bun run dev`,
    $`bun run start:server --watch`
])