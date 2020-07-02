const bodyParser = require('body-parser');
const express = require('express');
const multer = require('multer');
const { request, response } = require('express');

const app = express();


app.use(express.static('.'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/teste', (request, response) => {
    return response.send('OK')
});

const storage = multer.diskStorage({
    destination: function (request, file, callback){
        callback(null,'./upload');
    },
    filename: function(request, file, callback){
        callback(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({storage}).single('arquivo');


app.post('/upload',(request,response) => {
    upload(request,response,err =>{
        if(err){
            return response.end('Ocorreu um erro.');
        }
        response.end('Concluído com sucesso');
    })
})

app.post('/formulario',(request, response) => {
    return response.send({
        ...request.body,
        id: 1
    });
});

app.get('/parOuImpar',(request, response) => {
    const par = parseInt(request.query.numero)%2 === 0;
    response.send({
        resultado: par ? 'par' : 'impar'
    })
})

app.listen(3333, () => console.log('Executando'));