export class formats {
  mixin(map: object): formats;
  get(type: string): Function;
  add(type: string, callback: Function): formats;
  delete(type: string): formats;
}
