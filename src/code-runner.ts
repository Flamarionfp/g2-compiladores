export class CodeRunner {
  public static runJavascriptCode(javascriptCode: string) {
    eval(javascriptCode);
  }
}
