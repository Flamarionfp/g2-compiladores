import moo from 'moo';
import { rules } from './rules';

export class Tokenizer {
  public tokenize(code: string) {
    const lexer = this.compile();

    lexer.reset(code);

    let token;
    const tokens = [];

    while ((token = lexer.next()) !== undefined) {
      tokens.push(token);
    }

    return tokens;
  }

  private compile() {
    const lexer = moo.compile(rules);

    return lexer;
  }
}
