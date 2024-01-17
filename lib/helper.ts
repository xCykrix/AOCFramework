import { Cursor } from './helper/cursor.ts';
import { CTFInputHelper } from './helper/input.ts';
import { MathExtension } from './helper/math.ts';
import { RegularExpression } from './helper/regex.ts';

export class CTFHelper {
  private static _math: MathExtension = new MathExtension();
  private static _regex: RegularExpression = new RegularExpression();

  public static getInput(): CTFInputHelper {
    return new CTFInputHelper();
  }

  public static getCursor(v: string[]): Cursor {
    return new Cursor(v);
  }

  public static getMathExtension(): MathExtension {
    return this._math;
  }

  public static getRegularExpression(): RegularExpression {
    return this._regex;
  }
}
