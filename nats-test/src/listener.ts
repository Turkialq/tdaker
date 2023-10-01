import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";

const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("nats connected from publisher");

  const subscription = stan.subscribe("ticket:created");

  subscription.on("message", (msg: Message) => {
    const data = msg.getData();
    if (typeof data === "string") {
      console.log(`Recived event # ${msg.getSequence()}, with data: ${data}`);
    }
  });
});
