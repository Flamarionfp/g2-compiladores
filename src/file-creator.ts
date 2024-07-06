import fs from 'fs';
import { exec } from 'child_process';
import path from 'path';

export class FileCreator {
  public static createJavascriptFile(filename: string, code: string) {
    const filenameWithExtension = `${filename}.js`;
    const rootDir = path.resolve(__dirname, '../');
    const newFilePath = path.join(rootDir, filenameWithExtension);

    fs.writeFile(newFilePath, code, (error) => {
      if (error) {
        throw new Error(`Erro ao criar o arquivo javascript: ${error}`);
      }

      FileCreator.formatCreatedFile(newFilePath);

      console.log(
        `Arquivo ${filenameWithExtension} criado com sucesso em ${newFilePath}`,
      );
    });
  }

  private static formatCreatedFile(filePath: string) {
    exec(`npx prettier --write ${filePath}`);
  }
}
