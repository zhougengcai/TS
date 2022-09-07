import './style/index.less';
class ScorePanel {
    score=0;
    level=1;
    maxLevel : number;
    scoreEle:HTMLElement;
    levelEle:HTMLElement;
    constructor(maxLevel:number = 10) {
        this.maxLevel = maxLevel
        this.scoreEle = document.getElementById('score')!;
        this.levelEle = document.getElementById('level')!;
    }
    addScore(){
        this.scoreEle.innerHTML = ++this.score + ''
        if(this.score % 1 === 0){
            this.levelUp()
        }
    }
    levelUp(){
        if(this.level < this.maxLevel)
        this.levelEle.innerHTML = ++this.level + ''

    }
}
class Food{
    element:HTMLElement;
    constructor() {
        this.element = document.getElementById('food')!;
    }
    get x() {
        return this.element.offsetLeft
    }
    get y(){
        return this.element.offsetTop
    }
    change () {
        //food坐标必须是整10
        let top= Math.round(Math.random()*29) *10 
        let left= Math.round(Math.random()*29) *10 
        this.element.style.left = left +'px';
        this.element.style.top = top +'px';
    }
}
class Snake{
    head:HTMLElement;
    bodies:HTMLCollectionOf<HTMLElement>;
    element:HTMLElement;
    constructor(){
        this.element = document.getElementById('snake')!
        this.head = document.querySelector('#snake > div')!
        this.bodies = document.getElementById('snake')!.getElementsByTagName('div')
    }
    get x(){
        return this.head.offsetLeft;
    }
    get y(){
        return this.head.offsetTop;
    }
    set x(value:number){
        if(this.x === value){
            return
        }
        if(value < 0 || value > 290){
            throw new Error('蛇撞墙了')
        }
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft == value){
            console.log(value);
            
            if(value > this.x){
                value = this.x-10
            }else{
                value = this.x+10 
            }
        }
        this.moveBody()
        this.head.style.left = value + 'px';
        this.checkHeadBody();
    }
    set y(value:number){ 
        if(this.y === value){
            return
        }
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop == value){
            console.log(value);
            
            if(value > this.y){
                value = this.y-10
            }else{
                value = this.y+10 
            }
        }
        this.moveBody()
        this.head.style.top = value + 'px';
        this.checkHeadBody();
    }
    addBody(){
        this.element.insertAdjacentHTML('beforeend',"<div></div>")
    }
    moveBody(){
        /**
         * 
         * 第四等于第三的位置依此类推
         */
        for(let i = this.bodies.length-1; i > 0 ;i--){
            let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i-1] as HTMLElement).offsetTop;
            (this.bodies[i] as HTMLElement).style.left = X +'px';
            (this.bodies[i] as HTMLElement).style.top = Y +'px';
        }
    }
    //获取所有身体，检查是否发生重叠
    checkHeadBody(){
        for (let i = 1; i < this.bodies.length; i++) {
            const bd = this.bodies[i];
            if(this.x === bd.offsetLeft && this.y ===bd.offsetTop){
                throw new Error("撞到自己了")
            }
            
        }
    }
    
}

class GameControl{
     snake:Snake;
     scorePanel:ScorePanel;
     food:Food;
     direction:string = '';
     isLive = true;
     constructor () {
        this.snake=new Snake();
        this.scorePanel=new ScorePanel();
        this.food=new Food();
        this.init();
     }
     init(){
        document.addEventListener('keydown',this.keydownHandler.bind(this))
        this.run()
     }
     keydownHandler(event:KeyboardEvent){
        this.direction = event.key        
     }
     run(){
        let X = this.snake.x;
        let Y = this.snake.y;
        switch (this.direction) {
            case 'ArrowUp':
            case 'Up':

                Y -= 10;
                break;
            case 'ArrowLeft':
            case 'Left':

                X -= 10;
                break;
            case 'ArrowRight':
            case 'Right':

                X += 10;
                break;
            case 'ArrowDown':
            case 'Down':

                Y += 10;
                break;
        
            default:
                break;
        }
        this.checkEat(X,Y)
       try{
            this.snake.x = X;
            this.snake.y = Y
       }catch(e:any){
            alert(e.message + '游戏结束');
            this.isLive=false;
       }
        this.isLive && setTimeout(this.run.bind(this),300 - (this.scorePanel.level-1) * 30)
    }
    checkEat(x:number,y:number){
       if(x === this.food.x && y === this.food.y ) {
            this.food.change();
            this.scorePanel.addScore();
            this.snake.addBody();
       }
    }
    

}
const gc = new GameControl();

