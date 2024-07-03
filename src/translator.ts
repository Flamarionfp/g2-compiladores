import { OptionalType, RequiredType, optionalTypes } from './types';

export class Translator {
  public generateJavascript = (tokens: moo.Token[]) => {
    let code = '';

    const mapper: Record<RequiredType, (token: moo.Token) => string> = {
      loopWhile: this.generateLoop,
      consoleLog: this.generateConsoleLog,
      boolean: this.generateBoolean,
    };

    tokens.forEach((token) => {
      const parsedRequiredType = token.type as RequiredType;
      const parsedOptionalType = token.type as OptionalType;

      try {
        code += mapper[parsedRequiredType](token);
      } catch (error) {
        code += this.generateDefault({
          type: parsedOptionalType,
          value: token.value,
        });
      }
    });

    return code;
  };

  private generateLoop = ({ type }: moo.Token) => {
    return this.montarTraducao('loopWhile', { t: 'while', f: 'for' }, type);
  };

  private generateBoolean = ({ value }: moo.Token) => {
    return this.montarTraducao('verdadeiro', { t: 'true', f: 'false' }, value);
  };

  private generateConsoleLog = ({ type = '' }: moo.Token) => {
    return this.montarTraducao('consoleLog', { t: 'console.log', f: '' }, type);
  };

  private montarTraducao = (
    val: string,
    tradObj: { t: string; f: string },
    vr?: string,
  ) => {
    if (vr === val) return tradObj.t;

    return tradObj.f;
  };

  private generateDefault({
    type,
    value,
  }: {
    type: OptionalType;
    value: string;
  }) {
    if (optionalTypes.includes(type)) {
      return value;
    }

    return '';
  }
}
