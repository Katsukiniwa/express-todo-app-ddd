import { Router } from 'express'
import { TypedRequestBody } from '../../ddd_common/infrastructure/ExpressRequest'
import { PrismaGetBoardQueryHandler } from '../../infrastructure/query/PrismaGetBoardQueryHandler'
import { BoardController } from '../../presentation/BoardController'
import { AddTaskToBoardCommand } from '../../usecase/command/AddTaskToBoardCommand'
import { PrismaBoardRepository } from '../repository'
import { PrismaUserRepository } from '../repository/PrismaUserRepository'
import { AddTaskToBoardRequest } from './request'

export const boardRouter = Router()

const controller = new BoardController(
  new PrismaGetBoardQueryHandler(),
  new PrismaBoardRepository(),
  new PrismaUserRepository()
)

boardRouter.use((_request, _response, next) => {
  ;(async () => {
    /**
     * TODO: CookieUserAuthenticationService.authenticateFromを呼び出す
     */
    console.log('Time:', Date.now())
    next()
  })().catch(next)
})

/**
 * @description ボード取得のエンドポイント
 */
boardRouter.get('/boards/:id', (request, response, next) => {
  ;(async () => {
    const boardId = Number(request.params.id)
    const result = await controller.getBoard(boardId)

    return response.json({ message: 'board', result })
  })().catch(next)
})

/**
 * @description ボードへタスクを追加するエンドポイント
 */
boardRouter.post(
  '/boards/:id/task',
  (request: TypedRequestBody<AddTaskToBoardRequest>, response, next) => {
    ;(async () => {
      const command = new AddTaskToBoardCommand(request.body)
      await controller.addTaskToBoard(command)

      return response.status(200)
    })().catch(next)
  }
)
