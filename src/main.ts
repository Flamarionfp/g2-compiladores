import { SourceReader } from './source-reader';
import { Tokenizer } from './tokenizer';
import { Translator } from './translator';
import { CodeRunner } from './code-runner';
import { ArgsCLI } from './args-cli';
import { FileCreator } from './file-creator';
import { FilePath } from './file-path';

class Main {
  private static FILE_EXTENSION = '.galvao.txt';

  execute = async () => {
    try {
      const sourceReader = new SourceReader();
      const tokenizer = new Tokenizer();
      const translator = new Translator();
      const argsCLI = new ArgsCLI();
      const filePath = new FilePath(argsCLI.typedFilePath);

      const code = await sourceReader.readFile(filePath);
      const tokens = tokenizer.tokenize(code);
      const translatedCode = translator.generateJavascript(tokens);

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
