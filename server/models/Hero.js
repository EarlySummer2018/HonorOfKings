const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  // 英雄名字
  name: {
    type: String
  },
  arr: {
    type: Array
  },
  arr1: {
    type: Array
  },
  // 英雄头像
  avatar: {
    type: String
  },

  // 英雄海报
  banner: {
    type: String
  },

  // 英雄称号
  title: {
    type: String
  },

  // 英雄类别
  categories: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Category'
  }],

  // 英雄评分
  scores: {

    // 难度评分
    difficult: {
      type: Number
    },

    // 技能评分
    skills: {
      type: Number
    },

    // 攻击评分
    attack: {
      type: Number
    },

    // 生存评分
    survive: {
      type: Number
    }
  },

  // 英雄技能
  skills: [{
    // 技能图标
    icon: {
      type: String
    },

    // 技能名称
    name: {
      type: String
    },

    // 技能描述
    description: {
      type: String
    },

    // 冷却值
    delay: {
      type: String
    },
    // 消耗
    cots: {
      type: String
    },
  }],

  // 顺风出装
  items1: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Item'
  }],

  // 逆风出装
  items2: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Item'
  }],

  // 使用技巧
  usageTips: {
    type: String
  },

  // 对抗技巧
  battleTips: {
    type: String
  },

  // 团战思路
  teamTips: {
    type: String
  },

  // 英雄关系
  // 最佳搭档
  partners1: {
    type: Array
  },
  partners: [{
    hero: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Hero'
    },
    // 描述
    description: {
      type: String
    }
  }],

  // 克制谁
  restrain1: {
    type: Array
  },
  restrain: [{
    hero: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Hero'
    },
    // 描述
    description: {
      type: String
    }
  }],

  // 被克制
  beRestrain1: {
    type: Array
  },
  beRestrain: [{
    hero: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Hero'
    },
    // 描述
    description: {
      type: String
    },
    icon: {
      type: String
    }
  }]
})



module.exports = mongoose.model('Hero', schema, 'heroes')