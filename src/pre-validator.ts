import { LanguageValidator } from './language-validator';
import { LanguageCustomRule } from './types';

export class PreValidator {
  static execute = (code: string) => {
    const splitedCode = code.split('\n');

    const languageCustomRules: LanguageCustomRule[] = [
      {
        keyword: 'bem amigos da rede globo',
        errorMessagePrefix: `O programa deve começar com`,
        linePosition: 0,
      },
      {
        keyword: 'eeee amigos acabou',
        errorMessagePrefix: `O programa deve terminar com`,
        linePosition: splitedCode.length - 1,
      },
    ];

    languageCustomRules.forEach((rule) => {
      PreValidator.validateRule(rule, code);
      code = code.replace(rule.keyword, '');
    });

    return code.trimStart().trimEnd();
  };

  private static validateRule = (rule: LanguageCustomRule, code: string) => {
    const errorMessage = `${rule.errorMessagePrefix} ${rule.keyword}`;

    LanguageValidator.validate(
      code,
      rule.keyword,
      rule.linePosition,
      errorMessage,
    );
  };
}
