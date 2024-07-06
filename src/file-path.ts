import fs from 'fs';
import path from 'path';
import { InvalidFileException } from './exceptions/invalid-file';

export class FilePath {
  private _value: string;
  private _originalValue: string;

  constructor(value: string) {
    this._originalValue = value;
    this.isValidOrThrows(value);

    this._value = this.normalizePath(value);
  }

  private normalizePath(value: string): string {
    return path.resolve(value);
  }

  private isValidOrThrows = (value: string) => {
    if (!value || value.trim() === '') {
      throw new InvalidFileException(
        'O caminho do arquivo não pode estar vazio',
      );
    }

    if (!value.endsWith('.galvao.txt')) {
      throw new InvalidFileException('Extensão de arquivo inválida');
    }

    if (/[<>:"|?*]/.test(value)) {
      throw new InvalidFileException(
        'O caminho do arquivo contém caracteres inválidos',
      );
    }

    if (!fs.existsSync(value)) {
      throw new InvalidFileException(
        'O caminho fornecido não corresponde a nenhum arquivo',
      );
    }

    const stats = fs.statSync(value);

    if (!stats.isFile()) {
      throw new InvalidFileException('O caminho fornecido não é um arquivo');
    }
  };

  public extractFilename(separator: string) {
    const [name] = this._originalValue.split(separator);

    return name.replace(/[^\w\s-]/gi, '');
  }

  get value(): string {
    return this._value;
  }
}
