import fs from "node:fs/promises";
import { PluginExtension, PluginExtensionApi } from "wesl-plugin";

export interface SimpleReflectOptions {
  typesDir: string;
}

const mapWgslType = (type: string): string => {
  switch (type) {
    case 'vec2':
      return 'vec2<f32>';
    case 'vec3':
      return 'vec3<f32>';
    case 'vec4':
      return 'vec4<f32>';
    case 'vec2f':
      return 'vec2<f32>';
    case 'vec3f':
      return 'vec3<f32>';
    case 'vec4f':
      return 'vec4<f32>';
    case 'mat4x4':
      return 'mat4x4<f32>';
    default:
      return type;
  }
}

// TODO: find out how to traverse the AST to produce all combinations
const shouldBeGeneratedFromAst = (type: string, memberName: string) => {
  if (type === 'array') {
    return `  ${memberName}: Wgsl.array(DirLight, 3),`;
  }
  
  if (type === 'Transform') {
    return `  ${memberName}: Transform,`;
  }

  if (type === 'PhongMaterial') {
    return `  ${memberName}: PhongMaterial,`;
  }

  if (type === 'Camera') {
    return `  ${memberName}: Camera,`;
  }

  return undefined;
}

// TODO: Currently not possible with wesl?
const shouldAlsoBeGenerated = `
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
`;

export function simpleReflect(options: SimpleReflectOptions): PluginExtension {
  return {
    extensionName: "simple_reflect",
    emitFn: async (baseId: string, api: PluginExtensionApi) => {
      const registry = await api.weslRegistry();

      const astStructs = Object.entries(registry.modules).flatMap(([, module]) =>
        module.moduleElem.contents.filter(e => e.kind === "struct"),
      );

      const fileHeader = '// Generated code - Do not modify manually\n// To update run: npm run build';

      const importStatement = 'import { Wgsl, WebgpuUtils, Uniform } from \'@timefold/webgpu\';';

      const generatedTimefoldSchemas = astStructs.map(astStruct => {
        const structName = astStruct.name.ident.originalName;
        const members = astStruct.members.map(member => {
          const memberName = member.name.name;
          const type = member.typeRef.name.originalName;
          const todo = shouldBeGeneratedFromAst(type, memberName);
          if (todo) return todo;
          return `  ${memberName}: Wgsl.type('${mapWgslType(type)}'),`;
        }).join('\n');

        return `export const ${structName} = Wgsl.struct('${structName}', {\n${members}\n})`
      }).join('\n\n');

      const fileContent = [fileHeader, importStatement, generatedTimefoldSchemas, shouldAlsoBeGenerated].join('\n\n');
      await fs.writeFile(`${options.typesDir}/reflected.ts`, fileContent);
      
      return '';
    },
  };
}