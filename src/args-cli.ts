import { Operation } from './types';

export class ArgsCLI {
  private _typedPath: string;
  private _operation: Operation;

  constructor() {
    const args = process.argv.slice(2);

    if (args.length < 2) {
      throw new Error(
        'Argumentos insuficientes. Utilize: <caminho_do_arquivo> <operação>',
      );
    }

    const [typedFilePath, operationArg] = args;

    const operationMapper: Record<string, Operation> = {
      '-t': 'translate',
      '-e': 'execute',
    };

    const operation = operationMapper[operationArg];

    if (!operation) {
      throw new Error(
        `Operação inválida, utilize ${Object.keys(operationMapper).join(', ')} para traduzir ou executar`,
      );
    }

    this._typedPath = typedFilePath;
    this._operation = operation;
  }

  get typedFilePath(): string {
    return this._typedPath;
  }

  get operation(): Operation {
    return this._operation;
  }
}
