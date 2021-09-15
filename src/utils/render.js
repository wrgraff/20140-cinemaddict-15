import AbstractView from '@view/abstract.js';

export const RenderPlace = {
  AFTER_BEGIN: 'afterbegin',
  BEFORE_END: 'beforeend',
};

export const render = (container, element, place = RenderPlace.BEFORE_END) => {
  if (container instanceof AbstractView) {
    container = container.getElement();
  }

  if (element instanceof AbstractView) {
    element = element.getElement();
  }

  switch (place) {
    case RenderPlace.BEFORE_END:
      container.append(element);
      break;
    case RenderPlace.AFTER_BEGIN:
      container.prepend(element);
      break;
    default:
      throw new Error(`Unknown render position: ${place}. Possible values: ${Object.values(RenderPlace).join(', ')}`);
  }
};

export const remove = (component) => {
  if (!(component instanceof AbstractView)) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
  component.removeElement();
};

export const replace = (newChild, oldChild) => {
  if (oldChild instanceof AbstractView) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof AbstractView) {
    newChild = newChild.getElement();
  }

  if (oldChild === null || newChild === null) {
    throw new Error('Can\'t replace unexisting elements');
  }

  const parent = oldChild.parentElement;

  if (parent === null) {
    throw new Error('Can\'t replace elements without parent element');
  }

  parent.replaceChild(newChild, oldChild);
};

export const createElement = (template) => {
  const element = document.createElement('div');
  element.innerHTML = template;

  return element.firstElementChild;
};
