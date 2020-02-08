import React, { useEffect } from 'react';
import { number, string } from 'prop-types';
import { render, fireEvent } from '@testing-library/react';
import { useCounter, useInput, useArray } from '../hooks';

describe('useCounter', () => {
  const Counter = ({ defaultValue }) => {
    const [value, increment, decrement, reset] = useCounter(defaultValue);

    return (
      <div>
        <span title="Counter">{value}</span>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
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

  it('Renders', () => {
    const { container } = render(<Counter />);

    expect(container).toBeDefined();
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

  it('Counter Decrement', async () => {
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

describe('useInput', () => {
  const Input = ({ defaultValue }) => {
    const [value, setValue] = useInput(defaultValue);

    return (
      <input placeholder="Input" defaultValue={value} onChange={setValue} />
    );
  };

  Input.defaultProps = {
    defaultValue: ''
  };

  Input.propTypes = {
    defaultValue: string
  };

  it('Renders', () => {
    const { container } = render(<Input />);

    expect(container).toBeDefined();
  });

  it('Input Value', () => {
    const { getByPlaceholderText } = render(
      <Input defaultValue="Lorem Ipsum" />
    );

    expect(getByPlaceholderText('Input').value).toEqual('Lorem Ipsum');
  });

  it('Set Input', async () => {
    const { getByPlaceholderText } = render(
      <Input defaultValue="Lorem Ipsum" />
    );

    const input = getByPlaceholderText('Input');

    await fireEvent.change(input, { target: { value: 'Test' } });

    expect(input.value).toEqual('Test');
  });
});

describe('useArray', () => {
  const Array = () => {
    const [values, setValues, addValue, delValue] = useArray();

    useEffect(() => {
      setValues(['One', 'Two']);
    }, [setValues]);

    return (
      <div>
        <ul>
          {values.map((value, idx) => (
            <li key={idx}>{value}</li>
          ))}
        </ul>
        <button onClick={() => addValue('Three')}>Add</button>
        <button onClick={() => delValue('Two')}>Del</button>
      </div>
    );
  };

  it('Renders', () => {
    const { container } = render(<Array />);

    expect(container).toBeDefined();
  });

  it('Array Values', () => {
    const { queryByText } = render(<Array />);

    expect(queryByText('One')).toBeInTheDocument();
    expect(queryByText('Two')).toBeInTheDocument();
  });

  it('Add Value', async () => {
    const { getByText, queryByText } = render(<Array />);

    const addButton = getByText('Add');

    await fireEvent.click(addButton);

    expect(queryByText('Three')).toBeInTheDocument();
  });

  it('Del Value', async () => {
    const { getByText, queryByText } = render(<Array />);

    const delButton = getByText('Del');

    await fireEvent.click(delButton);

    expect(queryByText('Two')).not.toBeInTheDocument();
  });
});
