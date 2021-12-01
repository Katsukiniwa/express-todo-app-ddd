import { UserAuthenticationService } from '../../domain/service/UserAuthenticationService'
import { SignInCommand } from './SignInCommand'

export class SignInCommandHandler {
  private userAuthenticationService: UserAuthenticationService

  constructor(userAuthenticationService: UserAuthenticationService) {
    this.userAuthenticationService = userAuthenticationService
  }

  async handle(command: SignInCommand): Promise<void> {
    await this.userAuthenticationService.authenticateFrom(
      command.email,
      command.password
    )
  }
}
