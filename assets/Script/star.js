// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    //  onLoad () {
    //     cc.director.getCollisionManager().enabledDebugDraw = true;
    //     cc.director.getCollisionManager().enabled = true;
    //     cc.director.getCollisionManager().enabledDrawBoundingBox = true;
    //  },

    // onCollisionEnter(other, self) {
    //     console.log("Currently colliding");
    //     this.node.destroy();
    // },
    // onCollisionExit(other,self){
    //     console.log("Done colliding");
    // },

    start () {

    },

    // update (dt) {},
});
