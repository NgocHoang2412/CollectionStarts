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
        
    },

    // use this for initialization
    onLoad: function () {
        this.label.string =  " Score : " + this.player.getComponent('player').score;
    },

    // called every frame
    update: function (dt) {
        this.label.string =  " Score : " + this.player.getComponent('player').score;
    },
});
