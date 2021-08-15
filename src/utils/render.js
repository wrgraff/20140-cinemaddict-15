export const RenderPlace = {
  BEFORE_AFTER: 'afterbegin',
  BEFORE_END: 'beforeend',
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPlace.AFTER_BEGIN:
      container.prepend(element);
      break;
    case RenderPlace.BEFORE_END:
      container.append(element);
      break;
    default:
      throw new Error(`Unknown render position: ${place}. Possible values: ${Object.values(RenderPlace).join(', ')}`);
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstElementChild;
};
