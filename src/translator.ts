import {
  BuildTranslationParam,
  CustomToken,
  OptionalType,
  RequiredType,
  optionalTypes,
} from './types';

export class Translator {
  private tokens: CustomToken[];

  constructor(tokens: moo.Token[]) {
    this.tokens = tokens;
  }

  public generateJavascript() {
    let code = '';

    const mapper: Record<
      RequiredType,
      (token: moo.Token, index: number) => string
    > = {
      keywordWhile: this.generateLoop,
      keywordFor: this.generateLoop,
      consoleLog: this.generateConsoleLog,
      boolean: this.generateBoolean,
      keywordIf: () => 'if',
      keywordElseIf: () => 'else if',
      keywordElse: () => 'else',
      keywordBreak: () => 'break',
      keywordThrow: () => 'throw',
      keywordTry: () => 'try',
      keywordCatch: () => 'catch',
      keywordFinally: () => 'finally',
      keywordReturn: () => 'return',
      keywordConst: (_, index) => this.generateKeywordConst(index),
      keywordVar: (_, index) => this.generateKeywordVar(index),
      keywordFunction: (_, index) => this.generateKeywordFunction(index),
    };

    const tokensWithoutIdentifier = this.tokens.filter(({ type = '' }) => {
      const allowedRuleTokens = [
        'keywordVar',
        'keywordConst',
        'keywordFunction',
      ];

      return allowedRuleTokens.includes(type);
    });

    tokensWithoutIdentifier.forEach((token) => {
      const indexVar = this.tokens.findIndex(
        ({ col, line }) => col === token.col && line === token.line,
      );

      const nameKeywordVar = this.findIdentifierToken(indexVar - 1);

      if (nameKeywordVar.token.type === 'identifier')
        this.tokens[nameKeywordVar.index].invisible = true;
    });

    this.tokens.forEach((token, index) => {
      const parsedRequiredType = token.type as RequiredType;
      const parsedOptionalType = token.type as OptionalType;

      try {
        if (!token.invisible) {
          code += mapper[parsedRequiredType](token, index);
        }
      } catch (error) {
        code += this.generateDefault({
          type: parsedOptionalType,
          value: token.value,
        });
      }
    });

    return code;
  }

  private generateLoop = ({ type }: moo.Token) => {
    return this.buildTranslation(
      'keywordWhile',
      { t: 'while', f: 'for' },
      type,
    );
  };

  private generateBoolean = ({ value }: moo.Token) => {
    return this.buildTranslation(
      'verdadeiro',
      { t: 'true', f: 'false' },
      value,
    );
  };

  private generateConsoleLog = ({ type = '' }: moo.Token) => {
    return this.buildTranslation(
      'consoleLog',
      { t: 'console.log', f: '' },
      type,
    );
  };

  private findIdentifierToken(index: number) {
    let i = index - 1;

    while (this.tokens[i].type === 'whitespace') {
      i--;
    }

    return {
      token: this.tokens[i],
      index: i,
    };
  }

  private generateKeywordVar = (index: number) => {
    return `var ${this.findIdentifierToken(index).token.value}`;
  };

  private generateKeywordConst = (index: number) => {
    return `const ${this.findIdentifierToken(index).token.value}`;
  };

  private generateKeywordFunction = (index: number) => {
    return `function ${this.findIdentifierToken(index).token.value}`;
  };

  private buildTranslation = (
    val: BuildTranslationParam,
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
