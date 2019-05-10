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
        xSpeed:0,
        target:{
            default:null,
            type: cc.Node,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.lostTarget = true ;
        this.direction = Math.random()*100 >= 50 ? -1 : 1 ;
        this.schedule(this.ChangDirction, 5);
    },

    ChangDirction(){
        if (this.lostTarget){
            this.direction = Math.random()*100 >= 50 ? -1 : 1 ;
        }   
    },
    start () {

    },

    MoveToTarget(){
        if(this.target != null ){
            if ( Math.abs(this.target.x - this.node.x) > 0 ){
                this.direction =  (this.target.x - this.node.x) / Math.abs(this.target.x - this.node.x) ;
            }else{
                this.lostTarget = false
                this.direction = 0 ;
            }
        }else{
            this.lostTarget = true 
        }
    },

    onCollisionEnter(other , self){
        cc.log("famer enter");
        this.direction = 0
    },

    onCollisionExit(other, self){
        cc.log("famer exit");
    },

    update (dt) {
        this.MoveToTarget();
        this.node.x += dt * this.xSpeed * this.direction ;
    },
});
