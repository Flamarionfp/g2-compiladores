export const optionalTypes = [
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
] as const;

const requiredTypes = ['consoleLog', 'loopWhile', 'boolean'] as const;

export type OptionalType = (typeof optionalTypes)[number];

export type RequiredType = (typeof requiredTypes)[number];

export type RulesRecord = Record<
  OptionalType | RequiredType,
  RegExp | string | string[] | { match: RegExp; lineBreaks: true }
>;
