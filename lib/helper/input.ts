
export class CTFInputHelper {
  private _structured = false;
  private _content = 'InvalidInput';
  private _separator: string | null = null;

  public structured(): CTFInputHelper {
    this._structured = true;
    return this;
  }

  public with(v: string): CTFInputHelper {
    if (this._structured) v = `${Deno.cwd()}/input/${v.match(/(D\d+).ts$/)![1]}.input.txt`;
    this._content = Deno.readTextFileSync(v).trim();
    return this;
  }

  public separate(separator: string): CTFInputHelper {
    this._separator = separator;
    return this;
  }

  public getString<T extends StringInputType>(type: T): OutputTypes[T] {
    return {
      [StringInputType.STRING]: this._content! as string,
      [StringInputType.SEPARATED_STRING]: this._content.split(this._separator!)! as string[],
    }[type]! as OutputTypes[T];
  }

  public getList<T extends ListInputType>(type: T): OutputTypes[T] {
    return {
      [ListInputType.LIST]: this._content.split('\n') as string[],
      [ListInputType.SEPARATED_LIST]: this._content.split('\n').map((v) => v.split(this._separator!)) as string[][],
    }[type] as OutputTypes[T];
  }
}

export enum StringInputType {
  STRING = 'STRING',
  SEPARATED_STRING = 'SEPARATED_STRING',
}

export enum ListInputType {
  LIST = 'LIST',
  SEPARATED_LIST = 'SEPARATED_LIST',
}

interface OutputTypes {
  [StringInputType.STRING]: string;
  [StringInputType.SEPARATED_STRING]: string[];
  [ListInputType.LIST]: string[];
  [ListInputType.SEPARATED_LIST]: string[][];
}
