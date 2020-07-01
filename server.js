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


app.listen(3333, () => console.log('Executando'));