import { PubSub } from "./mod.ts";
import { assertEquals } from "@std/assert";

Deno.test("PubSub - subscribe and emit functionality", () => {
  const pubsub = new PubSub<string>();
  let result = "";

  const callback = (data: string) => {
    result = data;
  };

  pubsub.subscribe("testEvent", callback);
  pubsub.emit("testEvent", "Hello, World!");

  assertEquals(result, "Hello, World!"); // Verify callback was triggered
});

Deno.test("PubSub - unsubscribe functionality", () => {
  const pubsub = new PubSub<number>();
  let result = 0;

  const callback = (data: number) => {
    result = data;
  };

  pubsub.subscribe("testEvent", callback);
  pubsub.unsubscribe("testEvent", callback);
  pubsub.emit("testEvent", 42);

  assertEquals(result, 0); // Verify callback was not triggered
});

Deno.test("PubSub - multiple subscribers", () => {
  const pubsub = new PubSub<string>();
  let result1 = "";
  let result2 = "";

  const callback1 = (data: string) => {
    result1 = data;
  };
  const callback2 = (data: string) => {
    result2 = data;
  };

  pubsub.subscribe("testEvent", callback1);
  pubsub.subscribe("testEvent", callback2);
  pubsub.emit("testEvent", "Hello, Subscribers!");

  assertEquals(result1, "Hello, Subscribers!");
  assertEquals(result2, "Hello, Subscribers!");
});

Deno.test("PubSub - clear functionality", () => {
  const pubsub = new PubSub<boolean>();
  let result = false;

  const callback = (data: boolean) => {
    result = data;
  };

  pubsub.subscribe("testEvent", callback);
  pubsub.clear("testEvent");
  pubsub.emit("testEvent", true);

  assertEquals(result, false); // Verify callback was not triggered
});

Deno.test("PubSub - emit with no subscribers", () => {
  const pubsub = new PubSub<number>();

  // Emit an event that has no subscribers
  pubsub.emit("nonexistentEvent", 123);

  // Passes if no errors occur and no unexpected behavior happens
  assertEquals(true, true); // Dummy assertion to indicate test passes
});
