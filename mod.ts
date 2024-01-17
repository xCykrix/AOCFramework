import { CTFStorage } from './lib/storage.ts';

export class CTFFramework<T = string> {
  public storage = new CTFStorage();
  private registers: [string, ((self: CTFFramework<T>) => Promise<T>)][] = [];

  /**
   * Register a function to be executed. Classes passed a reference to the CTFFramework.
   *
   * @param id A identifier to reference the function.
   * @param v A function with a self reference to this {@link CTFFramework}.
   */
  public register(id: string, v: (self: CTFFramework<T>) => Promise<T>): void {
    this.registers.push([id, v]);
  }

  /**
   * Evaluate the CTF. This is called by the {@link CTF} static 'do' function.
  */
  public async _evaluate_ctf(): Promise<void> {
    for (const fn of this.registers) {
      const delta = performance.now();
      const v = await fn[1](this);
      const fdelta = performance.now() - delta;
      console.info(fn[0], "|", `${fdelta.toFixed(3)}ms`.padEnd(15, ' '), "|->", v);
    }
  }
}

/**
 * CTF Static Execution Assistant.
 */
export class CTF {
  /**
   * Execute a {@link CTFFramework} instance.
   *
   * @param advent The instance to execute.
   */
  public static async do(advent: CTFFramework): Promise<void> {
    await advent._evaluate_ctf();
  }
}
