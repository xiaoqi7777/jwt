import Animal from './animal'
class Person extends Animal{
  constructor(name,age){
    super(name)
    this.age = age
  }
}
let p = new Person('zhufeng',10)
console.log(p)