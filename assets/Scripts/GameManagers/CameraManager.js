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
        Player:{
            default:null,
            type: cc.Node,
        },
        ZoomRitoTarget:{
            default:null,
            type:cc.Node,
        },
        BackGround:{
            default:null,
            type:cc.Node,
        },
        Canvas:{default:null,type:cc.Node},
        Camera:{
            default:null,
            type:cc.Node,
        },
        UICamera:{
            default:null,
            type:cc.Node,
        },
        xBuffer:0,
        yBuffer:0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.HNeedToFollow = true ;
        this.VNeedToFollow = true ;
        this.NeedToZoom = true;
        cc.log(this.Canvas.width , this.Canvas.height);
        var Colliders = this.node.getComponents(cc.BoxCollider)
        for (var i = 0 ; i < Colliders.length ; i++ ) { 
            if (Colliders[i].tag == 0) { 
                Colliders[i].size.width = this.Canvas.width 
            } 
            if (Colliders[i].tag == 1) { 
                Colliders[i].size.height = this.Canvas.height 
            } 
        }
    },

    start () {

    },

    onCollisionStay(other, self){
        if(other.node.group == "AirWall"){
            switch(other.tag){
                case 0://下
                case 3://上
                    if(self.tag == 1){
                        this.VNeedToFollow = false ; 
                    }
                    break;
                case 1://左
                case 2://右
                    if(self.tag == 0){
                        this.HNeedToFollow = false ;
                    }
                    break;              
            }
        }
    },

    onCollisionEnter(other, self){
        if(other.node.group == "AirWall"){
            switch(other.tag){
                case 0://下
                case 3://上
                    if(self.tag == 1){
                        this.VNeedToFollow = false ; 
                    }
                    break;
                case 1://左
                case 2://右
                    if(self.tag == 0){
                        this.HNeedToFollow = false ;
                    }
                    break;              
            }
        }
    },

    onCollisionExit(other, self){
        if(other.node.group == "AirWall"){
            switch(other.tag){
                case 0://下
                case 3://上
                    if(self.tag == 1){
                        this.VNeedToFollow = true ; 
                    }
                    break;
                case 1://左
                case 2://右
                    if(self.tag == 0){
                        this.HNeedToFollow = true ;
                    }
                    break;              
            }
        } 
    },

    moveCamerafunc() {
        this.UICamera.setPosition(this.Player.getPosition());
        if(this.HNeedToFollow){
            this.Camera.x = this.Player.x;
        }
        if(this.VNeedToFollow){
            this.Camera.y = this.Player.y;
        }
        // var offset = 1/this.Camera._components[0]._zoomRatio
        // var moveXMaxDistance = (this.BackGround.width - this.node.width * offset) / 2 ;
        // var moveYMaxDistance = (this.BackGround.height - this.node.height * offset) / 2 ;
        // cc.log(offset , this.node.width * offset , this.node.height * offset);
        // if(Math.abs(this.Player.x) < moveXMaxDistance - this.xBuffer ){
        //     this.Camera.x = this.Player.x;
        // }

        // if(Math.abs(this.Player.y) < moveYMaxDistance - this.yBuffer ){
        //     this.Camera.y = this.Player.y;
        // }
    },

    setCameraZoomRatio(){
        //作废
        // if (this.ZoomRitoTarget.y > 0 ){
        //     this.Camera._components[0]._zoomRatio = 0.4;
        // }else if (this.ZoomRitoTarget.y < -this.node.height/2){
        //     // this.Camera._components[0]._zoomRatio = 1;
        // }else{
        //     this.Camera._components[0]._zoomRatio = (this.node.height / 2  - this.ZoomRitoTarget.y ) / this.node.height;
        // }
        //this.Camera._components[0]._zoomRatio = (640 / 2  - this.ZoomRitoTarget.y ) / 640;

    },

    update (dt) {
        //this.setCameraZoomRatio();
        this.moveCamerafunc();
    },
});
