import '@testing-library/jest-dom/extend-expect';

type ScrollTo = {
  (x?: number, y?: number): void;
  (options?: ScrollToOptions): void;
};

const scrollTo: ScrollTo = jest.fn((xOrOptions?: number | ScrollToOptions, y?: number) => {
  if (typeof xOrOptions === 'number' && typeof y === 'number') {
    window.pageXOffset = xOrOptions;
    window.pageYOffset = y;
  } else if (typeof xOrOptions === 'object') {
    window.pageXOffset = xOrOptions.left || 0;
    window.pageYOffset = xOrOptions.top || 0;
  }
});

window.scrollTo = scrollTo;
