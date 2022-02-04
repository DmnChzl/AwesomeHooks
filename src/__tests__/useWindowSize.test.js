import React from 'react';
import { render } from '@testing-library/react';
import useWindowSize from '../useWindowSize';

describe('useWindowSize', () => {
  const Size = () => {
    const values = useWindowSize();

    return (
      <div>
        <span aria-label="Width Size">{values.width}</span>
        <span aria-label="Height Size">{values.height}</span>
      </div>
    );
  };

  it('Should The Hook Works With Default Behaviour', () => {
    global.innerWidth = 768;
    global.innerHeight = 1080;

    const { container, getByLabelText } = render(<Size />);

    expect(container).toBeDefined();
    expect(getByLabelText('Width Size').innerHTML).toEqual('768');
    expect(getByLabelText('Height Size').innerHTML).toEqual('1080');
  });
});
