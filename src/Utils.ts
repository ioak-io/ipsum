export function isEmptyOrSpaces(str: string) {
  return str === null || str.match(/^ *$/) !== null;
}

export function match(text: string, words: string) {
  let found = false;
  if (words) {
    words.split(' ').forEach(word => {
      if (text.match(new RegExp(`(\\w*${word}\\w*)`, 'gi'))) {
        found = true;
      }
    });
  }
  return found;
}

export function sort(array: any, property: string, isReverseOrder: boolean) {
  const result = array.sort(function(o1: any, o2: any) {
    if (isReverseOrder) {
      return o1[property] > o2[property]
        ? -1
        : o1[property] < o2[property]
        ? 1
        : 0;
    }
    return o1[property] < o2[property]
      ? -1
      : o1[property] > o2[property]
      ? 1
      : 0;
  });

  return result;
}
