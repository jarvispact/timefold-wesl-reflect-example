// Generated code - Do not modify manually
// To update run: npm run build

import { Wgsl, WebgpuUtils, Uniform } from '@timefold/webgpu';

export const Vertex = Wgsl.struct('Vertex', {
  position: Wgsl.type('vec3<f32>'),
  uv: Wgsl.type('vec2<f32>'),
  normal: Wgsl.type('vec3<f32>'),
})

export const VSOutput = Wgsl.struct('VSOutput', {
  position: Wgsl.type('vec4<f32>'),
  uv: Wgsl.type('vec2<f32>'),
  normal: Wgsl.type('vec3<f32>'),
  world_pos: Wgsl.type('vec3<f32>'),
})

export const Camera = Wgsl.struct('Camera', {
  position: Wgsl.type('vec3<f32>'),
  view_matrix: Wgsl.type('mat4x4<f32>'),
  projection_matrix: Wgsl.type('mat4x4<f32>'),
  view_projection_matrix: Wgsl.type('mat4x4<f32>'),
})

export const DirLight = Wgsl.struct('DirLight', {
  direction: Wgsl.type('vec3<f32>'),
  color: Wgsl.type('vec3<f32>'),
  intensity: Wgsl.type('f32'),
})

export const Scene = Wgsl.struct('Scene', {
  camera: Camera,
  dirLights: Wgsl.array(DirLight, 3),
})

export const Transform = Wgsl.struct('Transform', {
  model_matrix: Wgsl.type('mat4x4<f32>'),
  normal_matrix: Wgsl.type('mat4x4<f32>'),
})

export const PhongMaterial = Wgsl.struct('PhongMaterial', {
  diffuse_color: Wgsl.type('vec3<f32>'),
  specular_color: Wgsl.type('vec3<f32>'),
  opacity: Wgsl.type('f32'),
})

export const Entity = Wgsl.struct('Entity', {
  transform: Transform,
  material: PhongMaterial,
})


export const SceneUniformGroup = Uniform.group(0, {
    scene: Uniform.buffer(0, Scene),
});

export const EntityUniformGroup = Uniform.group(1, {
    entity: Uniform.buffer(0, Entity),
});

export const VertexLayout = WebgpuUtils.createVertexBufferLayout('interleaved', {
    position: { format: 'float32x3', offset: 0 },
    uv: { format: 'float32x2', offset: 5 },
    normal: { format: 'float32x3', offset: 3 },
});
