// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        target: {
            default: null,
            type: cc.Node
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.position = this.target.convertToWorldSpaceAR(cc.Vec2.ZERO);
    },

    start () {

    },

    update (dt) {

        let targetPos = this.target.parent.convertToWorldSpaceAR(this.target.position);
        this.node.position = this.node.parent.convertToNodeSpaceAR(cc.Vec2(targetPos.x,320));
    },
});
