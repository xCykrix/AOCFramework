
export class MathExtension {
  /** Convert number 'n' to uint16. */
  public uint16(n: number): number {
    return n & 0xFFFF;
  }
}
