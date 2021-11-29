import { Entity } from '../../../ddd_common/domain/Entity'
import { Task } from '../task/Task'

export interface LaneProps {
  id: number | null
  name: string
  tasks: Task[]
}

/**
 * @name レーン
 * @description ボードに存在するレーン
 * @rule ボード内で名前はユニークである・レーン毎にユーザは任意でレーンに保存するタスクの上限を設定できる(設定しなくとも良い)
 */
export class Lane extends Entity<Lane> {
  public readonly id: number | null
  private _name: string
  private _tasks: Task[]

  constructor(props: LaneProps) {
    super()

    this.id = props.id
    this._name = props.name
    this._tasks = props.tasks
  }

  get name(): string {
    return this._name
  }

  get tasks(): Task[] {
    return this._tasks
  }

  /**
   * ボード内でレーン名はユニークである必要があるというドメインルールのため
   * 第一引数に集約内に存在するレーンの名前のリスト、第二引数に新しい名前を渡す
   */
  changeName(nameList: string[], newName: string): void {
    const sameName = nameList.find((name) => name === newName) // ①
    /**
     * FIXME: 同時に同じ名前のボードに変更された場合はこのバリデーションが発火しない
     * https://kbigwheel.hateblo.jp/entry/2018/12/03/aggregate-and-consistency
     *
     * 1. ほぼ同時にこのメソッドが呼ばれる(それぞれをコールA, コールBとする)
     * 2. コールAで①が実行され、undefinedが取得される
     * 3. コールBで①が実行され、undefinedが取得される
     * 4. 2/3どちらもsameName = undefinedのため③に進む
     * 5. コールAで③が実行される
     * 6. コールBで③が実行される
     * 7. ボード内に同じレーンが作成された状態になってしまう
     */
    if (sameName) {
      // ②
      throw new Error('既にボード内に同じ名前のレーンが存在します')
    }
    this._name = newName // ③
  }
}
