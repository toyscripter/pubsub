## PubSub

A publish-subscribe utility for managing event-driven communication.

### Usage Example

```ts
import { PubSub } from '@toy/pubsub';

const pubsub = new PubSub<string>();

// Subscriber 1
pubsub.subscribe('greeting', (message) => {
  console.log(`Subscriber 1 received: ${message}`);
});

// Subscriber 2
pubsub.subscribe('greeting', (message) => {
  console.log(`Subscriber 2 received: ${message}`);
});

// Emit an event
pubsub.emit('greeting', 'Hello, World!');

// Unsubscribe a callback
const callback = (message: string) => {
  console.log(`This won't be called anymore: ${message}`);
};
pubsub.subscribe('farewell', callback);
pubsub.unsubscribe('farewell', callback);
pubsub.emit('farewell', 'Goodbye!');

// Clear all subscribers for an event
pubsub.clear('greeting');
pubsub.emit('greeting', 'This will not be received.');
```
