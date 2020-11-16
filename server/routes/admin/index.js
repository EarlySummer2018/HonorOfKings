module.exports = app => {
  const express = require('express');

  const router = express.Router({
    // 合并参数
    mergeParams: true
  });

  // 提交数据
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })

  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  // 删除数据
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })

  // 获取数据
  router.get('/', async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }

    const items = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(items)
  })

  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  app.use('/admin/api/rest/:resoure', async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resoure)
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)


  // 上传图片\文件接口
  const multer = require('multer');
  const upload = multer({
    dest: __dirname+'../../../uploads'
  })
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file;
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })
}