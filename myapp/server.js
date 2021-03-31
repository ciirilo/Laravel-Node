
const bodyParser = require('body-parser')
const express = require('express')
const app = express()



const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://paulo:PhBqC0cfSw7pfSrx@cluster0.chnwb.mongodb.net/Cluster0"



MongoClient.connect(uri ,(err, client) => {
    useUnifiedTopology : true
    if(err) return console.log(err)
    db = client.db('Cluster0')

    app.listen(3000, function() {
        console.log('server running on port 3000')
    })
})

app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/',(req, res) => {
    var cursor = db.collection('data').find()
})

// Create

app.post('/show' , (req, res) => {
    db.collection('data').insertOne(req.body, (err, result) => {
        if(err) return console.log(err)

        console.log('Salvo no banco de dados')
        res.redirect('/show')
        
    })
})

// Read

app.get('/show', (req,res) => {
    db.collection('data').find().toArray((err,results) => {
        if(err) return console.log(err)
        res.render('show.ejs', {data : results})
    })
})


// Update
var ObjectId = require('mongodb').ObjectID;
app.route('/edit/:id')
.get((req, res) => {
    var id = req.params.id
    
    db.collection('data').find(ObjectId(id)).toArray((err, result) => {
        if(err) return res.send(err)
        res.render('edit.ejs', {data: result})
    })
})
.post((req, res) => {
    var id = req.params.id
    var name = req.body.name
    var surname = req.body.surname

    db.collection('data').updateOne({_id: ObjectId(id)}, {
        $set: {
            name: name,
            surname: surname
        }
    }, (err, result) => {
        if (err) return res.send(err)
        res.redirect('/show')
        console.log('Atualizado no Banco de Dados')
        
    })
})

// Delete

app.route('/delete/:id').get((req, res) => {
    var id = req.params.id

    db.collection('data').deleteOne({_id: ObjectId(id)}, (err, result) => {
        if(err) return res.send(500, err)
        console.log('Deletado do Banco de Dados!')
        res.redirect('/show')
    })
})
