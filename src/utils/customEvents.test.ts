import { subscribe, unsubscribe, publish } from './customEvents'

describe('subscribe', () => {
  it('adds event listener to document', () => {
    const eventName = 'testEvent'
    const listener = vi.fn()

    subscribe(eventName, listener)

    // Simulate event dispatch
    const event = new Event(eventName)
    document.dispatchEvent(event)

    expect(listener).toHaveBeenCalled()
  })
})

describe('unsubscribe', () => {
  it('removes event listener from document', () => {
    const eventName = 'testEvent'
    const listener = vi.fn()

    // Subscribe first
    subscribe(eventName, listener)

    // Unsubscribe
    unsubscribe(eventName, listener)

    // Simulate event dispatch
    const event = new Event(eventName)
    document.dispatchEvent(event)

    expect(listener).not.toHaveBeenCalled()
  })
})

describe('publish', () => {
  it('dispatches custom event with data', () => {
    const eventName = 'testEvent'
    const eventData = { foo: 'bar' }

    const listener = vi.fn()

    // Subscribe to the event
    subscribe(eventName, listener)

    // Publish the event
    publish(eventName, eventData)

    // Expect the listener to be called with the event data
    expect(listener).toHaveBeenCalledWith(
      expect.objectContaining({ detail: eventData })
    )
  })
})
