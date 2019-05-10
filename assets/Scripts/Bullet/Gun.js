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
        BulletPrefab:{
            default:null,
            type:cc.Prefab,
        },
        BulletParents:{
            default:null,
            type:cc.Node,
        },
        Intervel:0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.Fired = false ;
    },

    LoadBullet:function(){
        this.Fired = true;
        this.BulletCahe = cc.instantiate(this.BulletPrefab);
        this.BulletCahe.getComponent("BulletScript").Target = this.node.getComponent("E_MoveMotor").target ;
        this.BulletCahe.setPosition( this.node.convertToWorldSpaceAR(cc.v2(-480,-320)));
        this.BulletParents.addChild(this.BulletCahe);
    },

    start () {

    },

    update (dt) {
        if (this.node.getComponent("E_MoveMotor").target != null && this.node.getComponent("E_MoveMotor").target.group == "Player" && !this.Fired){
            this.schedule(this.LoadBullet , this.Intervel);
        }else if (this.node.getComponent("E_MoveMotor").target == null || this.node.getComponent("E_MoveMotor").target.group == "Rice") {
            this.unschedule(this.LoadBullet , this);
            this.Fired = false
        }
    },
});
