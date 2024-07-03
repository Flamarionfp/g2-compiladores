import { RulesRecord } from './types';

export const rules: RulesRecord = {
  consoleLog: /olhaOqueEleFez/,
  loopWhile: /laVemElesDeNovo/,
  number: /[0-9]+/,
  boolean: /verdadeiro|falso/,
  arithmeticOperators: ['+', '-', '*', '/', '%', '**'],
  incrementDecrementOperators: ['++', '--'],
  assignmentOperators: ['=', '+=', '-=', '*=', '/=', '%=', '**='],
  comparisonOperators: ['==', '!=', '===', '!==', '>', '<', '>=', '<='],
  logicalOperators: ['&&', '||', '!'],
  bitwiseOperators: ['&', '|', '^', '~', '<<', '>>', '>>>'],
  otherOperators: [',', '.', '?:', ':'],
  leftParentheses: '(',
  rightParentheses: ')',
  leftBracket: '{',
  rightBracket: '}',
  comment: /\/\/.*?$/,
  stringChar: /".*"/,
  whitespace: { match: /\s+/, lineBreaks: true },
  // TODO: add other rules here
};
