export class Translator {
  public generateJavascript(tokens: moo.Token[]) {
    let code = '';

    const mapper: Record<string, (token: moo.Token) => string> = {
      loopWhile: this.generateLoop,
      boolean: this.generateBoolean,
    };

    tokens.forEach((token) => {
      try {
        const parsedType = token.type ?? '';
        code += mapper[parsedType](token);
      } catch (error) {
        code += this.generateDefault(token);
      }
    });

    return code;
  }

  private generateLoop({ type }: moo.Token) {
    if (type === 'loopWhile') return 'while ';

    return 'for';
  }

  private generateBoolean({ value }: moo.Token) {
    if (value === 'verdadeiro') return 'true';

    return 'false';
  }

  private generateDefault({ type = '', value }: moo.Token) {
    const defaultTypes = [
      'leftParentheses',
      'rightParentheses',
      'leftBracket',
      'rightBracket',
      'whitespace',
      'comment',
    ];

    if (defaultTypes.includes(type)) {
      return value;
    }

    return '';
  }
}
