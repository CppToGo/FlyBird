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
        isOpacity:false,
        OpacityValue:0,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onCollisionEnter: function (other) {
        if(this.isOpacity){
            this.node.opacity = this.OpacityValue;
        }
        cc.log('on collision stay');
    },

    onCollisionStay: function (other) {
         console.log('on collision stay');
    },

    onCollisionExit: function (other) {
        if(this.isOpacity){
            this.node.opacity = 255;
        }
        cc.log('on collision stay');
    },


    start () {

    },

    // update (dt) {},
});
