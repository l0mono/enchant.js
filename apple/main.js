enchant();
window.onload = function () {
    
    var core = new Core(640,640);
    core.preload("cat.png");
    core.fps = 30;
    core.onload = function () {

        const TIME = 10;

        var cat = new Sprite(100,100);
        cat.image = core.assets["cat.png"];
        cat.x = 270;
        cat.y = 540;
        cat.scaleX = 0.5;
        cat.scaleY = 0.5;

        cat.frame = 0;
        cat.on("enterframe",function(){
            if(core.input.left){
                this.frame = this.age%2;
                this.x -= 5;
                cat.scaleX = -0.5;
            }
            if(core.input.right){
                this.frame = this.age%2;
                this.x += 5;
                cat.scaleX = 0.5;
            }
        });
        core.rootScene.addChild(cat);

        var time = new Label();
        time.x = 10;
        time.y = 10;
        time.font = "20px Hirageno";
        time.text = "Time: " ;
        core.rootScene.addChild(time);

        core.rootScene.on("enterframe", function () {
            time.text = "Time: "+((((TIME * core.fps) - core.frame)) / core.fps).toFixed(0);
            if(core.frame >= (core.fps * TIME)){
                core.pushScene(gameOver);
                core.stop();
            }
        });

        var gameOver = new Scene();
        gameOver.backgroundColor = "black";

        var goLabel = new Label();
        goLabel.x = 280;
        goLabel.y = 310;
        goLabel.text = "Game Over";
        goLabel.font = "20px Hiragino";
        goLabel.color = "white";
        gameOver.addChild(goLabel);
    }
    core.start();
}