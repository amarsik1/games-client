export const getUniquePlayers = (players) => (
  players.filter((item, index, array) => (
    array.findIndex((arrItem) => (arrItem.uuid === item.uuid)) === index
  ))
);
