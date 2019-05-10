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
        statu:0,
        ripenedSize:cc.v2(50,100),
        growUpDura:0, // 成长时间
        existDura:0,    // 存在时间
        harvestDura:0,  // 收获所需时间
        energy:0, //能量
        frenquence:0,
        healTarget:{
            default:null,
            type:cc.Node,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.getComponent(cc.BoxCollider).enabled = false ;
        this.growSpeed = new cc.v2( (this.ripenedSize.x - this.node.width) / this.growUpDura , (this.ripenedSize.y - this.node.height) / this.growUpDura);
        this.originSize = new cc.v2(this.node.width , this.node.height);
        this.timer = 0
        this.addSpeed = 1 ;
    },

    start () {
        
    },

    GrowUpFunc(dt){
        this.node.width += dt * this.growSpeed.x ;
        this.node.height += dt * this.growSpeed.y ;
        this.node.y += dt * this.growSpeed.y / 2;
        this.timer += dt ;
        if (this.growUpDura - this.timer <= 0){
            this.statu ++;
            this.timer = 0 
        }
    },

    RipenedFunc(dt){
        this.node.getComponent(cc.BoxCollider).enabled = true ;
        this.timer += dt * this.addSpeed;
        if ( this.existDura - this.timer <= 0 ){
            this.statu ++;
            this.timer = 0
        }
    },

    harvestFunc(dt){
        this.timer += dt * this.addSpeed;
        if (this.harvestDura - this.timer<= 0 ) {
            this.statu ++ ;
            this.timer = 0;
        } 
    },

    DestroyFunc(dt){
        this.node.getComponent(cc.BoxCollider).enabled = false ;
        //this.node.destroy();
        this.statu = 0;
        this.node.width = this.originSize.x;
        this.node.height = this.originSize.y;
        this.node.y -=  (this.ripenedSize.y - this.originSize.y) / 2 ;
    },

    HealBird(){
        this.healTarget.getComponent("LifeManager").AddLife(this.energy);
    },

    onCollisionEnter(other ,self){
        if (other.node.group == "Player"){
            this.addSpeed *= 2 ;
            this.schedule(this.HealBird, this.frenquence);
        }
        if (other.node.group == "Enemy" && other.tag == 0 && other.node.getComponent("E_S_Collider").EnemyType == 0){
            this.addSpeed *= 2 ;
        }
    },
    onCollisionExit(other, self){
        if (other.node.group == "Player"){
            this.addSpeed /= 2 ;
            this.unschedule(this.HealBird, this );
        }
        if (other.node.group == "Enemy" && other.tag == 0 && other.node.getComponent("E_S_Collider").EnemyType == 0){
            this.addSpeed /= 2 ;
        }
    },

    update (dt) {
        switch(this.statu){
            case 0:
                if(parseInt(Math.random()*100) == 0 ){
                    this.statu ++;
                }
                break;
            case 1:
                this.GrowUpFunc(dt);
                break;
            case 2:
                this.RipenedFunc(dt);
                break;
            case 3:
                this.harvestFunc(dt);
                break;
            case 4:
                this.DestroyFunc(dt);
                break;
        }
    },
});
