import React, { useEffect } from 'react';
import { number } from 'prop-types';
import { render } from '@testing-library/react';
import useMatrix from '../useMatrix';

describe('useMatrix', () => {
  const Matrix = ({ defaultValue }) => {
    const [cols, setValues] = useMatrix(defaultValue);

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
        {cols.map((rows, i) => (
          <ul key={i}>
            {rows.map((value, j) => {
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
    defaultValue: 1
  };

  Matrix.propTypes = {
    defaultValue: number
  };

  it('Renders Default', () => {
    const DefaultMatrix = () => {
      const [cols, setValues] = useMatrix();

      useEffect(() => {
        setValues(['One', 'Two', 'Three']);
      }, [setValues]);

      return (
        <ul>
          {cols.map((rows, i) => (
            <ul key={i}>
              {rows.map((value, j) => (
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
    const { queryByText } = render(<Matrix defaultValue={0} />);

    expect(queryByText('Rick Sanchez')).toBeInTheDocument();
    expect(queryByText('Beth Sanchez')).toBeInTheDocument();
    expect(queryByText('Morty Smith')).toBeInTheDocument();
    expect(queryByText('Summer Smith')).toBeInTheDocument();
    expect(queryByText('Jerry Smith')).toBeInTheDocument();
  });
});
