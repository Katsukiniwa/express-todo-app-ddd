import { Entity } from '../../../ddd_common/domain/Entity'
import { ContractPlan } from './ContractPlan'

export interface OwnerProps {
  id: number | null
  name: string
  icon: string
  contractPlan: ContractPlan
}

/**
 * @name オーナー
 * @description ボードの持ち主(オーナー)
 */
export class Owner extends Entity<Owner> {
  public readonly id: number | null
  private _name: string
  private _icon: string
  private _contractPlan: ContractPlan

  constructor(props: OwnerProps) {
    super()
    this.id = props.id
    this._name = props.name
    this._icon = props.icon
    this._contractPlan = props.contractPlan
  }

  get name(): string {
    return this._name
  }

  get icon(): string {
    return this._icon
  }

  get contractPlan(): ContractPlan {
    return this._contractPlan
  }
}
