import React, { useState } from 'react'

import useEventListener, { emitter, useEmitter } from 'use-event-listeners'

const App = () => {
  const [show, setShow] = useState(true)

  return (
    <div className='App'>
      {show ? (
        <Section>
          <Title text='useEventListener Usage' />
          <Basic />
        </Section>
      ) : (
        <h5 className='warn'>input unmounted</h5>
      )}

      <Section>
        <Title text='emitter Usage' />
        <Emitter />
      </Section>

      <Section>
        <Title text='useEmitter Usage' />
        <UseEmitter />
      </Section>

      <Section>
        <Title text='toggle listener' />
        <Toggle setShow={setShow} />
      </Section>
    </div>
  )
}

const Basic = () => {
  const [text, setText] = useState('')

  const emmitter = useEventListener(
    {
      listeners: {
        setText: (text) => {
          console.log(text)
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
        <Renderer text={text} />
        <Typer text={text} emmitter={emmitter} />
      </div>
    </div>
  )
}

const UseEmitter = () => {
  const emitter = useEmitter()

  return (
    <button onClick={() => emitter.emit('setText', '')}>Reset input</button>
  )
}

const Emitter = () => {
  return (
    <button onClick={() => emitter.emit('setText', 1)}>Set input to 1</button>
  )
}

const Toggle = ({ setShow }) => {
  return <button onClick={() => setShow((show) => !show)}>Toggle input</button>
}

const Renderer = ({ text }) => <div>Text input: {text}</div>

const Typer = ({ emmitter, text }) => (
  <input
    value={text}
    onChange={({ target: { value } }) => emmitter.emit('setText', value)}
  />
)

const Title = ({ text }) => <h3>{text}</h3>

const Section = ({ children }) => <div className='section'>{children}</div>

export default App
