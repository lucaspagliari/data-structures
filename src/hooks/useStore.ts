import { basename } from "path";

export const useStore = (file?: string) => {
  let store: any[] = [[]];
  let currentLine: number = 0;

  const newLine = () => {
    currentLine++;
    store[currentLine] = [];
  };

  const save = (data: any) => {
    store[currentLine].push(data);
  };

  const log = () => {
    file && console.log("⭐⭐", basename(file), "⭐⭐");
    store.forEach((item, index) => {
      item.length && console.log(index, ":", item.join(" | "));
    });
    console.log(Array(50).join("-"));
  };

  const clear = () => {
    store = [[]];
    currentLine = 0;
  };
  return { newLine, save, log, clear };
};
