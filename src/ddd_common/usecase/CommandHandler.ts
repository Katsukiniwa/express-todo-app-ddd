export interface CommandHandler<C> {
  handle(command: C): void
}
