import React, { useEffect } from 'react';
import { array, func } from 'prop-types';
import { render, fireEvent } from '@testing-library/react';
import useArray from '../useArray';

describe('useArray', () => {
  const List = ({ defaultValues, render }) => {
    const {
      values,
      setValues: setAllValues,
      addValue,
      setValue: setOneValue,
      delValue
    } = useArray(defaultValues);

    return render({
      values,
      setAllValues,
      addValue,
      setOneValue,
      delValue
    });
  };

  List.defaultProps = {
    defaultValues: []
  };

  List.propTypes = {
    defaultValues: array,
    render: func
  };

  it('Should The Hook Works With Default Behaviour', () => {
    const DefaultList = () => {
      const { values, setValues: setAllValues } = useArray();

      useEffect(() => {
        setAllValues(['One', 'Two']);
      }, [setAllValues]);

      return (
        <ul>
          {values.map((value, idx) => (
            <li key={idx}>{value}</li>
          ))}
        </ul>
      );
    };

    const { container, queryByText } = render(<DefaultList />);

    expect(container).toBeDefined();
    expect(queryByText('One')).toBeInTheDocument();
    expect(queryByText('Two')).toBeInTheDocument();
  });

  it('Should The Hook Has Right Values', () => {
    const { queryByText } = render(
      <List
        defaultValues={['One', 'Two']}
        render={({ values }) => (
          <ul>
            {values.map((value, idx) => (
              <li key={idx}>{value}</li>
            ))}
          </ul>
        )}
      />
    );

    expect(queryByText('One')).toBeInTheDocument();
    expect(queryByText('Two')).toBeInTheDocument();
  });

  it("Should 'addValue' Hook's Function Works Well", async () => {
    const { getByText, queryByText } = render(
      <List
        defaultValues={['One', 'Two']}
        render={({ values, addValue }) => (
          <div>
            <ul>
              {values.map((value, idx) => (
                <li key={idx}>{value}</li>
              ))}
            </ul>
            <button onClick={() => addValue('Three')}>Add</button>
          </div>
        )}
      />
    );

    const addButton = getByText('Add');

    await fireEvent.click(addButton);

    expect(queryByText('Three')).toBeInTheDocument();
  });

  it("Should 'setValue' Hook's Function Works Well (With A Key)", async () => {
    const rickAndMorty = [
      {
        firstName: 'Rick',
        lastName: 'Sanchez'
      },
      {
        firstName: 'Morty',
        lastName: 'Smith'
      }
    ];

    const { getAllByPlaceholderText, queryByDisplayValue } = render(
      <List
        defaultValues={rickAndMorty}
        render={({ values, setOneValue }) => (
          <ul>
            {values.map(({ firstName, lastName }, idx) => (
              <input
                key={idx}
                placeholder="Name"
                defaultValue={firstName}
                onChange={e =>
                  setOneValue(
                    { firstName: e.target.value, lastName },
                    'lastName'
                  )
                }
              />
            ))}
          </ul>
        )}
      />
    );

    const elements = getAllByPlaceholderText('Name');

    elements.forEach(async (element, idx) => {
      await fireEvent.change(element, {
        target: { value: ['Beth', 'Summer'][idx] }
      });
    });

    expect(queryByDisplayValue('Rick')).not.toBeInTheDocument();
    expect(queryByDisplayValue('Beth')).toBeInTheDocument();
    expect(queryByDisplayValue('Morty')).not.toBeInTheDocument();
    expect(queryByDisplayValue('Summer')).toBeInTheDocument();
  });

  it("Should 'delValue' Hook's Function Works Well", async () => {
    const { getByText, queryByText } = render(
      <List
        defaultValues={['One', 'Two']}
        render={({ values, delValue }) => (
          <div>
            <ul>
              {values.map((value, idx) => (
                <li key={idx}>{value}</li>
              ))}
            </ul>
            <button onClick={() => delValue('One')}>Del</button>
          </div>
        )}
      />
    );

    const delButton = getByText('Del');

    await fireEvent.click(delButton);

    expect(queryByText('One')).not.toBeInTheDocument();
  });

  it("Should 'delValue' Hook's Function Works Well (With A Key)", async () => {
    const rickAndMorty = [
      {
        firstName: 'Rick',
        lastName: 'Sanchez'
      },
      {
        firstName: 'Morty',
        lastName: 'Smith'
      }
    ];

    const { getByText, queryByText } = render(
      <List
        defaultValues={rickAndMorty}
        render={({ values, delValue }) => (
          <div>
            <ul>
              {values.map(({ firstName, lastName }, idx) => (
                <li key={idx}>{`${firstName} ${lastName}`}</li>
              ))}
            </ul>
            <button onClick={() => delValue('Smith', 'lastName')}>Del</button>
          </div>
        )}
      />
    );

    const delButton = getByText('Del');

    await fireEvent.click(delButton);

    expect(queryByText('Rick Sanchez')).toBeInTheDocument();
    expect(queryByText('Morty Smith')).not.toBeInTheDocument();
  });
});
