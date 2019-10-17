
cc.Class({
    extends: cc.Component,

    properties: {
        m_msgBox: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.m_msgBox = this.m_msgBox.getComponent('msg')
    },

    start () {

    },

    onClickInput () {
        this.m_msgBox.node.active = true
        this.m_msgBox.setTitle('输入编辑')
    },

    // update (dt) {},
});
