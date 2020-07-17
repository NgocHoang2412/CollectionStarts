
cc.Class({
    extends: cc.Component,

    properties: {
        moveSpeed : 0,
        jumpHeight : 0,
        maxJumpDuration : 0,
        score : 0,
        body : cc.RigidBody,
        audio: {
            default: null,
            type: cc.AudioClip
        }
     },
    
    start: function () {
        this.playerMove = this.getComponent(cc.Animation);
        this.isMovingleft = false;
        this.isMovingRight = false;
        this.isJumping = false;
        this.jumpDuration = 0;
    },
    
    onLoad: function () {
        
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        //cc.director.getCollisionManager().enabledDebugDraw = true;
        cc.director.getCollisionManager().enabled = true;
        //cc.director.getCollisionManager().enabledDrawBoundingBox = true;

        this.physicsManager = cc.director.getPhysicsManager();
        this.physicsManager.enabled = true;
        this.physicsManager.gravity = cc.v2(0, 0);

        this.body = this.getComponent(cc.RigidBody);
    },

    onCollisionEnter(other, self) {
        //console.log("Currently colliding");
        other.node.destroy();
        this.score += 10;
        cc.audioEngine.play(this.audio, false, 1);
        //console.log("Currently score ===  " + this.score);
    },

    onDestroy () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
 
    onKeyDown: function (event) {
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                //console.log('Press a key');
                this.isMovingLeft = true;
                this.playerMove.play('dude_left');
            break;
            case cc.macro.KEY.d:
               // console.log('Press d key');
                this.isMovingRight = true;
                this.playerMove.wrapMode = cc.WrapMode.Loop;
                this.playerMove.play('dude_right');
            break;
            case cc.macro.KEY.w:
                //console.log('Press w key');
                this.isJumping = true;
                
            break;
        }
    },

    onKeyUp: function(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.isMovingLeft = false;
                this.playerMove.play('dude');
                break;
            case cc.macro.KEY.d:
                this.isMovingRight = false;
                this.playerMove.play('dude');
                break;
            case cc.macro.KEY.w:
                this.isJumping = false;
                this.jumpDuration = 0;
                break;
         }
    },
    
    update (dt) {

        if (this.isMovingLeft) {
            this.node.x -= this.moveSpeed * dt;
        }
        else if (this.isMovingRight) {
            this.node.x += this.moveSpeed * dt;
        }
        var speed = this.body.linearVelocity;
        if (this.isJumping) {
            this.jumpDuration += dt; 
            if(this.jumpDuration < this.maxJumpDuration){
                speed.y = this.jumpHeight;
            }
            else {
                this.isJumping = false;
            }
        }
        else
        {
            speed.y = -this.jumpHeight;
        }
        this.body.linearVelocity = speed;
    }
});
