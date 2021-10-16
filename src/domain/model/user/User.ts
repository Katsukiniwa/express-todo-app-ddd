import { Aggregate } from "../../../ddd_common/domain/AggregateRoot";

export interface UserProps {
  id: number | null;
  name: string;
  email: string;
}

/**
 * @name ユーザ集約
 * TODO: ユーザアカウントという概念に近いのでリネームする
 */
export class User extends Aggregate<User> {
  public readonly id: number | null;
  public readonly name: string;
  public readonly email: string;

  constructor(props: UserProps) {
    super();
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
  }
}
