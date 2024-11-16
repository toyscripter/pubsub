/**
 * This module contains a contructor for an object that can publish and subscribe events.
 * @module
 */

type EventCallback<T> = (data: T) => void;

export class PubSub<T> {
  private events: Record<string, EventCallback<T>[]> = {};

  /** Subscribe to an event */
  subscribe(event: string, callback: EventCallback<T>): void {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  /** Unsubscribe from an event */
  unsubscribe(event: string, callback: EventCallback<T>): void {
    if (!this.events[event]) return;

    this.events[event] = this.events[event].filter(cb => cb !== callback);
  }

  /** Emit an event to all subscribers */
  emit(event: string, data: T): void {
    if (!this.events[event]) return;

    this.events[event].forEach(callback => callback(data));
  }

  /** Clear all subscriptions for an event */
  clear(event: string): void {
    delete this.events[event];
  }
}
