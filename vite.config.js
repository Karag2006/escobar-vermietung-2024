import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
    build: {
        lib: {
            entry: "resources/js/app.tsx",
            name: "app",
        },
        rollupOptions: {
            input: {
                main: resolve(__dirname, "resources/js/app.tsx"),
            },
        },
    },
    plugins: [
        laravel({
            input: "resources/js/app.tsx",
            ssr: "resources/js/ssr.tsx",
            refresh: true,
        }),
        react(),
    ],
});
