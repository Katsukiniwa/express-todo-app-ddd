export abstract class Entity<T> {
  abstract id: number | null;

  public equal(that: Entity<T>): boolean {
    return this.id === that.id;
  }
}
