export interface Item {
  id: number;
  name: string;
  disabled: boolean;
}

export const toString = (item: Item) => item.name;

export const itemToString = (item: Item) => {
  return toString(item);
};
