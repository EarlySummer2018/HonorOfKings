const express = require('express')
const app = express()
const port = 3000

// 引入跨域模块
app.use(require('cors')());

// 引入 json 中间件
app.use(express.json());

require('./plugins/db')(app);
require('./routes/admin')(app);

app.listen(port, () => console.log(`http://localhost:${port}`))