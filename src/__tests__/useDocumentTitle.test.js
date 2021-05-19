import React from 'react';
import { render, waitFor } from '@testing-library/react';
import useDocumentTitle from '../useDocumentTitle';

describe('useDocumentTitle', () => {
  const Title = () => {
    useDocumentTitle('Hello World');

    return <span>Hello World</span>;
  };

  it('Should The Hook Works With Default Behaviour', async () => {
    const DefaultTitle = () => {
      useDocumentTitle();

      return <span>Hello World</span>;
    };

    render(<DefaultTitle />);

    await waitFor(() => {
      expect(document.title).toEqual('');
    });
  });

  it('Should The Hook Works Well', async () => {
    render(<Title />);

    await waitFor(() => {
      expect(document.title).toEqual('Hello World');
    });
  });
});
