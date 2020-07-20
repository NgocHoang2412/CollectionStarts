var GLOBAL = require("GLOBAL");

cc.Class({
    extends: cc.Component,

    properties: {
        ground: {
            default: null,
            type: cc.Node
        },
        // player node for obtaining the jump height of the main character and controlling the movement switch of the main character
        player: {
            default: null,
            type: cc.Node
        },
        star: {
            default: null,
            type: cc.Prefab
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
        this.timer = GLOBAL.Timer;
        this.level = GLOBAL.Level;
        this.label.string =  " Score : " + this.player.getComponent('player').score;
        this.timerLabel.string =  " Timer : " + this.timer ;
        this.levelLabel.string =  " Level " + this.level;
        this.gameOverNode.active  = false;
        this.gameWinNode.active  = false;

        var starNode = this.node.getChildByName("star");
        this.starCount =  starNode.children.length;
        console.log("count_star ==== " + this.starCount);
    },

    gameOver : function () {
        this.gameOverNode.active = true;
        GLOBAL.GameStatus = -1;
        var seq = cc.sequence(
            cc.delayTime(3),
            cc.callFunc(() => this.loadNextScene())
        );
        this.node.runAction(seq);
    },
    gameWin : function () {
        this.gameWinNode.active  = true;
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
