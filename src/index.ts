import { SourceReader } from './source-reader';
import { Tokenizer } from './tokenizer';
import { Translator } from './translator';
import { CodeRunner } from './code-runner';

const sourceReader = new SourceReader();
const tokenizer = new Tokenizer();
const translator = new Translator();

(async () => {
  try {
    const code = await sourceReader.readFile('./index.galvao.txt');
    const tokens = tokenizer.tokenize(code);

    console.log('tokens', tokens);

    const translatedCode = translator.generateJavascript(tokens);

    console.log('DEBUG translatedCode', translatedCode);

    CodeRunner.runJavascriptCode(translatedCode);
  } catch (error) {
    console.error(error);
  }
})();
