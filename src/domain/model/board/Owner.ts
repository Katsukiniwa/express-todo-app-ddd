import { Entity } from '../../../ddd_common/domain/Entity'

export interface OwnerProps {
  id: number | null
  name: string
  icon: string
}

/**
 * @name オーナー
 * @description ボードの持ち主(オーナー)
 */
export class Owner extends Entity<Owner> {
  public readonly id: number | null
  private _name: string
  private _icon: string

  constructor(props: OwnerProps) {
    super()
    this.id = props.id
    this._name = props.name
    this._icon = props.icon
  }

  get name(): string {
    return this._name
  }

  get icon(): string {
    return this._icon
  }
}
