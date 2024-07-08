export class LanguageValidator {
  static validate(code: string, value: string, pos: number, message: string) {
    const splitedCode = code.split('\n');

    if (splitedCode[pos] !== value) throw new Error(message);
  }
}
