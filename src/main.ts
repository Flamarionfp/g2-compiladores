import { SourceReader } from './source-reader';
import { Tokenizer } from './tokenizer';
import { Translator } from './translator';
import { CodeRunner } from './code-runner';
import { ArgsCLI } from './args-cli';
import { FileCreator } from './file-creator';
import { FilePath } from './file-path';
import { PreValidator } from './pre-validator';

class Main {
  private static FILE_EXTENSION = '.galvao';

  execute = async () => {
    try {
      const sourceReader = new SourceReader();
      const tokenizer = new Tokenizer();
      const argsCLI = new ArgsCLI();
      const filePath = new FilePath(argsCLI.typedFilePath);

      let code = await sourceReader.readFile(filePath);
      code = PreValidator.execute(code);

      const tokens = tokenizer.tokenize(code);
      const translator = new Translator(tokens);
      const translatedCode = translator.generateJavascript();

      if (argsCLI.operation === 'translate') {
        const filename = filePath.extractFilename(Main.FILE_EXTENSION);
        FileCreator.createJavascriptFile(filename, translatedCode);
      } else {
        CodeRunner.runJavascriptCode(translatedCode);
      }
    } catch (error) {
      console.error(error);
    }
  };
}

new Main().execute();
