/// <reference types="wesl-plugin/suffixes" />
import { link } from "wesl";
import shaderVertex from "../shaders/vertex.wesl?raw";
import shaderStructs from "../shaders/structs.wesl?raw";
import shaderMain from "../shaders/main.wesl?raw";

export const getShaderModule = async (device: GPUDevice) => {
  const wesl = await link({
    weslSrc: {
      'vertex.wesl': shaderVertex,
      'structs.wesl': shaderStructs,
      'main.wesl': shaderMain,
    }
  });

  return wesl.createShaderModule(device, {});
};
