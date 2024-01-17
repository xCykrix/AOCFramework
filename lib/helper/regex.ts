
export class RegularExpression {
  private map: Map<string, RegExp> = new Map();

  public register(id: string, ...args: [value: RegExp]): void {
    this.map.set(id, new RegExp(args[0]));
  }

  public get(id: string): RegExp | null {
    return this.map.get(id) ?? null;
  }

  public clone(id: string): RegExp | null {
    const expr = this.map.get(id) ?? null;
    if (expr === null) return null;
    return new RegExp(expr.source, expr.flags)
  }
}
