import React from 'react';
import { string } from 'prop-types';
import { render, fireEvent } from '@testing-library/react';
import useInput from '../useInput';

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

  it('Renders Default', () => {
    const DefaultInput = () => {
      const [value] = useInput();

      return <input placeholder="Input" defaultValue={value} />;
    };

    const { container, getByPlaceholderText } = render(<DefaultInput />);

    expect(container).toBeDefined();
    expect(getByPlaceholderText('Input').value).toHaveLength(0);
  });

  it('Input Value', () => {
    const { queryByDisplayValue } = render(
      <Input defaultValue="Lorem Ipsum" />
    );

    expect(queryByDisplayValue('Lorem Ipsum')).toBeInTheDocument();
  });

  it('Set Input', async () => {
    const { getByPlaceholderText, queryByDisplayValue } = render(
      <Input defaultValue="Lorem Ipsum" />
    );

    const input = getByPlaceholderText('Input');

    await fireEvent.change(input, { target: { value: 'Test' } });

    expect(queryByDisplayValue('Test')).toBeInTheDocument();
  });
});
