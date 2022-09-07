class dog{
    name:string;
    age:number;
    constructor (name:string,age:number) {
        this.name = name;
        this.age = age;
    }
}
let dog1 = new dog(name:'1',age:2);
let dog12 = new dog(name:'12',age:22);
console.log('====================================');
console.log(dog1.name,dog12.age);
console.log('====================================');