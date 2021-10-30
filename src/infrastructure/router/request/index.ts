export interface AddTaskToBoardRequest {
  taskName?: string
  content?: string
  deadline?: Date
  userId?: string
  boardId?: string
  point?: number
}
