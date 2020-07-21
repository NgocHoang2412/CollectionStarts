var GLOBAL = require("GLOBAL");

cc.Class({
    extends: cc.Component,

    properties: {
        ground: {
            default: null,
            type: cc.Node
        },
        player: {
            default: null,
            type: cc.Node
        },
        label: {
            default: null,
            type: cc.Label
        },
        timerLabel: {
            default: null,
            type: cc.Label
        },
        levelLabel: {
            default: null,
            type: cc.Label
        },
        gameOverNode: {
            default: null,
            type: cc.Node
        },
        gameWinNode: {
            default: null,
            type: cc.Node
        },
    },

    // use this for initialization
    onLoad: function () {
        this.TOTAL_LEVEL = 3;
        this.timer = GLOBAL.Timer;
        this.level = GLOBAL.Level;
        this.label.string =  " Score : " + this.player.getComponent('player').score;
        this.timerLabel.string =  " Timer : " + this.timer ;
        this.levelLabel.string =  " Level " + this.level;
        this.gameOverNode.active  = false;
        this.gameWinNode.active  = false;
        this.loadLevel();
        
    },

    loadLevel : function () {
        var groundNode = null;
        var starNode = null;
        for(var i=1; i<=this.TOTAL_LEVEL;i++){
            groundNode = this.node.getChildByName("ground_level_" + i);
            starNode = this.node.getChildByName("star_level_" + i);
            if(this.level == i){
                groundNode.active = true;
                starNode.active = true;
                this.starCount =  starNode.children.length;
            }
            else {
                groundNode.active = false;
                starNode.active = false;
            }
            
        }
        
    },

    gameOver : function () {
        this.gameOverNode.active = true;
        let targetPos = this.player.parent.convertToWorldSpaceAR(this.player.position);
        this.gameOverNode.position = this.node.parent.convertToNodeSpaceAR(cc.Vec2(targetPos.x - 480,0));
        GLOBAL.GameStatus = -1;
        var seq = cc.sequence(
            cc.delayTime(3),
            cc.callFunc(() => this.loadNextScene())
        );
        this.node.runAction(seq);
    },
    gameWin : function () {
        this.gameWinNode.active  = true;
        let targetPos = this.player.parent.convertToWorldSpaceAR(this.player.position);
        this.gameWinNode.position = this.node.parent.convertToNodeSpaceAR(cc.Vec2(targetPos.x - 480,0));
        GLOBAL.GameStatus = 1;
        var seq = cc.sequence(
            cc.delayTime(3),
            cc.callFunc(() => this.loadNextScene())
        );
        this.node.runAction(seq);
    },
    loadNextScene : function () {
        cc.director.loadScene("level");
    },
    // called every frame
    update: function (dt) {
        this.label.string =  " Score : " + this.player.getComponent('player').score;
       
        if(this.timer > 1){
            this.timer-=dt;
            if(this.player.getComponent('player').starCount == this.starCount){
                this.gameWin();
            }
            console.log("timerrrr = " + Math.floor(this.timer));
        }
        else {
            console.log("game over");
            this.gameOver();
                     
            return;
        }
        this.timerLabel.string =  " Timer : " + Math.floor(this.timer) ;
    },
});
