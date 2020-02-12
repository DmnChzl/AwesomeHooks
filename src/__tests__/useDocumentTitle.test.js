import React from 'react';
import { render, wait } from '@testing-library/react';
import useDocumentTitle from '../useDocumentTitle';

describe('useDocumentTitle', () => {
  const Title = () => {
    useDocumentTitle('Hello World');

    return <span>Hello World</span>;
  };

  it('Renders', async () => {
    const DefaultTitle = () => {
      useDocumentTitle();

      return <span>Hello World</span>;
    };

    render(<DefaultTitle />);

    await wait(() => {
      expect(document.title).toEqual('');
    });
  });

  it('Renders', async () => {
    render(<Title />);

    await wait(() => {
      expect(document.title).toEqual('Hello World');
    });
  });
});
