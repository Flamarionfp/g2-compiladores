export const optionalTypes = [
  'startProgram',
  'number',
  'leftParentheses',
  'rightParentheses',
  'leftBracket',
  'rightBracket',
  'comment',
  'whitespace',
  'stringChar',
  'arithmeticOperators',
  'incrementDecrementOperators',
  'assignmentOperators',
  'comparisonOperators',
  'logicalOperators',
  'bitwiseOperators',
  'otherOperators',
  'identifier',
  'endProgram',
] as const;

const requiredTypes = [
  'consoleLog',
  'keywordVar',
  'keywordConst',
  'keywordFunction',
  'keywordReturn',
  'keywordBreak',
  'keywordWhile',
  'keywordFor',
  'keywordIf',
  'keywordElseIf',
  'keywordElse',
  'keywordThrow',
  'keywordTry',
  'keywordCatch',
  'keywordFinally',
  'boolean',
] as const;

export type OptionalType = (typeof optionalTypes)[number];

export type RequiredType = (typeof requiredTypes)[number];

export type BuildTranslationParam = RequiredType | 'verdadeiro';

export type RulesRecord = Record<
  OptionalType | RequiredType,
  | RegExp
  | string
  | string[]
  | {
      match: RegExp;
      lineBreaks?: true;
      keywords?: Array<Record<string, string>>;
    }
>;

export type Operation = 'translate' | 'execute';

export interface CustomToken extends moo.Token {
  invisible?: boolean;
}

export type LanguageCustomRule = {
  keyword: string;
  errorMessagePrefix: string;
  linePosition: number;
};
