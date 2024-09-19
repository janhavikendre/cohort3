class Rectangle {
    constructor(width,heigth,color){
        this.width = width;
        this.heigth = heigth;
        this.color = color;

    }

    area(){
        const area = this.width * this.heigth;
        return area;
    }

    paint(){
        return this.color;
    }
}

const rect = new Rectangle(10,5,'red');
console.log(rect.area());
console.log(rect.paint());