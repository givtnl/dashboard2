export {}
declare global {
    interface Array<T> {
        contains(o: T): boolean;
    }
}

Array.prototype.contains = function (o) {
    // code to remove "o"
    return this.indexOf(o) > -1;
}