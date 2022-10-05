import { createHash } from "crypto";
import { useStore } from "./hooks";

type HashTable = {
  loadFactor: number;
  table: any[];
  length: number;
};

const createHashTable = (
  size: number = 3
): {
  hash: HashTable;
  get: (key: string) => any;
  set: (key: string, data: any) => void;
} => {
  const hash = { loadFactor: 0, table: Array(size), length: 0 };

  const get = (key: string) => {
    return getValue(hash, key);
  };

  const set = (key: string, data: any) => {
    return setValue(hash, key, data);
  };

  return { hash, get, set };
};

const getValue = (hash: HashTable, key: string): any => {
  const bucket: any[] | undefined = hash.table[getHashIndex(hash, key)];
  if (!bucket) return null;
  const item = bucket.find((item) => item[0] === key);
  return item ? item[1] : null;
};

const setValue = (hash: HashTable, key: string, data: any): HashTable => {
  hash.length++;
  hash.loadFactor = hash.length / hash.table.length;

  if (hash.loadFactor >= 0.8) {
    resize(hash);
  }

  const index = getHashIndex(hash, key);

  if (!hash.table[index]) {
    hash.table[index] = [];
  }
  hash.table[index].push([key, data]);
  return hash;
};

const getHashIndex = ({ table }: HashTable, key: string): number =>
  parseInt(createHash("sha256").update(key).digest("hex"), 16) % table.length;

const resize = (hash: HashTable) => {
  const newHash: HashTable = { ...hash, table: Array(hash.table.length * 2) };

  hash.table.forEach((item: [string, any]) => {
    if (!item) return;

    item.forEach(([key, data]) => {
      const index = getHashIndex(newHash, key);
      if (!newHash.table[index]) {
        newHash.table[index] = [];
      }
      newHash.table[index].push([key, data]);
    });
  });
  hash.loadFactor = newHash.loadFactor = newHash.length / newHash.table.length;
  hash.table = newHash.table;
};

const { log, save, newLine } = useStore(__filename);

const saveHash = () => {
  newLine();
  save(`loadFactor: ${hash.loadFactor}`);
  save(`length: ${hash.length}`);
  newLine();
};

const { hash, set, get } = createHashTable(100);

saveHash();

const createForEach = (array: any[]) => {
  let data = array;
  return (fn: (e: any, i: number) => void) => {
    data.forEach(fn);
  };
};
const textForEach = createForEach(
  "lucas.teste.lu.cabe.eee.taxi.lua.noite".split(".")
);

textForEach(set);
textForEach((e) => save(get(e)));
saveHash();
log();
