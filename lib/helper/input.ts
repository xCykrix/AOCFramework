export class CTFInputHelper {
  private _structured = false;
  private _expression = /(.*)/;
  private _content = 'InvalidInput';

  public structured(): CTFInputHelper {
    this._structured = true;
    return this;
  }

  public from(v: string): CTFInputHelper {
    if (this._structured) v = `${Deno.cwd()}/input/${v.match(/(D\d+).ts$/)![1]}.input.txt`;
    this._content = Deno.readTextFileSync(v).trim();
    return this;
  }

  public expression(v: RegExp): CTFInputHelper {
    this._expression = v;
    return this;
  }

  public parse<T extends BuiltInInputRegExpIdentifier>(type: T): OutputTypes[T] {
    return {
      [BuiltInInputRegExpIdentifier.STRING]: (this._content.match(/(.*)/) ?? [''])[0] as string,
      [BuiltInInputRegExpIdentifier.CHARACTERS]: (this._content.match(/(.)/g) ?? []) as string[],
      [BuiltInInputRegExpIdentifier.LIST]: (
        this._content.split('\n').map((v) => {
          return (v.match(/(.*)/) ?? [''])[0];
        })
      ) as string[],
      [BuiltInInputRegExpIdentifier.LIST_CHARACTERS]: (
        this._content.split('\n').map((v) => {
          return v.match(/(.)/g) ?? [];
        })
      ) as string[][],
      [BuiltInInputRegExpIdentifier.EXPRESSION]: (
        this._content.split('\n').map((v) => {
          return [...(v.match(this._expression) ?? [])].slice(1);
        })
      ) as string[][],
    }[type]! as OutputTypes[T];
  }
}

export enum BuiltInInputRegExpIdentifier {
  STRING,
  CHARACTERS,
  LIST,
  LIST_CHARACTERS,
  EXPRESSION,
}

interface OutputTypes {
  [BuiltInInputRegExpIdentifier.STRING]: string;
  [BuiltInInputRegExpIdentifier.CHARACTERS]: string[];
  [BuiltInInputRegExpIdentifier.LIST]: string[];
  [BuiltInInputRegExpIdentifier.LIST_CHARACTERS]: string[][];
  [BuiltInInputRegExpIdentifier.EXPRESSION]: string[][];
}
