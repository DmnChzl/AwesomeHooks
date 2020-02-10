import React, { useEffect } from 'react';
import { number, string } from 'prop-types';
import { render } from '@testing-library/react';
import useMatrix from '../useMatrix';

describe('useMatrix', () => {
  const Matrix = ({ defaultValue, filter, filterKey }) => {
    const [getValues, setValues] = useMatrix(defaultValue);

    useEffect(() => {
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

      setValues([
        ...rickAndMorty,
        {
          firstName: 'Beth',
          lastName: 'Sanchez'
        },
        {
          firstName: 'Summer',
          lastName: 'Smith'
        },
        {
          firstName: 'Jerry',
          lastName: 'Smith'
        }
      ]);
    }, [setValues]);

    return (
      <ul>
        {getValues(filter, filterKey).map((values, i) => (
          <ul key={i}>
            {values.map((value, j) => {
              if (value) {
                const { firstName, lastName } = value;

                return <li key={j}>{`${firstName} ${lastName}`}</li>;
              }

              return <li key={j} />;
            })}
          </ul>
        ))}
      </ul>
    );
  };

  Matrix.defaultProps = {
    defaultValue: 1,
    filter: '',
    filterKey: ''
  };

  Matrix.propTypes = {
    defaultValue: number,
    filter: string,
    filterKey: string
  };

  it('Renders Default', () => {
    const DefaultMatrix = () => {
      const [getValues, setValues] = useMatrix();

      useEffect(() => {
        setValues(['One', 'Two', 'Three']);
      }, [setValues]);

      return (
        <ul>
          {getValues().map((values, i) => (
            <ul key={i}>
              {values.map((value, j) => (
                <li key={j}>{value}</li>
              ))}
            </ul>
          ))}
        </ul>
      );
    };

    const { container, queryByText } = render(<DefaultMatrix />);

    expect(container).toBeDefined();
    expect(queryByText('One')).toBeInTheDocument();
    expect(queryByText('Two')).toBeInTheDocument();
    expect(queryByText('Three')).toBeInTheDocument();
  });

  it('Get Matrix Values By Key', () => {
    const { queryByText } = render(
      <Matrix defaultValue={0} filter="Smith" filterKey="lastName" />
    );

    expect(queryByText('Rick Sanchez')).not.toBeInTheDocument();
    expect(queryByText('Beth Sanchez')).not.toBeInTheDocument();
    expect(queryByText('Morty Smith')).toBeInTheDocument();
    expect(queryByText('Summer Smith')).toBeInTheDocument();
    expect(queryByText('Jerry Smith')).toBeInTheDocument();
  });
});
