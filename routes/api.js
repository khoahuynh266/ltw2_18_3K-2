const express = require('express')
const router = express.Router()

router.post('/tinh',(req,res,next)=>{
    if(Object.keys(req.body).length < 3)
        res.status(400).json('Vui lòng nhập đủ thông tin')
    res.status(200).json(eval(req.body.a + req.body.operator + req.body.b))
})

module.exports = router