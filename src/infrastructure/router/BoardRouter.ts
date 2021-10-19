import { Router } from "express";
import { BoardController } from "../../presentation/BoardController";

export const boardRouter = Router();

const controller = new BoardController();

boardRouter.use((request, response, next) => {
  (async () => {
    /**
     * TODO: CookieUserAuthenticationService.authenticateFromを呼び出す
     */
    console.log("Time:", Date.now());
    next();
  })().catch(next);
});

boardRouter.get("/boards/:id", (request, response, next) => {
  (async () => {
    const result = await controller.getBoard(Number(request.params.id));
    return response.json({ message: "board", result });
  })().catch(next);
});
