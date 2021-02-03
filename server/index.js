const express = require('express')

const app = express()

app.use(express.json())

const mongoose =require('mongoose')
mongoose.connect('mongodb://localhost:27017/element-admin',{
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
})

const Article = mongoose.model('Article',new mongoose.Schema({
    title: {type: String},
    body: {type: String},
}))


app.use(require('cors')())

app.get('/',async (req,res) => {
    res.send('index')
})

//新增文章
app.post('/api/articles',async (req,res) => {
    const artitle = await Article.create(req.body)
    res.send(artitle)    
})

//文章列表
app.get('/api/articles',async (req,res) => {
    const artitles = await Article.find()
    res.send(artitles);
})

//删除
app.delete('/api/articles/:id',async (req,res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.send({
        status: true
    })
})

//详情
app.get('/api/articles/:id',async (req,res)=>{
    const article = await Article.findById(req.params.id)  
    res.send(article)
})

//修改 patch    put:覆盖性的修改    post
app.put('/api/articles/:id',async (req,res)=>{
    console.log('---put---1-');
    const article = await Article.findByIdAndUpdate(req.params.id,req.body);
    console.log('---put--2--');
    res.send(article)
})

app.listen(3001,() => {
    console.log('http://localhost:3001/')
})

