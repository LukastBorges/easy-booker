export function subscribe(eventName: string, listener: EventListener) {
  document.addEventListener(eventName, listener)
}

export function unsubscribe(eventName: string, listener: EventListener) {
  document.removeEventListener(eventName, listener)
}

export function publish(eventName: string, data: unknown) {
  const event = new CustomEvent(eventName, { detail: data })

  document.dispatchEvent(event)
}
