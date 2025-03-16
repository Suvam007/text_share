const express = require('express')
const router = express.Router();
const crypto = require('crypto')
//const client = require('../config/redis');
const  Text  = require('../models/db')

function generate_hex(){
    return crypto.randomBytes(3).toString('hex');
}

router.post('/generate-code' , async(req,res)=>{
    const  text  = req.body.text;
    //console.log(req.body)
    //const id = generate_hex();
    if(text){
    id = generate_hex();
    await Text.create({ id: id, text }); 
    res.json({ id });
    }else{
        res.json({
            id : "input something"
        })
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;  
    const whole_object = await Text.findOne({
        id : id
    });
    //console.log(whole_object)

    if (whole_object) {
        res.json({ text : whole_object.text });  
    } else {
        res.status(404).json({ message: 'Not found' });
    }
});


module.exports = router;