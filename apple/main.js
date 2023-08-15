enchant();
window.onload = function () {
    
    var core = new Core(640,640);
    core.preload("cat.png","apple.png","meow.wav");
    core.fps = 30;
    core.onload = function () {

        const TIME = 10;
        var score = 0;

        var Apple = Class.create(Sprite,{
            initialize: function(){
                Sprite.call(this,100,100);
                this.x = rand(640);
                this.y = 0;
                this.scaleX = 0.25;
                this.scaleY = 0.25;
                this.image = core.assets["apple.png"];
                this.frame = 0;
                this.on("enterframe",function(){
                    this.y += 5;
                    if(this.y >= 640){
                        core.rootScene.removeChild(this);
                    }
                    if(this.within(cat,30)){
                        core.assets["meow.wav"].clone().play();
                        core.rootScene.removeChild(this);
                        score++;
                    }
                });
                core.rootScene.addChild(this);
            }
        });

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

            if (core.frame % 10 == 0){
                var apple = new Apple();
            }
            if(core.frame >= (core.fps * TIME)){
                scoreLabel.text = "Score : "+score;
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

        var scoreLabel = new Label();
        scoreLabel.x = 550;
        scoreLabel.y = 10;
        scoreLabel.text = "Score : 0";
        scoreLabel.font = "20px Hiragino";
        scoreLabel.color = "white";
        gameOver.addChild(scoreLabel);
    }
    core.start();
}

function rand(n){
    return Math.floor(Math.random() * (n + 1))
}