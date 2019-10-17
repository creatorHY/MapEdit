
cc.Class({
    extends: cc.Component,

    properties: {
        m_title: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        
    },

    setTitle (string) {
        this.m_title.string = string
    },

    onClickClose () {
        this.node.active = false
    },
    // update (dt) {},
});
