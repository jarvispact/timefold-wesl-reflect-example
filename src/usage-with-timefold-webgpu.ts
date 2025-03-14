// ====================================================================================
// This repo uses @timefold/engine and therefor has some additional abstractions.
// @timefold/webgpu exposes some lower-level features that you can use directly as well.

import { InferWgslStructResult } from "@timefold/webgpu";
import { Entity, Scene } from "./reflected";

// ===========================================================
// The static type can be inferred from the generated schemas.

type SceneStruct = InferWgslStructResult<typeof Scene>;
type EntityStruct = InferWgslStructResult<typeof Entity>;

// ==================================================================
// You can call `create` on any Wgsl.struct, Wgsl.array or Wgsl.type.
// It will give you typesafe access to your buffer and views.
// All of the wgsl padding and alignment rules are handled for you.
// Just set data in the view and upload the buffer to webgpu.

{
    const { buffer, views } = Scene.create();
    const positionView = views.camera.position; // Float32Array<ArrayBuffer>
}
{
    const { buffer, views } = Scene.create({ mode: 'shared-array-buffer' });
    const positionView = views.camera.position; // Float32Array<SharedArrayBuffer>
}
{
    const { views } = Scene.create({ mode: 'number-tuple' });
    const positionView = views.camera.position; // [number, number, number]
}