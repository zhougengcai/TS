"use strict";
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
let per = new Person(name, '1', age, 2);
let per2 = new Person(name, '12', age, 22);
console.log('====================================');
console.log(per.name, per.age);
console.log('====================================');
