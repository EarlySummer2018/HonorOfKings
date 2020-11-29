const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  // 文章标题
  title: {
    type: String
  },
  // 文章详情
  body: {
    type: String
  },
  // 文章类别
  categories: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Category'
  }]
}, {
  timestamps: true
})



module.exports = mongoose.model('Article', schema)