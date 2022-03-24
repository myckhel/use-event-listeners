import { useRef, useLayoutEffect, DependencyList } from 'react'
import EventEmitter from 'events'

export const emitter = new EventEmitter()

export type UseListenersCallback = (...payloads: any) => any

export interface UseListenersCallbacks {
  [key: string]: UseListenersCallback
}

type AnyObject<T = any> = { [key: string]: T }

export interface UseListenersOptions {
  listeners?: UseListenersCallbacks
  removeListeners?: UseListenersCallbacks
  params?: AnyObject
}

const useEventListener = (
  { listeners = {}, removeListeners = {}, params = {} }: UseListenersOptions,
  deps: DependencyList = []
) => {
  useLayoutEffect(() => {
    const names = Object.keys(listeners)

    if (names?.length) {
      const callbacks = {}

      names.map((name) => {
        const callback = (...payloads: any) => {
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
    return () => {}
  }, deps)

  return emitter
}

export const useEmitter = () => useRef(emitter).current

export { useEventListener as default, useEventListener }
