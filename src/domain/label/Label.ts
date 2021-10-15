import { Entity } from "../../ddd_common/domain/Entity";

export interface LabelProps {
  id: number | null;
  name: string;
}

/**
 * @name ラベル
 * @description ラベルはカードに複数付与できる
 */
export class Label extends Entity<Label> {
  public readonly id: number | null;
  private _name: string;

  constructor(props: LabelProps) {
    super();
    this.id = props.id;
    this._name = props.name;
  }

  get name(): string {
    return this._name;
  }
}
