# use-event-listeners

> React node event hook
`use-event-listeners` is a React hook that enables you to easily manage event listeners within your components. With this hook, you can efficiently handle various events and their corresponding actions, making your code more organized and maintainable.

[![NPM](https://img.shields.io/npm/v/use-event-listeners.svg)](https://www.npmjs.com/package/use-event-listeners) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Installation

```bash
npm install --save use-event-listeners
```

See [Nodejs Event](https://nodejs.org/api/events.html)

### Usage

Here's a simple example demonstrating how to use `use-event-listeners`:

```jsx
import React, { useState } from 'react'
import useEventListener from 'use-event-listeners'

const ExampleComponent = () => {
  const [text, setText] = useState('')

  const emitter = useEventListener(
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
          onChange={({ target: { value } }) => emitter.emit('setText', value)}
        />
      </div>
    </div>
  )
}

export default ExampleComponent
```

In this example:
- We import `useEventListener` from `use-event-listeners`.
- Inside the component, we define a state variable `text` and its setter function `setText` using the `useState` hook.
- We then use the `useEventListener` hook to create an `emitter` object, which manages event listeners.
- The `emitter` object listens for events specified in the `listeners` object. In this case, it listens for the `setText` event and updates the `text` state accordingly.
- We can also specify cleanup actions for removing listeners using the `removeListeners` object. In this example, we log a message when the `setText` listener is removed.
- Finally, we use the `emitter.emit` method to trigger the `setText` event when the input value changes, updating the `text` state.

### API

#### useEventListener(config, dependencies)

- `config`: An object containing configuration options for event listeners.
  - `listeners`: An object where keys represent event names and values are callback functions to handle those events.
  - `removeListeners`: An object where keys represent event names and values are callback functions to handle listener removal.
- `dependencies`: An array of dependencies. The hook will recompute listeners whenever any of these dependencies change.

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

### Conclusion

`use-event-listeners` simplifies event handling in React components by providing a straightforward API for managing event listeners. It's a useful tool for building interactive and responsive user interfaces in your React applications.

## License

MIT © [myckhel](https://github.com/myckhel)
