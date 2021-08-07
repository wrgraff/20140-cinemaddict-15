export const getRandomInteger = ( a = 0, b = 1 ) => (
  Math.round( Math.random() * (b - a) + a )
);

export const getRandomItems = ( items, max = 1, min = 1 ) => {
  const uniqItems = [...new Map(items)];
  const count = getRandomInteger( Math.min(min, uniqItems.length), Math.min(max, uniqItems.length) );

  if ( count === 1 ) {
    return uniqItems[getRandomInteger(0, uniqItems.length - 1)];
  }

  const randomItems = new Set();

  while ( randomItems.size < count ) {
    randomItems.add( uniqItems[getRandomInteger(0, uniqItems.length - 1)] );
  }

  return [...randomItems];
};
