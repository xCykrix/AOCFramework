
export class AdventCodeFramework<T = string> {
  private _helper: null;
  private _storage: null;

  private p1: T;
  private p2: T;
  private start: number;
  private p1d: number;
  private p2d: number;

  public constructor(input: string, cwd: string) {
    // this._helper.setInputFile(input);
    // this._helper.setCurrentDirectory(cwd);
  }

  public async run(): Promise<void> {
    this.start = performance.now();
    this.p1 = await this.P1();
    this.p1d = performance.now();
    this.p2 = await this.P2();
    this.p1d = performance.now();
  }

  public output(): void {
    console.info('P1:', this.p1, 'Time', `${(this.start - this.p1d).toFixed(3)}ms`);
    console.info('P2:', this.p2, 'Time', `${(this.p1d - this.p2d).toFixed(3)}ms`);
  }

  // deno-lint-ignore require-await
  public async P1(): Promise<T> { return '' as T; }
  // deno-lint-ignore require-await
  public async P2(): Promise<T> { return '' as T; }

}

export class AdventCode {
  public async do(advent: AdventCodeFramework): Promise<void> {
    await advent.run();
    advent.output();
  }
}
