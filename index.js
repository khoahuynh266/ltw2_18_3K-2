const express = require('express')


const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.set('view engine','ejs')
app.set('views','./views')


app.use(express.static('./public'))


app.use(require('./routes/index'))
app.use('/api',require('./routes/api'))


app.use((err,req,res,next)=>{
    res.status(422).send(err.message)
})

app.listen(process.env.PORT || 3000,()=>  console.log('App đang lắng nghe ở port 3000!'));