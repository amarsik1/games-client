export const getUniqueItems = (items, prop) => (
  items.filter((item, index, array) => (
    array.findIndex((arrItem) => (arrItem[prop] === item[prop])) === index
  ))
);
