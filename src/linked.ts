import { useStore } from "../main";

type LinkedList = {
  head: LinkedList | null;
  tail: LinkedList | null;
  value: number;
};

const append = (link: LinkedList | null, value: number): LinkedList => {
  if (!link) {
    return { value, head: null, tail: null };
  }
  const newLink = { value, head: link, tail: null };
  link.tail = newLink;
  return newLink;
};

const getLastElement = (link: LinkedList): LinkedList => {
  if (link.tail) {
    return getLastElement(link.tail);
  }
  return link;
};

const getFirstElement = (link: LinkedList): LinkedList => {
  if (link.head) {
    return getFirstElement(link.head);
  }
  return link;
};

const getNthElement = (link: LinkedList, index: number): LinkedList | null => {
  let count = -1;
  return find(link, (a) => {
    count++;
    return count === index;
  });
};

const forEach = (link: LinkedList, fn: (a: LinkedList) => void): void => {
  fn(link);
  link.tail && forEach(link.tail, fn);
};

const insert = (
  link: LinkedList,
  item: LinkedList,
  index: number
): LinkedList => {
  let count = 0;
  let before = null;
  let elem = link;
  while (count <= index) {
    if (count === index) {
      item.head = before;
      if (before) {
        before.tail = item;
      }
      item.tail = elem;
      elem.head = item;
      break;
    }
    before = elem;
    if (!elem.tail) {
      throw "out of index";
    }
    elem = elem.tail;
    count++;
  }
  return count === 0 ? item : linkedList;
};

const reverse = (link: LinkedList) => {
  const head = link.head;
  link.head = link.tail;
  link.tail = head;

  if (link.head) {
    link = reverse(link.head);
  }

  return link;
};

const find = (
  link: LinkedList,
  fn: (link: LinkedList) => boolean
): LinkedList | null => {
  if (fn(link)) {
    return link;
  } else if (link.tail) {
    return find(link.tail, fn);
  }

  return null;
};

const createLinkedList = (length = 10) => {
  const linked = append(null, 0);
  let item;
  for (let i = 1; i <= length; i++) {
    item = append(item || linked, i * 10);
  }
  return linked;
};

const logAllLinks = (link: LinkedList, fn: (a: any) => void) => {
  newLine();
  forEach(link, (a) => fn(a.value));
  newLine();
};

const { save, newLine, log } = useStore(__filename);
const linkedList = createLinkedList();

logAllLinks(linkedList, save);
const last = getLastElement(linkedList);
const first = getFirstElement(last);
save(`first: ${first.value}, last: ${last.value}`);

const reversed = reverse(linkedList);
logAllLinks(reversed, save);

reverse(getFirstElement(linkedList));
logAllLinks(linkedList, save);

let a = insert(linkedList, { value: 15, head: null, tail: null }, 1);

logAllLinks(a, save);

log();
