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
        Target:{
            default:null,
            type:cc.Node,
        },
        AudioClip:{
            default:[],
            type:[cc.AudioClip],
        },
        Speed:0,
        Duration:0,
        Damage:0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.Destination = this.Target.getPosition();
        var vec = this.Target.getPosition().sub(this.node.getPosition());
        this.ComVec = new cc.Vec2(0,1);
        var angle = vec.signAngle(this.ComVec)
        this.node.rotation = cc.misc.degreesToRadians(angle);
        
        var Distance  = Math.sqrt(vec.x * vec.x + vec.y * vec.y);
        var DuraTime = parseInt(Distance / this.Speed);
       
        this.node.runAction( cc.sequence(cc.callFunc(function(){
            cc.audioEngine.playEffect(this.AudioClip[0],false);
        }, this),cc.moveTo(2 ,  this.Destination).easing(cc.easeCubicActionIn())));
    },  

    onCollisionEnter(other ,self){
        cc.audioEngine.playEffect(this.AudioClip[1],false);
        this.node.destroy();
    },

    start () {

    },

    // update (dt) {},
});
