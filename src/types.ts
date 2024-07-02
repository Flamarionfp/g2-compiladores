export type RulesRecord = Record<
  string,
  RegExp | string | string[] | { match: RegExp; lineBreaks: true }
>;
