export const renderPlace = {
  BEFOREEND: 'beforeend',
};

export const render = ( container, template, place ) => {
  container.insertAdjacentHTML( place, template );
};
