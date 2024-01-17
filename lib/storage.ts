
export class CTFStorage {
  public getStoredMap<T = string>(): StoreValueMap<T> {
    return new StoreValueMap<T>();
  }

  public getStoredValue<T = string>(defaultValue: T): StoreValue<T> {
    return new StoreValue<T>(defaultValue)
  }
}

export class StoreValueMap<T = unknown> extends Map<string, StoreValue<T>> {
  public add(key: string, integer: number): void {
    if (!this.has(key)) this.set(key, new StoreValue<number>(0) as StoreValue<T>);
    this.get(key)?.add(integer);
  }

  public subtract(key: string, integer: number): void {
    this.add(key, integer * -1);
  }
}

export class StoreValue<T = unknown> {
  private _value: T;

  public constructor(value: T) {
    this._value = value;
  }

  public set(value: T): void {
    this._value = value;
  }

  public add(value: number): void {
    this._value = this._value as number + value as T;
  }

  public subtract(value: number): void {
    this.add(value * -1);
  }

  public toggle(): void {
    (this._value as boolean) = !this._value as boolean;
  }

  public get(defaultValue?: T): T {
    return this._value ?? defaultValue! ?? 'null';
  }

  public toString(): string {
    return `${this._value}`;
  }
}
