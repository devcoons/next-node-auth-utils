import { defineConfig } from 'tsup'

export default defineConfig({
    entry: [
        'src/index.ts',
        'src/node.ts',
        'src/next.ts'
    ],
    format: ['esm'],
    dts: true,
    sourcemap: true,
    clean: true,
    minify: false,
    treeshake: true,
    tsconfig: './tsconfig.json'
})
