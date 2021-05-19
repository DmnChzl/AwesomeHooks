import React from 'react';
import { render, waitFor } from '@testing-library/react';
import useMeta from '../useMeta';

describe('useMeta', () => {
  const LoremIpsum = () => {
    useMeta('description', 'Lorem Ipsum Dolor Sit Amet');

    return <span>Lorem Ipsum</span>;
  };

  it('Should The Hook Works Well', async () => {
    render(
      <>
        <LoremIpsum />
        <LoremIpsum />
      </>
    );

    await waitFor(() => {
      const metas = document.getElementsByTagName('meta');

      expect(metas['description'].content).toEqual(
        'Lorem Ipsum Dolor Sit Amet'
      );
    });
  });
});
