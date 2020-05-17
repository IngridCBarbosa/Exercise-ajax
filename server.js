const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(express.static('.'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const multer = require('multer')

const storage = multer.diskStorage({
    destino : function (req,file,callback){
        callback(null,'.')
    },

    filename:function(req,file,callback){
        callback(null,`${Date.now}_${file.originalname}`)
    }
})

const upload = multer({storage}).single('arquivo')

app.post('/upload',(req,res) =>{
    upload(req,res,err => {
        if(err){
            return res.end('Ocorreu um erro.')
        }
        res.end('Concluído com sucesso')
    })
})

app.post('/formulario',(req,res) => {
    res.send({
        ...req.body,
        id:1
    })
})

app.get('/parOuImpar',(req,resp) =>{
    // req.body
    //req.query  => ex => ?numeros
    //req.params => ex => /:numero 
    const par = parseInt(req.query.numero) % 2 === 0
    resp.send({
        resultado: par ? 'par' : 'impar',
    })
})

app.get('/teste',(req,res) => res.send('ok'))

app.listen(8081, () => console.log('Executando'))