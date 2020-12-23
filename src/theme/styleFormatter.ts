export class StyleFormatter {
  output: string

  constructor(output = '') {
    this.output = output;
  }
  
  get styles() {
    return this.output
  }
}