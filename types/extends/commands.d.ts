export class commands {
  mixin(map: object): commands;
  get(type: string): Function;
  add(type: string, callback: Function): commands;
  delete(type: string): commands;
}
