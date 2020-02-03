export class GeneralExtensions {
  private static toCamelCase(inputString: string): string {
    if (inputString) {
      return inputString.replace(/\W+(.)/g, function(match, chr) {
        return chr.toLowerCase();
      });
    }
    return inputString;
  }

  public static keysToCamelCase(o: any): any {
    const serializedObject = JSON.stringify(o);
    return JSON.parse(serializedObject, function(key, value) {
      if (value && typeof value === 'object')
        for (var k in value) {
          if (/^[A-Z]/.test(k) && Object.hasOwnProperty.call(value, k)) {
            value[k.charAt(0).toLowerCase() + k.substring(1)] = value[k];
            delete value[k];
          }
        }
      return value;
    });
  }
}
