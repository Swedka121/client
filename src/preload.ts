// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import * as path from "path-browserify";

contextBridge.exposeInMainWorld("token", {
  get: async () => {
    return await ipcRenderer.invoke("credential:get-refresh");
  },
  set: async (token: string) => {
    return await ipcRenderer.invoke("credential:set-refresh", token);
  },
  getAccess: async () => {
    return await ipcRenderer.invoke("credential:get-access");
  },
  setAccess: async (token: string) => {
    return await ipcRenderer.invoke("credential:set-access", token);
  },
  logout: async () => {
    return await ipcRenderer.invoke("credential:logout");
  },
});

export const resolveAsset = (assetName: string) => {
  if (process.env.NODE_ENV === "development") {
    // point to the Vite dev server directory
    return path.join(process.cwd(), "src/renderer/assets", assetName);
  } else {
    // point to the built assets inside asar or unpacked folder
    return path.join(
      process.resourcesPath,
      "app.asar.unpacked",
      ".vite/build/assets",
      assetName
    );
  }
};
