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
    },

    onCollisionStay(other , self){

    },
    onCollisionEnter(other, self){
        if(other.node.group == "AirWall"){
            switch(other.tag){
                case 0://下
                case 3://上
                    self.node.getComponent("PMoveMotor").borderCheck("vertical") ;
                   // self.node.getComponent("PMoveMotor").yAcce = 0 ;
                    break;
                case 1://左
                case 2://右
                    self.node.getComponent("PMoveMotor").borderCheck("horizon");
                    //self.node.getComponent("PMoveMotor").xAcce = 0 ;
                    break;
                            
            }
            self.node.getComponent("AnimationControl").RoleStatu = 1 ;
        }
    },
    onCollisionExit(other , self){

    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
