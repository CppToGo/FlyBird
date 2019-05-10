// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        xSpeedNormal:0,
        xSpeedRun:0,
        DirectionInterval:0,
        ClosestDistence:0,
        target:{
            default:null,
            type: cc.Node,
        },
        translator:{
            default:null,
            type:cc.Node,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.lostTarget = true ;
        this.moveDirection = Math.random() >= 0.5 ? 1 : -1 ; //true 为方向向右 ，false 反之
        this.xSpeed = this.xSpeedNormal;
        this.schedule(this.changeDirection , this.DirectionInterval )
        this.offset2Target = this.translator.getPosition();
    },

    changeDirection(){
        if (this.lostTarget){
            this.moveDirection =  Math.random() >= 0.5 ? 1 : -1 ; //true 为方向向右 ，false 反之
        } 
    },

    MoveToTarget(){
        if(this.target != null ){
            var worldPos = this.target.getPosition()
            var localPos = this.node.getPosition()
            localPos.x += this.offset2Target.x
            if ( Math.abs(worldPos.x - localPos.x) > this.ClosestDistence ){
                this.xSpeed = this.xSpeedRun;
                this.moveDirection =  (worldPos.x - localPos.x) / Math.abs(worldPos.x - localPos.x) ;
            }else{
                this.lostTarget = false
                this.moveDirection = 0 ;
            }
        }else{
            this.lostTarget = true                   
            this.xSpeed = this.xSpeedNormal;
        }
    },

    start () {

    },

    onCollisionEnter(other, self){
        if (self.tag == 0 && other.node.group == "AirWall") {
            switch (other.tag) {
                case 0://下
                case 3://上
                    this.moveDirection = -this.moveDirection;
                    // self.node.getComponent("PMoveMotor").yAcce = 0 ;
                    break;
                case 1://左
                case 2://右
                    this.moveDirection = -this.moveDirection;
                    //self.node.getComponent("PMoveMotor").xAcce = 0 ;
                    break;

            }
        }
        

    },

    update (dt) {
        this.MoveToTarget();
        this.node.x += this.xSpeed * dt * this.moveDirection;
    },
});
