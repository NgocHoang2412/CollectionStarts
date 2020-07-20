var GLOBAL = require("GLOBAL");

cc.Class({
    extends: cc.Component,

    properties: {
        totalScore: {
            default: null,
            type: cc.Label
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.level = 0;
        if(GLOBAL.TotalScore == undefined){
            GLOBAL.TotalScore = 0;
        }
        this.totalScore.string = "Total Score : " + GLOBAL.TotalScore;
        console.log(" GLOBAL.TotalScore:", GLOBAL.TotalScore);
    },

    onClickLevel : function (e, level){
        this.level = parseInt(level);
        console.log("on_button_click called:", this.level);
        GLOBAL.Level = this.level;
        this.setTimerLevel(this.level);
        cc.director.loadScene("game");
        GLOBAL.GameStatus = 0;
    },

    setTimerLevel : function (level){
        switch (level) {
            case 1:
                GLOBAL.Timer = 30;
                break;
            case 2:
                GLOBAL.Timer = 20;
                break;
            case 3:
                GLOBAL.Timer = 15;
                break;
        }
    },

    start () {

    },

    // update (dt) {},
});
