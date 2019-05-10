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
        PlanetPrefab:{
            default:[],
            type:[cc.Prefab],
        },
        NewPlanetIntervel:0,
        healTarget:{
            default:null,
            type:cc.Node,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.schedule(this.InitNewPlanet , this.NewPlanetIntervel);
    },

    InitNewPlanet(){
        var newPlanet = cc.instantiate(this.PlanetPrefab[parseInt(Math.random()*100)%this.PlanetPrefab.length]);
        newPlanet.getComponent("rice").healTarget = this.healTarget;
        newPlanet.setPosition(Math.random()*this.node.width/2 * (Math.random()>=0.5?1:-1), 0);
        this.node.addChild(newPlanet);
    },

    onDestroy(){
        this.unschedule(this.InitNewPlanet, this)
    },

    start () {

    },

    // update (dt) {},
});
