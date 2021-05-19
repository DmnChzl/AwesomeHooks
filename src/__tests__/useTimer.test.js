import React from 'react';
import { arrayOf, number } from 'prop-types';
import { render, waitFor } from '@testing-library/react';
import useTimer, { useInterval } from '../useTimer';
import {
  getYear,
  getMonth,
  getDays,
  getHours,
  getMinutes,
  getSeconds
} from '../utils/dateUtils';

describe('useInterval', () => {
  const HelloWorld = () => {
    useInterval(() => {
      console.log('Hello Again !');
    }, null);

    return <span>Hello World</span>;
  };

  it('Should The Hook Works With Default Behaviour', () => {
    const { container } = render(<HelloWorld />);

    expect(container).toBeDefined();
  });
});

// jest.setTimeout(10000);

describe('useTimer', () => {
  const Calendar = ({ defaultValues }) => {
    const { days, hours, minutes, seconds } = useTimer(...defaultValues);

    return (
      <div>
        <h1>Days: {days}</h1>
        <h2>Hours: {hours}</h2>
        <h3>Minutes: {minutes}</h3>
        <h4>Seconds: {seconds}</h4>
      </div>
    );
  };

  Calendar.propTypes = {
    defaultValues: arrayOf(number)
  };

  it('Should The Hook Works With Default Behaviour', async () => {
    const DefaultCalendar = () => {
      const { hours: hh, minutes: mm, seconds: ss } = useTimer();

      return (
        <span>
          {hh}:{mm}:{ss}
        </span>
      );
    };

    const { container } = render(<DefaultCalendar />);

    expect(container).toBeDefined();
  });

  it('[Wait For... Days] Should The Hook Works Well', async () => {
    const { queryByText } = render(
      <Calendar
        defaultValues={[
          getYear(),
          getMonth(),
          getDays(),
          getHours() + 24,
          getMinutes(),
          getSeconds() + 1
        ]}
      />
    );

    await waitFor(() => {
      expect(queryByText('Days: 1')).toBeInTheDocument();
      expect(queryByText('Hours: 0')).toBeInTheDocument();
      expect(queryByText('Minutes: 0')).toBeInTheDocument();
      expect(queryByText('Seconds: 0')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(queryByText('Days: 0')).toBeInTheDocument();
      expect(queryByText('Hours: 23')).toBeInTheDocument();
      expect(queryByText('Minutes: 59')).toBeInTheDocument();
      expect(queryByText('Seconds: 59')).toBeInTheDocument();
    });
  });

  it('[Wait For... Hours] Should The Hook Works Well', async () => {
    const { queryByText } = render(
      <Calendar
        defaultValues={[
          getYear(),
          getMonth(),
          getDays(),
          getHours(),
          getMinutes() + 60,
          getSeconds() + 1
        ]}
      />
    );

    expect(queryByText('Days: 0')).toBeInTheDocument();

    await waitFor(() => {
      expect(queryByText('Hours: 1')).toBeInTheDocument();
      expect(queryByText('Minutes: 0')).toBeInTheDocument();
      expect(queryByText('Seconds: 0')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(queryByText('Hours: 0')).toBeInTheDocument();
      expect(queryByText('Minutes: 59')).toBeInTheDocument();
      expect(queryByText('Seconds: 59')).toBeInTheDocument();
    });
  });

  it('[Wait For... Minutes] Should The Hook Works Well', async () => {
    const { queryByText } = render(
      <Calendar
        defaultValues={[
          getYear(),
          getMonth(),
          getDays(),
          getHours(),
          getMinutes(),
          getSeconds() + 61
        ]}
      />
    );

    expect(queryByText('Days: 0')).toBeInTheDocument();
    expect(queryByText('Hours: 0')).toBeInTheDocument();

    await waitFor(() => {
      expect(queryByText('Minutes: 1')).toBeInTheDocument();
      expect(queryByText('Seconds: 0')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(queryByText('Minutes: 0')).toBeInTheDocument();
      expect(queryByText('Seconds: 59')).toBeInTheDocument();
    });
  });

  it('[Wait For... Seconds] Should The Hook Works Well', async () => {
    const { queryByText } = render(
      <Calendar
        defaultValues={[
          getYear(),
          getMonth(),
          getDays(),
          getHours(),
          getMinutes(),
          getSeconds() + 2
        ]}
      />
    );

    expect(queryByText('Days: 0')).toBeInTheDocument();
    expect(queryByText('Hours: 0')).toBeInTheDocument();
    expect(queryByText('Minutes: 0')).toBeInTheDocument();

    await waitFor(() => {
      expect(queryByText('Seconds: 1')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(queryByText('Seconds: 0')).toBeInTheDocument();
    });
  });
});
