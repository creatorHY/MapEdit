
cc.Class({
    extends: cc.Component,

    properties: {
        m_mapSpriteAtlas: [cc.SpriteAtlas],
        m_moveImage: cc.Sprite,
        m_blockMap: cc.Node,
    },

    onLoad () {
        this.m_moveImage.node.zIndex = 100
        this.node.on('touchstart', function(e){
            var pos = e.getLocation()
            var select = this.getSelectSpriteFrame(pos)
            pos = this.node.convertToNodeSpaceAR(pos)
            if (select != null) {
                this.m_moveImage.node.active = true
                this.m_moveImage.node.setPosition(pos)
                this.m_moveImage.spriteFrame = select.spriteFrame //node节点下没有spriteFrame属性 所以定义为cc.sprite
            }
        }.bind(this))

        this.node.on('touchmove', function(e){
            var pos = e.getLocation()
            pos = this.node.convertToNodeSpaceAR(pos)
            this.m_moveImage.node.setPosition(pos)
        }.bind(this))

        this.node.on('touchend', function(e){
            var select = this.getEndSpriteFrame(e.getLocation())
            if (select != null && this.m_moveImage.node.active) {
                select.spriteFrame = this.m_moveImage.spriteFrame
            }
            this.m_moveImage.node.active = false
        }.bind(this))

        this.node.on('touchcancel', function(e){
            this.m_moveImage.node.active = false
        }.bind(this))
    },

    start () {
        var frames = this.m_mapSpriteAtlas[0].getSpriteFrames()
        this.framesArray = []   //动态节点数组
        this.width_num = 5      //每行图片显示数量
        for (let i = 0; i < frames.length; i++) {
            var mapNode = new cc.Node
            this.node.addChild(mapNode)
            mapNode = mapNode.addComponent(cc.Sprite)
            mapNode.spriteFrame = frames[i]
            this.framesArray[i] = mapNode
            mapNode.node.x = (i % this.width_num) * 106 + 106/2 + (i % this.width_num) * 10 + 20
            mapNode.node.y = Math.floor(i / this.width_num) * -106 - 106/2 - Math.floor(i / this.width_num) * 10 -20
        }
        this.buildBlockMap()
    },

    getSelectSpriteFrame (world_pos) {
        for (let i = 0; i < this.framesArray.length; i++) {
            var pos = this.framesArray[i].node.convertToNodeSpaceAR(world_pos)
            if (pos.x < 106/2 && pos.x > -106/2 &&
                pos.y < 106/2 && pos.y > -106/2) {
                return this.framesArray[i]
            }
        }
        return null
    },

    getEndSpriteFrame (world_pos) {
        for (let i = 0; i < this.m_blockItem.length; i++) {
            for (let j = 0; j < this.m_blockItem[i].length; j++) {
                var pos = this.m_blockItem[i][j].node.convertToNodeSpaceAR(world_pos)
                if (pos.x < 106/2 && pos.x > -106/2 &&
                    pos.y < 106/2 && pos.y > -106/2) {
                    return this.m_blockItem[i][j]
                }
            }
        }
        return null
    },

    buildBlockMap () {
        this.blockArray = [
            [14,14,14,14,14,14],
            [14,14,14,14,14,14],
            [14,14,14,14,14,14],
            [14,14,14,14,14,14],
            [14,14,14,14,14,14],
            [14,14,14,14,14,14]
        ]
        this.blockMax = 6
        this.m_blockItem = []
        for (let i = 0; i < this.blockMax; i++) {
            this.m_blockItem[i] = []
            for (let j = 0; j < this.blockMax; j++) {
                //动态创建图片
                var blockNode = new cc.Node
                this.m_blockMap.addChild(blockNode)
                blockNode.x = 106 * j + 106/2
                blockNode.y = -106 * i - 106/2
                blockNode = blockNode.addComponent(cc.Sprite)
                //整形 ==》 字符串
                var blockDate = '' + this.blockArray[i][j]
                //获得图集上的Frame
                blockNode.spriteFrame = this.m_mapSpriteAtlas[0].getSpriteFrame(blockDate)
                this.m_blockItem[i][j] = blockNode
            }
        }
    },
    // update (dt) {},
});
