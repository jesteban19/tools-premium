declare let window: Window;
export interface IElectron {
  ipcRenderer: {
    myPing(): void;
    saveContent(content: any): void;
    loadContent: Promise<any>;
    openFile(): void;
    once(channel: any, func: any): void;
    getDrivesOnce(channel: any, func: any): void;
    getDrives(): void;
    on(channel: any, func: any): void;
  };
}
declare global {
  interface Window {
    electron: IElectron;
    process: any;
    require: any;
  }
}
export {};
