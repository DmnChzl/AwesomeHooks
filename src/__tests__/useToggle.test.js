import React from 'react';
import { bool } from 'prop-types';
import { render, fireEvent } from '@testing-library/react';
import useToggle from '../useToggle';

describe('useToggle', () => {
  const Toggle = ({ defaultValue }) => {
    const [value, setValueOn, setValueOff] = useToggle(defaultValue);

    return (
      <div>
        <span aria-label="Toggle">{`${value}`}</span>
        <button onClick={setValueOn}>Toggle On</button>
        <button onClick={setValueOff}>Toggle Off</button>
      </div>
    );
  };

  Toggle.defaultProps = {
    defaultValue: false
  };

  Toggle.propTypes = {
    defaultValue: bool
  };

  it('Should The Hook Works With Default Behaviour', () => {
    const DefaultToggle = () => {
      const [value] = useToggle();

      return <span aria-label="Toggle">{`${value}`}</span>;
    };

    const { container, getByLabelText } = render(<DefaultToggle />);

    expect(container).toBeDefined();
    expect(getByLabelText('Toggle').innerHTML).toEqual('false');
  });

  it('Should The Hook Has The Right Value', () => {
    const { getByLabelText } = render(<Toggle defaultValue />);

    expect(getByLabelText('Toggle').innerHTML).toEqual('true');
  });

  it("Should 'setValueOn' Hook's Function Works Well", async () => {
    const { getByText, getByLabelText } = render(<Toggle />);

    expect(getByLabelText('Toggle').innerHTML).toEqual('false');

    const toggleOnBtn = getByText('Toggle On');
    await fireEvent.click(toggleOnBtn);

    expect(getByLabelText('Toggle').innerHTML).toEqual('true');
  });

  it("Should 'setValueOff' Hook's Function Works Well", async () => {
    const { getByText, getByLabelText } = render(<Toggle defaultValue />);

    expect(getByLabelText('Toggle').innerHTML).toEqual('true');

    const toggleOffBtn = getByText('Toggle Off');
    await fireEvent.click(toggleOffBtn);

    expect(getByLabelText('Toggle').innerHTML).toEqual('false');
  });
});
