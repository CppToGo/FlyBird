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
        lifeValue:0,
        energyValue:0,
        lifeLabale:{
            default:null,
            type:cc.Label,
        },
        energyPrice:0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.life = this.lifeValue;
        this.energy = this.energyValue;
        this.energySwitch = true ;
        this.lifeLabale.string = "HP:" + parseInt(this.life) ;//+ " EN:" + parseInt(this.energy);
    },

    start () {

    },

    AddLife(value){
        if(this.life >= 0 && this.life <= this.lifeValue){
            if (value > 0 ){
                if (this.life + value <= this.lifeValue){
                    this.life += value;
                }else{
                    this.life = this.lifeValue
                }
            }else{
                if( this.life + value  >= 0 ){
                    this.life += value;
                }else{
                    this.life = 0;
                }
            }
        }       
    },

    AddEnergy(value){
        if (value > 0 ){
            if (this.energy + value < this.energyValue){
                this.energy += value;
            }else{
                this.energy = this.energyValue
            }
        }else{
            if( this.energy + value  > 0 ){
                this.energy += value;
            }else{
                this.energy = 0;
            }
        }
    },

    CostEnergy(flag){
        if (flag){
            if(this.energySwitch){
                this.schedule(this.callbackFunc , 0.5)
                this.energySwitch = false ;
            }
        }else{
            if(!this.energySwitch){
                this.unschedule(this.callbackFunc , this)
                this.energySwitch = true ;
            }
        }
    },

    callbackFunc(){
        this.AddEnergy(this.energyPrice)
    },
    
    update (dt) {
        this.lifeLabale.string = "HP:" + parseInt(this.life) ;//+ " EN:" + parseInt(this.energy);
    },
});
