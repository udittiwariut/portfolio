export class Utility {
  static getMagnitude(x, y) {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  }

  static checkNonZeroComponents(x, y) {
    return Math.abs(x) > 0 || Math.abs(y) > 0;
  }

  static getNormalization(x, y) {
    return this.checkNonZeroComponents(x, y) ? 1 / this.getMagnitude(x, y) : 0;
  }
}
