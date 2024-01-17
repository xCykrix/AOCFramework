
export class Cursor {
  private list: string[];
  private position = 0;

  public constructor(list: string[], startAt = 0) {
    this.list = list;
    this.position = startAt;
  }

  public get(): string | null {
    return this.list[this.position] ?? null;
  }

  public getNext(): string | null {
    return this.list[this.position + 1] ?? null;
  }

  public getPrevious(): string | null {
    return this.list[this.position - 1] ?? null;
  }

  public getAt(index: number): string | null {
    return this.list[index] ?? null;
  }

  public getAtRelative(index: number): string | null {
    return this.list[this.position + index] ?? null;
  }

  public setPosition(value: number): void {
    this.position = value;
  }

  public step(value = 1): void {
    this.setPosition(this.position + value);
    if (this.position >= this.list.length) {
      this.position = this.list.length;
    }
  }

  public back(value = 1): void {
    this.setPosition(this.position - value);
    if (this.position <= 0) {
      this.position = 0;
    }
  }
}
