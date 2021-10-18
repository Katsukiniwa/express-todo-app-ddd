import { Router } from "express";
import { BoardController } from "../../presentation/BoardController";

export const boardRouter = Router();

const controller = new BoardController();

boardRouter.get("/boards/:id", (request, response, next) => {
  (async () => {
    const result = await controller.getBoard(Number(request.params.id));
    return response.json({ message: "board", result });
  })().catch(next);
});
