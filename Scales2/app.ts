
class Product{
    protected name:string;
    protected scale: number;
    constructor(name:string, scale:number){
        this.name = name;
        this.scale = scale;
    }
}

interface IScalable{
    getName():string;
    getScale():number;    
}

class Apple extends Product implements IScalable{
    getName():string{
        return this.name;
    }
    getScale():number{
        return this.scale;
    }    
}
class Tomato extends Product implements IScalable{
    getName():string{
        return this.name;
    }
    getScale():number{
        return this.scale;
    }
}

class Scales {
    products:Array<IScalable>;
    constructor(){
        this.products=[];
    }
    add(product:IScalable):Scales{
        this.products.push(product);
        return this;
    }
    getSumScale():number{
        return this.products.reduce((r:number, v:IScalable):number=>{
            return r=r+v.getScale();
        }, 0);
    }
    getNameList():Array<string>{
        return this.products.map(function(v, i, a){
            return v.getName();
        });
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