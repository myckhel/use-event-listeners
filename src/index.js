import { useRef, useLayoutEffect } from 'react'
import EventEmitter from 'events'

export const emitter = new EventEmitter()

const useEventListener = (
  { listeners = {}, removeListeners = {}, params = {} },
  deps = []
) => {
  useLayoutEffect(() => {
    const names = Object.keys(listeners)

    if (names?.length) {
      const callbacks = {}

      names.map((name) => {
        const callback = (...payloads) => {
          const listener = listeners[name]
          return listener && listener(...payloads, params)
        }

        emitter.on(name, callback)
        callbacks[name] = callback
      })

      return () =>
        names.map((name) => {
          emitter.removeListener(name, callbacks[name])
          removeListeners[name] && removeListeners[name]()
        })
    }
  }, deps)

  return emitter
}

export const useEmitter = () => useRef(emitter).current

export default useEventListener
