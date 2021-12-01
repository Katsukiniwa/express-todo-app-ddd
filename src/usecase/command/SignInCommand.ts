export interface SignInCommandProps {
  email: string
  password: string
}
export class SignInCommand {
  public readonly email: string
  public readonly password: string

  constructor(props: SignInCommandProps) {
    this.email = props.email
    this.password = props.password
  }
}
