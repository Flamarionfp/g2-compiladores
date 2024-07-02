import { RulesRecord } from './types';

export const rules: RulesRecord = {
  loopWhile: /laVemElesDeNovo/,
  number: /[0-9]+/,
  boolean: /verdadeiro|falso/,
  leftParentheses: '(',
  rightParentheses: ')',
  leftBracket: '{',
  rightBracket: '}',
  comment: /\/\/.*?$/,
  whitespace: { match: /\s+/, lineBreaks: true },
  // TODO: add other rules here
};
