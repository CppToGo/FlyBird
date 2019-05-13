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
        AudioClips:{
            default:[],
            type:[cc.AudioClip],
        },
        BufferWidth:0,
        LMLine:0,
        MHLine:0
    },

    // LIFE-CYCLE CALLBACKS:

    onCollisionEnter(other, self){
        //cc.audioEngine.setVolume(this.AudioID[self.tag], 1);
    },
    onCollisionStay(other, self){
        cc.audioEngine.setVolume(this.AudioID[self.tag], 0.8);
        // if (this.Target.getPosition().y !=  self.offset.y ){
        //     cc.audioEngine.setVolume(this.AudioID[self.tag], value);
        // }else{
        //     cc.audioEngine.setVolume(this.AudioID[self.tag], 1);
        // }

    },
    onCollisionExit(other, self){
        cc.audioEngine.setVolume(this.AudioID[self.tag], 0.2);
    },

    onLoad () {
       this.AudioID = new Array(cc.audioEngine.play(this.AudioClips[0],true , 0),cc.audioEngine.play(this.AudioClips[1],true , 0),cc.audioEngine.play(this.AudioClips[2],true , 0));
    },

    start () {

    },

    // update (dt) {},
});
