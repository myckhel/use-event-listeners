# use-event-listeners

> React node event hook

[![NPM](https://img.shields.io/npm/v/use-event-listeners.svg)](https://www.npmjs.com/package/use-event-listeners) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-event-listeners
```

See [Nodejs Event](https://nodejs.org/api/events.html)

## Usage

### useEventListener

```jsx
import React, { useState } from 'react'

import useEventListener from 'use-event-listeners'

export default () => {
  const [text, setText] = useState('')

  const emmitter = useEventListener(
    {
      listeners: {
        setText: (text) => {
          setText(text)
        }
      },
      removeListeners: {
        setText: () => console.log('setText removed')
      }
    },
    []
  )

  return (
    <div>
      <div>
        Using useEventListener{' '}
        <span aria-label='smile' role='img'>
          😄
        </span>
        <div>Text input: {text}</div>
        <input
          value={text}
          onChange={({ target: { value } }) => emmitter.emit('setText', value)}
        />
      </div>
    </div>
  )
}
```

### useEmitter
```jsx
import React, { useState } from 'react'
import { useEmitter} from 'use-event-listeners'

const UseEmitter = () => {
  const emitter = useEmitter()

  return (
    <button onClick={() => emitter.emit('setText', '')}>Reset input</button>
  )
}
```

## Apis
### useEventListener
```ts
useEventListener({
  listeners: {'eventName': (...payloads, params) => any},

  removeListeners: {'eventName': () => any},

  params: {}
}, []: dependency): emitter
```

## useEmitter
```ts
useEmitter(): emitter
```

## emit
```ts
emitter.emit('eventName', ...payloads)
```

## License

MIT © [myckhel](https://github.com/myckhel)
