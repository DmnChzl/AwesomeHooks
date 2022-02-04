[![npm](https://img.shields.io/npm/v/@dmnchzl/awesome-hooks.svg)](https://github.com/dmnchzl/awesomehooks) [![build](https://travis-ci.org/DmnChzl/AwesomeHooks.svg)](https://travis-ci.org/DmnChzl/AwesomeHooks.svg) [![minified size](https://img.shields.io/bundlephobia/min/@dmnchzl/awesome-hooks.svg)](https://www.npmjs.com/package/@dmnchzl/awesome-hooks) [![codecov](https://img.shields.io/codecov/c/github/DmnChzl/AwesomeHooks.svg)](https://codecov.io/gh/DmnChzl/AwesomeHooks) [![beerware](https://img.shields.io/badge/license-beerware-orange.svg)](https://wikipedia.org/wiki/beerware)

# Awesome Hooks

**@dmnchzl/awesome-hooks** is a collection of custom React hooks.

This library is published with the Beerware license, which means you can do whatever you want with the code.

## Hooks

Below, the list of all available hooks:

**useCounter**

> _Use it to create a ~~simple~~ counter_

```js
import React from 'react';
import { useCounter } from '@dmnchzl/awesome-hooks';

export default function Counter(props) {
  const { value, add, del, reset } = useCounter(0);

  return (
    <div>
      {value}
      <button onClick={() => add(2)}>+2</button>
      <button onClick={() => del(2)}>-2</button>
      <button onClick={reset}>0</button>
    </div>
  );
}
```

**useDocumentTitle**

> _Use it to change the site title_

```js
import React from 'react';
import { useDocumentTitle } from '@dmnchzl/awesome-hooks';

export default function HelloWorld(props) {
  useDocumentTitle('Hello World');

  return <div>{/* ... */}</div>;
}
```

**useMeta**

> _Use it to add / change a metadata_

```js
import React from 'react';
import { useMeta } from '@dmnchzl/awesome-hooks';

export default function LoremIpsum(props) {
  useMeta('theme-color', '#2a2c2e');
  useMeta('description', 'Lorem Ipsum Dolor Sit Amet');

  return <div>{/* ... */}</div>;
}
```

**useObject**

> _Use it to handle an object_

```js
import React, { useEffect } from 'react';
import { useObject } from '@dmnchzl/awesome-hooks';

export default function App(props) {
  const [person, setPerson, isEmpty] = useObject({
    firstName: 'Morty',
    lastName: 'Smith'
  });

  useEffect(() => {
    setPerson({
      firstName: 'Rick',
      lastName: 'Sanchez'
    });
  }, [setPerson]);

  return (
    <ul>
      {!isEmpty && Object.entries(person).map(([key, value], idx) => (
        <li key={idx}>
          {key}: {value}
        </li>
      ))}
    </ul>
  );
}
```

**useInput**

> _Use it to handle the behaviour of an input_

```js
import React from 'react';
import { useInput } from '@dmnchzl/awesome-hooks';

export default function Input(props) {
  const [value, setValue] = useInput('');

  return <input defaultValue={value} onChange={setChange} />;
}
```

**useField**

> _Use it to associate a value with a potential error (example with a form field)_

```js
import React from 'react';
import { useField } from '@dmnchzl/awesome-hooks';

export default function Form(props) {
  const { value, error, setValue, setError, reset } = useField('');

  const handleSubmit = event => {
    event.preventDefault();

    if (value.length < 5) {
      setError('Too Short');
    } else {
      setError('Too Long');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input defaultValue={value} onChange={e => setValue(e.target.value)} />
      {error && <p>{error}</p>}
      <button type="submit">Submit</button>
      <button onClick={reset}>Reset</button>
    </form>
  );
}
```

**useArray**

> _Use it to handle an array_

```js
import React, { useEffect } from 'react';
import { useArray } from '@dmnchzl/awesome-hooks';

export default function List(props) {
  const { values, setValues, addValue, setValue, delValue } = useArray([]);

  useEffect(() => {
    if (values.length < 0) {
      setValues([
        { firstName: 'Rick', lastName: 'Sanchez' },
        { firstName: 'Morty', lastName: 'Smith' }
      ]);
    }
  }, [values, setValues]);

  return (
    <ul>
      {values.map(({ firstName, lastName }) => (
        <li>
          <input defaultValue={value.firstName} onChange={e => setValue(e.target.value, 'firstName')}>
          <button onClick={() => delValue(lastName, 'lastName')}>
            Del
          </button>
        </li>
      ))}
      <button onClick={() => addValue({ firstName: 'Summer', lastName: 'Smith' })}>
        Add
      </button>
    </ul>
  );
}
```

**useToggle**

> _Use it to play with toggles_

```js
import React, { useEffect } from 'react';
import { useToggle } from '@dmnchzl/awesome-hooks';

export default function Toggle(props) {
  const [value, switchOn, switchOff] = useToggle(true);

  return (
    <div>
      {value}
      <button onClick={switchOn}>Switch On</button>
      <button onClick={switchOff}>Switch Off</button>
    </div>
  );
}
```

**useTimer**

> _Use it to play with a timer_

```js
import React from 'react';
import { useTimer } from '@dmnchzl/awesome-hooks';

export default function Calendar(props) {
  const { days, hours, minutes, seconds } = useTimer(2020, 4, 4, 12);

  return (
    <div>
      Remainin' Time Before May The 4th...
      <h1>Days: {days}</h1>
      <h2>Hours: {hours}</h2>
      <h3>Minutes: {minutes}</h3>
      <h4>Seconds: {seconds}</h4>
    </div>
  );
}
```

**useStorage**

> _Use it to handle an object (and persist it in the session / local storage)_

```js
import React, { useEffect } from 'react';
import { useStorage } from '@dmnchzl/awesome-hooks';

const USE_LOCAL_STORAGE = true;

export default function App(props) {
  const [person, setPerson] = useStorage('person', USE_LOCAL_STORAGE);

  useEffect(() => {
    setPerson({
      firstName: 'Rick',
      lastName: 'Sanchez'
    });
  }, [setPerson]);

  return (
    <ul>
      {Object.entries(person).map(([key, value], idx) => (
        <li key={idx}>
          {key}: {value}
        </li>
      ))}
    </ul>
  );
}
```

**useWindowSize**

> _use it to evaluate screen width and length_

```js
import React, { useEffect } from 'react';
import { useWindowSize } from '@dmnchzl/awesome-hooks';

export default function Size(props) {
  const size = useWindowSize();

  return (
    <div>
      <span aria-label="X">X: {size.width}</span>
      <span aria-label="Y">Y: {size.height}</span>
    </div>
  );
}
```

### Miscellaneous

If you want more,

You can clone the project:

```
git clone https://github.com/dmnchzl/awesomehooks.git
```

Install dependencies:

```
yarn install
```

Run all unit tests:

```
yarn test
```

And finally compile the project:

```
yarn build
```

## License

```
"THE BEER-WARE LICENSE" (Revision 42):
<phk@FreeBSD.ORG> wrote this file. As long as you retain this notice you
can do whatever you want with this stuff. If we meet some day, and you think
this stuff is worth it, you can buy me a beer in return. Damien Chazoule
```
