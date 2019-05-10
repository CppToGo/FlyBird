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
        xSpeed:{
            default:0,
        },
        ySpeed:{
            default:0,
        },
        xMaxSpeed:{
            default:0,
        },
        yMaxSpeed:{
            default:0,
        },
        xAcceleration:{
            default:0,
        },
        yAcceleration:{
            default:0,
        },
        borderNode:{
            default:null,
            type:cc.Node,
        },
        landNode:{
            default:null,
            type: cc.Node,
        },
        borderWidth:0,
        touchBorderDuration:0,
        labale:{
            default:null,
            type:cc.Label,
        },

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.xSpeed = 0 ;
        this.ySpeed = 0 ;
        this.xAcce = 0 ;
        this.yAcce = -this.yAcceleration ;
        cc.systemEvent.setAccelerometerEnabled(true);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this); //注册重力传感响应事件
    },

    onDestroy(){
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown , this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp , this);
        cc.systemEvent.off(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this); //注册重力传感响应事件
        
    },


    onDeviceMotionEvent(event){
        this.labale.string =  "X:" + parseInt(event.acc.x * 1000)  + " Y:" + parseInt(event.acc.y * 1000)+ " Z:" + parseInt(event.acc.z * 1000);
        if ( Math.abs(parseInt(event.acc.x * 1000)) > 150 ){
            if (parseInt(event.acc.x * 1000) > 0 ){
              if (parseInt(event.acc.y * 1000) > 0){
                this.xAccControl(-1);
              }else{
                this.xAccControl(1);
              }    
            }else if (parseInt(event.acc.x * 1000) < 0){
                if (parseInt(event.acc.y * 1000) > 0){
                    this.xAccControl(1);
                  }else{
                    this.xAccControl(-1);
                  } 
            }
        }else{
            this.xAccControl(0);
        }
    },

    xAccControl(flag){
        switch(flag){
            case -1:
                this.xAcce = -Math.abs(this.xAcceleration);
                this.node.scaleX = 1; //设置人物的方向
                break;
            case 1:
                this.xAcce = Math.abs(this.xAcceleration);
                this.node.scaleX = -1; //设置人物的方向
                break;
            case 0:
                this.xAcce = 0;
                break;
        }
    },

    yAccControl(flag){
        if(flag){
            this.yAcce = this.yAcceleration
        }else{
            this.yAcce = -this.yAcceleration 
        }
    },

    onKeyDown(event){
        switch(event.keyCode){
            case cc.macro.KEY.a:
                this.xAccControl(-1);
            break;
            case cc.macro.KEY.d:
                this.xAccControl(1)
            break;
            case cc.macro.KEY.space:
                this.yAccControl(true)
            break;
        }
    },

    onKeyUp(event){
        switch(event.keyCode){
            case cc.macro.KEY.a:
                this.xAcce = 0
            break;
            case cc.macro.KEY.d:
                this.xAcce = 0
            break;
            case cc.macro.KEY.space:
                this.yAccControl(false)
            break;
        }
    },

    start () {

    },

    speedCheck(dt){
        this.xSpeed += dt * this.xAcce;
        if (Math.abs(this.xSpeed) > this.xMaxSpeed ){
            this.xSpeed = this.xMaxSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }
        this.ySpeed += dt * this.yAcce;
        if (Math.abs(this.ySpeed) > this.yMaxSpeed ){
            this.ySpeed = this.yMaxSpeed * this.ySpeed / Math.abs(this.ySpeed);
        }
        
    },

    borderCheck(flag){
        if(flag == "horizon"){
            this.node.runAction(cc.moveBy(this.touchBorderDuration ,cc.v2(-(this.xSpeed)/Math.abs(this.xSpeed) * this.borderWidth ,0)).easing(cc.easeCubicActionOut()));
            this.xSpeed = 0;
        }
        if(flag == "vertical"){
            this.node.runAction(cc.moveBy(this.touchBorderDuration ,cc.v2( 0 ,-(this.ySpeed)/Math.abs(this.ySpeed) * this.borderWidth)).easing(cc.easeCubicActionOut()));
            this.ySpeed = 0;
        }
        // if(Math.abs(this.node.x) >= (this.borderNode.width / 2)){ // 超出水平边界

        // }
        // if(this.node.y >= (this.borderNode.height / 2)){ // 超出垂直边界

        // }else if(this.node.y <= this.landNode.height - this.borderNode.height / 2 ){
        //     this.xSpeed = 0;
        //     this.ySpeed = 0;
        //     this.yAcce = 0
        // }
    },

    CallLifeComponent(dt){
        var LifeManager = this.node.getComponent("LifeManager");
        // if (LifeManager.energy > 0 ){
            
        // }
    },

    update (dt) {
        this.speedCheck(dt);
        this.CallLifeComponent(dt);
        this.node.x += dt * this.xSpeed; 
        this.node.y += dt * this.ySpeed;
        this.borderCheck();
    },
});
