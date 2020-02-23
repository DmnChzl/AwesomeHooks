import React, { useEffect } from 'react';
import { number } from 'prop-types';
import { render } from '@testing-library/react';
import useMatrix from '../useMatrix';

describe('useMatrix', () => {
  const Matrix = ({ defaultValue }) => {
    const [rows, setValues] = useMatrix(defaultValue);

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
        {rows.map((cols, i) => (
          <ul key={i}>
            {cols.map((value, j) => {
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

  it('Should The Hook Works With Default Behaviour', () => {
    const DefaultMatrix = () => {
      const [rows, setValues] = useMatrix();

      useEffect(() => {
        setValues(['One', 'Two', 'Three']);
      }, [setValues]);

      return (
        <ul>
          {rows.map((cols, i) => (
            <ul key={i}>
              {cols.map((value, j) => (
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

  it('Should The Hook Works Well', () => {
    const { queryByText } = render(<Matrix defaultValue={0} />);

    expect(queryByText('Rick Sanchez')).toBeInTheDocument();
    expect(queryByText('Beth Sanchez')).toBeInTheDocument();
    expect(queryByText('Morty Smith')).toBeInTheDocument();
    expect(queryByText('Summer Smith')).toBeInTheDocument();
    expect(queryByText('Jerry Smith')).toBeInTheDocument();
  });
});
