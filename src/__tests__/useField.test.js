import React from 'react';
import { string, func } from 'prop-types';
import { render, fireEvent } from '@testing-library/react';
import useField from '../useField';

describe('useField', () => {
  const Field = ({ defaultValue, children }) => {
    const { value, error, setValue, setError, reset } = useField(defaultValue);

    return children({
      value,
      error,
      setValue,
      setError,
      reset
    });
  };

  Field.defaultProps = {
    defaultValue: ''
  };

  Field.propTypes = {
    defaultValue: string,
    children: func
  };

  it('Should The Hook Works With Default Behaviour', () => {
    const DefaultField = () => {
      const { value, error } = useField();

      return (
        <div>
          <span title="Value">{value}</span>
          <p title="Error">{error}</p>
        </div>
      );
    };

    const { container, queryByTitle } = render(<DefaultField />);

    expect(container).toBeDefined();
    expect(queryByTitle('Value').innerHTML).toHaveLength(0);
    expect(queryByTitle('Error').innerHTML).toHaveLength(0);
  });

  it("Should 'setValue' Hook's Function Works Well", async () => {
    const { queryByDisplayValue, getByPlaceholderText } = render(
      <Field defaultValue="Lorem Ipsum">
        {({ value, setValue }) => (
          <div>
            <input
              placeholder="Field"
              defaultValue={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        )}
      </Field>
    );

    expect(queryByDisplayValue('Lorem Ipsum')).toBeInTheDocument();

    const input = getByPlaceholderText('Field');

    await fireEvent.change(input, { target: { value: 'Test' } });

    expect(queryByDisplayValue('Test')).toBeInTheDocument();
  });

  it("Should 'setError' Hook's Function Works Well", async () => {
    const { getByPlaceholderText, queryByText } = render(
      <Field defaultValue="Lorem Ipsum">
        {({ value, setValue, error, setError }) => (
          <div>
            <input
              placeholder="Field"
              defaultValue={value}
              onChange={(e) => {
                if (e.target.value.length < 5) {
                  setError('Too Short');
                }

                setValue(e.target.value);
              }}
            />
            {error && <p>{error}</p>}
          </div>
        )}
      </Field>
    );

    const input = getByPlaceholderText('Field');

    await fireEvent.change(input, { target: { value: 'Test' } });

    expect(queryByText('Too Short')).toBeInTheDocument();
  });

  it("Should 'reset' Hook's Function Works Well", async () => {
    const { getByText, queryByText, queryByTitle } = render(
      <Field defaultValue="Lorem Ipsum">
        {({ value, setValue, error, setError, reset }) => (
          <div>
            <span title="Value">{value}</span>
            <button
              onClick={() => {
                setError('Too Short');
                setValue('Test');
              }}>
              Set
            </button>
            <p title="Error">{error}</p>
            <button onClick={reset}>Reset</button>
          </div>
        )}
      </Field>
    );

    const setButton = getByText('Set');

    await fireEvent.click(setButton);

    expect(queryByText('Test')).toBeInTheDocument();
    expect(queryByText('Too Short')).toBeInTheDocument();

    const resetButton = getByText('Reset');

    await fireEvent.click(resetButton);

    expect(queryByTitle('Value').innerHTML).toEqual('Lorem Ipsum');
    expect(queryByTitle('Error').innerHTML).toHaveLength(0);
  });
});
