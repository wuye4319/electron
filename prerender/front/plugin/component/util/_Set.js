/**
 * Author: Code Lai （赖传峰）
 * Email: codelai@staritgp.com
 * Desc:
 */

export default class _Set {
  constructor(array = []) {
    this.dataStore = array;
  }

  add(data) {
    if (this.dataStore.indexOf(data) < 0) {
      this.dataStore.push(data);
      return true;
    }
    else {
      return false;
    }
  }

  remove(data) {
    const pos = this.dataStore.indexOf(data);
    if (pos > - 1) {
      this.dataStore.splice(pos, 1);
      return true;
    }
    else {
      return false;
    }
  }

  size() {
    return this.dataStore.length;
  }

  toArray() {
    return this.dataStore;
  }
}