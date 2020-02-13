[![npm](https://img.shields.io/npm/v/@mrdoomy/awesome-hooks.svg)](https://github.com/mrdoomy/mrdoomy/awesomehooks) [![build](https://travis-ci.org/MrDoomy/AwesomeHooks.svg)](https://travis-ci.org/MrDoomy/AwesomeHooks.svg) [![minified size](https://img.shields.io/bundlephobia/min/@mrdoomy/awesome-hooks.svg)](https://www.npmjs.com/package/@mrdoomy/awesome-hooks) [![codecov](https://img.shields.io/codecov/c/github/MrDoomy/AwesomeHooks.svg)](https://codecov.io/gh/MrDoomy/AwesomeHooks) [![beerware](https://img.shields.io/badge/license-beerware-orange.svg)](https://wikipedia.org/wiki/beerware)

# Awesome Hooks

**[@mrdoomy](https://www.mrdoomy.xyz)/awesome-hooks** is a collection of custom React hooks.

This library is published with the Beerware license, which means you can do whatever you want with the code.

## Hooks

Below, the list of all available hooks:

**useCounter**

> Use it to create a simple counter

```js
import React from 'react';
import { useCounter } from '@mrdoomy/awesome-hooks';

export default function Counter(props) {
  const [value, addOne, delOne, reset] = useCounter(0);

  return (
    <div>
      {value}
      <button onClick={addOne}>+1</button>
      <button onClick={delOne}>-1</button>
      <button onClick={reset}>0</button>
    </div>
  );
}
```

**useDocumentTitle**

> Use it to change the site title

```js
import React from 'react';
import { useDocumentTitle } from '@mrdoomy/awesome-hooks';

export default function HelloWorld(props) {
  useDocumentTitle('Hello World');

  return <div>{/* ... */}</div>;
}
```

**useMeta**

> Use it to add / change a metadata

```js
import React from 'react';
import { useMeta } from '@mrdoomy/awesome-hooks';

export default function LoremIpsum(props) {
  useMeta('theme-color', '#2a2c2e');
  useMeta('description', 'Lorem Ipsum Dolor Sit Amet');

  return <div>{/* ... */}</div>;
}
```

**useInput**

> Use it to handle the behaviour of an input

```js
import React from 'react';
import { useInput } from '@mrdoomy/awesome-hooks';

export default function Input(props) {
  const [value, setValue] = useInput('');

  return <input defaultValue={value} onChange={setChange} />;
}
```

**useField**

> Use it to associate a value with a potential error (example with a form field)

```js
import React from 'react';
import { useField } from '@mrdoomy/awesome-hooks';

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

> Use it to handle an array

```js
import React, { useEffect } from 'react';
import { useArray } from '@mrdoomy/awesome-hooks';

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
      {values.map(({ firstName, lastName }) => {
        <li>
          <input defaultValue={value.firstName} onChange={e => setValue(e.target.value, 'firstName')}>
          <button onClick={() => delValue(lastName, 'lastName')}>
            Del
          </button>
        </li>
      })}
      <button onClick={() => addValue({ firstName: 'Summer', lastName: 'Smith' })}>
        Add
      </button>
    </ul>
  );
}
```

**useMatrix**

> Use it to transform an array into a matrix (useful to comply with bootstrap standards)

```js
import React, { useEffect } from 'react';
import { useMatrix } from '@mrdoomy/awesome-hooks';

export default function Grid(props) {
  const { rows, setValues } = useMatrix(4);

  useEffect(() => {
    let values = [];

    for (let i = 0; i < 12; i++) {
      values = [...values, `Val ${i}`];
    }

    setValues(values);
  }, [setValues]);

  return (
    <div>
      {rows.map((cols, i) => (
        <div key={i} className="row">
          {cols.map((value, j) => (
            <div key={j} className="col">
              {value}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
```

### Miscellaneous

If you want more,

You can clone the project:

```
git clone https://github.com/mrdoomy/awesomehooks.git
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
