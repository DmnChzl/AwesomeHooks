import React from 'react';
import { render, wait } from '@testing-library/react';
import useMeta from '../useMeta';

describe('useMeta', () => {
  const HelloWorld = () => {
    useMeta('description', 'Lorem Ipsum Dolor Sit Amet');

    return <span>Lorem Ipsum</span>;
  };

  it('Renders', async () => {
    render(
      <>
        <HelloWorld />
        <HelloWorld />
      </>
    );

    await wait(() => {
      const metas = document.getElementsByTagName('meta');

      expect(metas['description'].content).toEqual(
        'Lorem Ipsum Dolor Sit Amet'
      );
    });
  });
});
