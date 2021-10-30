import { Aggregate } from '../../../ddd_common/domain/AggregateRoot'

export interface UserProps {
  id: number | null
  name: string
  icon: string
  email: string
}

/**
 * @name ユーザ集約
 * TODO: ユーザアカウントという概念に近いのでリネームする
 */
export class User extends Aggregate<User> {
  public readonly id: number | null
  private _name: string
  private _icon: string
  private _email: string

  constructor(props: UserProps) {
    super()
    this.id = props.id
    this._name = props.name
    this._icon = props.icon
    this._email = props.email
  }
}
