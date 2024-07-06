import fs from 'fs';
import { InvalidFileException } from './exceptions/invalid-file';
import { FilePath } from './file-path';

export class SourceReader {
  readFile(filePath: FilePath) {
    try {
      return fs.promises.readFile(filePath.value, 'utf8');
    } catch (error) {
      if (error instanceof InvalidFileException) throw error;

      throw new Error(`Ocorreu um erro ao ler o arquivo: ${error}`);
    }
  }
}
