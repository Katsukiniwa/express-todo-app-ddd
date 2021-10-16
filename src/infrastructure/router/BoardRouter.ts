import { Router } from "express";
import { BoardController } from "../../presentation/BoardController";

const router = Router();

const controller = new BoardController();

router.get("/boards/:id", (request, response) => {
  const result = controller.getBoard();
  return response.json({ message: "board", result });
});
