import express from "express";

const app = express();

app.get("/", (_request, response) => {
  return response.json({ message: "Hello DDD" });
});

app.listen(3000, () => {
  console.log("listen on 300 PORT");
});

export default app;
