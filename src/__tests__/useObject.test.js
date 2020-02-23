import React, { useEffect } from 'react';
import { render } from '@testing-library/react';
import useObject from '../useObject';

describe('useObject', () => {
  const Data = () => {
    const [obj, setObj, isEmpty] = useObject();

    useEffect(() => {
      setObj({
        firstName: 'Rick',
        lastName: 'Sanchez'
      });
    }, []);

    return (
      <ul>
        {!isEmpty &&
          Object.entries(obj).map(([key, value], idx) => (
            <li key={idx}>
              {key}: {value}
            </li>
          ))}
      </ul>
    );
  };

  it('Should The Hook Works Well', () => {
    const { queryByText } = render(<Data />);

    expect(queryByText('firstName: Rick')).toBeInTheDocument();
    expect(queryByText('lastName: Sanchez')).toBeInTheDocument();
  });
});
