import fs from 'fs';

export class SourceReader {
  readFile(filePath: string) {
    try {
      return fs.promises.readFile(filePath, 'utf8');
    } catch (error) {
      throw new Error(`Ocorreu um erro ao ler o arquivo: ${error}`);
    }
  }
}
