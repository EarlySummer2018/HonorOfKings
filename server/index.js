const express = require('express')
const app = express()
const port = 3000

// 引入跨域模块
app.use(require('cors')());

// 设置一个变量
app.set('secret', 'wa4f654g834wh')
// 引入 json 中间件
app.use(express.json());

// 托管静态文件
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./plugins/db')(app);
require('./routes/admin')(app);
require('./routes/web')(app)

app.listen(port, () => console.log(`http://localhost:${port}`))