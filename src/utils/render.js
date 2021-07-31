export const RenderPlace = {
  BEFORE_END: 'beforeend',
};

export const render = ( container, template, place ) => {
  container.insertAdjacentHTML( place, template );
};
