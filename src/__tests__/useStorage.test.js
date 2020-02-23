import React, { useEffect } from 'react';
import { bool, node } from 'prop-types';
import { render } from '@testing-library/react';
import useStorage from '../useStorage';

describe('useStorage', () => {
  const Wrapper = ({ isLocal, children }) => {
    const [objStored, setObjStored] = useStorage('rickAndMorty', isLocal);

    useEffect(() => {
      setObjStored({
        firstName: 'Rick',
        lastName: 'Sanchez'
      });
    }, []);

    return <div>{Object.entries(objStored).length !== 0 && children}</div>;
  };

  Wrapper.defaultProps = {
    isLocal: false
  };

  Wrapper.propTypes = {
    isLocal: bool,
    children: node
  };

  it('Should The Hook Works With Default Behaviour', () => {
    const { container } = render(<Wrapper>Hello World</Wrapper>);

    expect(container).toBeDefined();
  });

  it("Should The Hook Works Well (With 'sessionStorage')", () => {
    const Session = () => {
      const [objStored, setObjStored] = useStorage('rickAndMorty');

      useEffect(() => {
        setObjStored({
          firstName: 'Morty',
          lastName: 'Smith'
        });
      }, []);

      return (
        <ul>
          {Object.entries(objStored).map(([key, value], idx) => (
            <li key={idx}>
              {key}: {value}
            </li>
          ))}
        </ul>
      );
    };

    const { queryByText } = render(
      <Wrapper>
        <Session />
      </Wrapper>
    );

    expect(queryByText('firstName: Morty')).toBeInTheDocument();
    expect(queryByText('lastName: Smith')).toBeInTheDocument();
  });

  it("Should The Hook Works Well (With 'localStorage')", () => {
    const Local = () => {
      const [obj, setObj] = useStorage('rickAndMorty', true);

      useEffect(() => {
        setObj({
          firstName: 'Morty',
          lastName: 'Smith'
        });
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

    const { queryByText } = render(
      <Wrapper>
        <Local />
      </Wrapper>
    );

    expect(queryByText('firstName: Morty')).toBeInTheDocument();
    expect(queryByText('lastName: Smith')).toBeInTheDocument();
  });
});
