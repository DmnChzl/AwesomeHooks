import React from 'react';
import { number } from 'prop-types';
import { render, fireEvent } from '@testing-library/react';
import useCounter from '../useCounter';

describe('useCounter', () => {
  const Counter = ({ defaultValue }) => {
    const { value, add: addOne, del: delOne, reset } = useCounter(defaultValue);

    return (
      <div>
        <span title="Counter">{value}</span>
        <button onClick={() => addOne()}>Increment</button>
        <button onClick={() => delOne()}>Decrement</button>
        <button onClick={reset}>Reset</button>
      </div>
    );
  };

  Counter.defaultProps = {
    defaultValue: 0
  };

  Counter.propTypes = {
    defaultValue: number
  };

  it('Renders Default', () => {
    const DefaultCounter = () => {
      const { value } = useCounter();

      return <span title="Counter">{value}</span>;
    };

    const { container, getByTitle } = render(<DefaultCounter />);

    expect(container).toBeDefined();
    expect(getByTitle('Counter').innerHTML).toEqual('0');
  });

  it('Counter Value', () => {
    const { getByTitle } = render(<Counter defaultValue={42} />);

    expect(getByTitle('Counter').innerHTML).toEqual('42');
  });

  it('Increment Counter', async () => {
    const { getByText, getByTitle } = render(<Counter defaultValue={40} />);

    const incrementButton = getByText('Increment');

    await fireEvent.click(incrementButton);
    await fireEvent.click(incrementButton);

    expect(getByTitle('Counter').innerHTML).toEqual('42');
  });

  it('Decrement Counter', async () => {
    const { getByText, getByTitle } = render(<Counter defaultValue={44} />);

    const decrementButton = getByText('Decrement');

    await fireEvent.click(decrementButton);
    await fireEvent.click(decrementButton);

    expect(getByTitle('Counter').innerHTML).toEqual('42');
  });

  it('Reset Counter', async () => {
    const { getByText, getByTitle } = render(<Counter defaultValue={42} />);

    const resetButton = getByText('Reset');

    await fireEvent.click(resetButton);

    expect(getByTitle('Counter').innerHTML).toEqual('0');
  });
});
