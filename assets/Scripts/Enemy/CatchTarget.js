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
        EnemyType:0
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    onCollisionEnter(other , self){
        switch(self.tag){
            case 0: // 捕捉Target

            break;
            case 1:

            break;
            case 2:

            break;
        }
        
    },

    onCollisionStay(other, self){
        switch(self.tag){
            case 0:
                if((self.getComponent("E_MoveMotor").target == null && this.EnemyType == 0 && (other.node.group == "Rice" || other.node.group == "Player")) || other.node.group === "Player" ){
                    self.getComponent("E_MoveMotor").target = other.node ;
                }
                if((self.getComponent("E_MoveMotor").target == null && this.EnemyType == 1 && other.node.group == "Player") ){
                    self.getComponent("E_MoveMotor").target = other.node ;
                }
            break;
            case 1:

            break;
            case 2:
            
            break;
        }
    },  

    onCollisionExit(other, self){
        switch(self.tag){
            case 0:

            break;
            case 1:
                if(self.getComponent("E_MoveMotor").target != null && this.EnemyType == 0  ){
                    self.getComponent("E_MoveMotor").target = null ;
                }
                if((self.getComponent("E_MoveMotor").target != null && this.EnemyType == 1 && other.node.group == "Player") ){
                    self.getComponent("E_MoveMotor").target = null ;
                }
            break;
            case 2:

            break;
        }
        
    },

    // update (dt) {},
});
