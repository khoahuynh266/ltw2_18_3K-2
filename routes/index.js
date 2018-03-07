const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>res.render('index',{title: 'Bé Tập Tính Ajax',a: '',b: '',kq: ''}))

router.post('/',(req,res,next)=>{
    var kq = eval(req.body.a + req.body.operator + req.body.b) 
    res.render('index',{title:'Bé Tập Tính Ajax',a: req.body.a,b: req.body.b,kq})
})

module.exports = router