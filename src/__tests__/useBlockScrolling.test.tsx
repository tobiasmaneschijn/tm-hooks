import { render, fireEvent, waitFor } from '@testing-library/react';
import { useEffect } from 'react';
import useBlockScrolling from '../hooks/useBlockScrolling';
import React from 'react';

// Create a test component that uses the custom hook
const TestComponent = ({ startPosition }: { startPosition: 'top' | 'bottom' | 'none' }) => {
  const { blockScrolling, unblockScrolling } = useBlockScrolling(startPosition);

  useEffect(() => {
    blockScrolling();
  }, [blockScrolling]);

  return (
    <button onClick={unblockScrolling} data-testid="unblock-button">
      Unblock scrolling
    </button>
  );
};

describe('useBlockScrolling', () => {
  it('blocks scrolling and unblocks scrolling when the button is clicked', async () => {
    const { getByTestId } = render(<TestComponent startPosition="none" />);

    // Check if scrolling is initially blocked
    expect(document.body.style.overflow).toBe('hidden');

    // Click the unblock button
    fireEvent.click(getByTestId('unblock-button'));

    // Wait for the component to update
    await waitFor(() => expect(document.body.style.overflow).toBe('auto'));
  });

  it('sets the scroll position to the top', () => {
    render(<TestComponent startPosition="top" />);
    expect(window.scrollY).toBe(0);
  });

  it('sets the scroll position to the bottom', () => {
    const scrollToSpy = jest.spyOn(window, 'scrollTo');
    render(<TestComponent startPosition="bottom" />);
    expect(scrollToSpy).toHaveBeenCalledWith(0, document.body.scrollHeight);
    scrollToSpy.mockRestore();
  });
});
