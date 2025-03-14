struct Camera {
  position: vec3<f32>,
  view_matrix: mat4x4<f32>,
  projection_matrix: mat4x4<f32>,
  view_projection_matrix: mat4x4<f32>,
}

struct DirLight {
  direction: vec3<f32>,
  color: vec3<f32>,
  intensity: f32,
}

struct Scene {
  camera: Camera,
  dirLights: array<DirLight, 3>,
}

struct Transform {
  model_matrix: mat4x4<f32>,
  normal_matrix: mat4x4<f32>,
}

struct PhongMaterial {
  diffuse_color: vec3<f32>,
  specular_color: vec3<f32>,
  opacity: f32,
}

struct Entity {
  transform: Transform,
  material: PhongMaterial,
}
