# timefold-wesl-example
Example on how to use wesl reflection together with timefold

## Info

There are 2 ways on how to use [timefold](https://github.com/jarvispact/timefold) together with [wesl](https://github.com/wgsl-tooling-wg):

1. Write your structs and uniforms in typescript and generate the wgsl/wesl code.
2. Write shaders in wesl and generate/reflect the typescript bindings and types.

This repo is a example for the second approach. If you are interested in the first approach [take a look here](https://github.com/jarvispact/timefold-wesl-example).

## Repo structure

- `src/main.ts` - Entrypoint. Add Plugins and Systems and start the world.
- `src/world.ts` - Create a single instance of our world.
- `src/reflected.ts` - Generated typescript bindings using [@timefold/webgpu](https://www.npmjs.com/package/@timefold/webgpu).
- `src/render-plugin.ts` - Minimal RenderPlugin implementation.
    - Uses `reflected.ts` for easy pipeline layout and bindgroup generation.
    - Uses `reflected.ts` for easy render pipeline generation.
- `shaders/**/*.wesl` - Your `.wesl` source files go here.
- `public/main.wesl` - Link your source files with wesl to produce a `shaderModule`.
- `src/wesl.ts` - Leverage wesl to build the final webgpu shader module.