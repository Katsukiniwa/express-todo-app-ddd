import { ValueObject } from '../../../ddd_common/domain/ValueObject'

export class TaskName extends ValueObject<TaskName> {
  public readonly value: string

  constructor(name: string) {
    super()
    this.value = name
  }
}
