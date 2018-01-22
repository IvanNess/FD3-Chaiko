
class Product{
    name:String;
    scale: number;
    constructor(name:String, scale:number){
        this.name = name;
        this.scale = scale;
    }
    getName():String{
        return this.name;
    }
    getScale():number{
        return this.scale;
    }
}

class Apple extends Product{}
class Tomato extends Product{}

class Scales {

    products:Array<Product>;
    constructor(){
        this.products=[];
    }
    add(product:Product):Scales{
        this.products.push(product);
        return this;
    }
    getSumScale():number{
        return this.products.reduce((r:number, v:Product):number=>{
            return r=r+v.getScale();
        }, 0);
    }
    getNameList():Array<Product>{
        return this.products;
    }
}

let apple0 = new Apple('zeroApple', 3);
let apple1 = new Apple('first', 4);
let apple2 = new Apple('second', 2);
let tomato0 = new Tomato('zeroTomato', 1.5);
let scales = new Scales();

scales.add(apple0).add(apple1).add(apple2).add(tomato0);
console.log(scales.getSumScale());
console.log(scales.getNameList());