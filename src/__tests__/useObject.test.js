import React, { useEffect } from 'react';
import { object } from 'prop-types';
import { render } from '@testing-library/react';
import useObject from '../useObject';

describe('useObject', () => {
  const Data = () => {
    const [obj, setObj] = useObject();

    useEffect(() => {
      setObj({
        firstName: 'Rick',
        lastName: 'Sanchez'
      });
      // eslint-disable-next-line
    }, []);

    return (
      <ul>
        {Object.entries(obj).map(([key, value], idx) => (
          <li key={idx}>
            {key}: {value}
          </li>
        ))}
      </ul>
    );
  };

  Data.propTypes = {
    defaultValue: object
  };

  it('Renders', () => {
    const { queryByText } = render(<Data />);

    expect(queryByText('firstName: Rick')).toBeInTheDocument();
    expect(queryByText('lastName: Sanchez')).toBeInTheDocument();
  });
});
