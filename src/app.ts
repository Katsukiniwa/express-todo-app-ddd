import express from "express";
import { boardRouter } from "./infrastructure/router";
import { BoardController } from "./presentation/BoardController";

const app = express();

app.use(boardRouter);

app.get("/", (_request, response) => {
  return response.json({
    message: "Hello World",
    port: process.env.PORT,
  });
});

const controller = new BoardController();

app.get("/boards/:id", (_request, response) => {
  const result = controller.getBoard();
  return response.json({ message: "board", result });
});

app.listen(Number(process.env.PORT), () => {
  console.log(`listen on ${process.env.PORT} PORT`);
});

export default app;
