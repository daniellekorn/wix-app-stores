const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();

require('dotenv').config({ path: '../.env' });
const PUBLIC_KEY = process.env.PUBLIC_KEY;
console.log("Key: ", PUBLIC_KEY);

app.post('/product-deleted', express.text(), (request, response) => {
  let event;
  let eventData;

  try {
    const rawPayload = jwt.verify(request.body, PUBLIC_KEY);
    event = JSON.parse(rawPayload.data);
    eventData = JSON.parse(event.data);
  } catch (err) {
    console.error(err);
    response.status(400).send(`Webhook error: ${err.message}`);
    return;
  }

  switch (event.eventType) {
    case "com.wix.ecommerce.catalog.api.v1.ProductDeleted":
      console.log(`com.wix.ecommerce.catalog.api.v1.ProductDeleted event received with data:`, eventData);
      //
      // handle your event here
      //
      break;
    default:
      console.log(`Received unknown event type: ${event.eventType}`);
      break;
  }

  response.status(200).send();

});

app.listen(3000, () => console.log("Server started on port 3000"));
