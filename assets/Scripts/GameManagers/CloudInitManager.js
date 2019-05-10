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
        CloudPrefab:{
            default:null,
            type: cc.Prefab,
        },
        CloudsNumLimit:0,
        spawnIntervel:0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.CloudsNum = 0;
        this.schedule(this.spawnCloud, this.spawnIntervel)
    },
    
    start () {
    },

    spawnCloud:function(){
        this.checkClouldNum();
        //todo 随便写的一个条件
        if (parseInt(Math.random() * 100) >= 50 ){
            return;
        }
        if(this.CloudsNum < this.CloudsNumLimit ){
            var newCloud = cc.instantiate(this.CloudPrefab);
            var newPos = this.getSpawnPos();
            newPos.x = newPos.x + newCloud.width / 2;
            newCloud.setPosition(newPos);
            this.node.addChild(newCloud);
            this.CloudsNum ++ ;
        }
    },

    onDestroy(){
        this.unschedule(this.spawnCloud , this )
    },
    getSpawnPos:function(){
        var pos = cc.v2(0,0);
        var maxX = this.node.width / 2;
        var maxY = this.node.height / 2;
       // var arear = parseInt((Math.random() * 10 )% 4)
        pos.x =  /*parseInt((Math.random() * 10000 )% maxX )*/ maxX
        pos.y =  parseInt((Math.random() * 10000 )% maxY )

        // switch(arear){
        //     case 0:
        //         break;
        //     case 1:
        //         pos.x = -pos.x;
        //         break;
        //     case 2:
        //         pos.x = -pos.x;
        //         pos.y = -pos.y;
        //         break;
        //     case 3:
        //         pos.y = -pos.y;
        //         break;
        // }
        return pos
    },

    checkClouldNum : function(){
        this.CloudsNum = this.node.getChildrenCount();
    },

    update (dt) {
        
    },
});
