// require('dotenv').config()
import 'dotenv/config'
import express from 'express'

const app=express()

const port =process.env.PORT || 3000

app.use(express.json())

let teaData=[]
let nextId=1



app.post('/tea',(req,res)=>{
    //  req.body.price
    const {name,price}=req.body
    const newTea={id:nextId++, name,price}
    teaData.push(newTea)
    res.status(201).send(newTea)
})

app.get('/tea',(req,res)=>{
    res.status(200).send(teaData)
})

app.get("/tea/:id",(req,res)=>{
    const tea=teaData.find(t=>t.id===parseInt(req.params.id))
    if (!tea) {
        return res.status(404).send("Hey tea not found")
    }else{
        return res.status(200).send(tea)
    }
})

app.put('/tea/:id',(req,res)=>{
    const tea=teaData.find(t=>t.id===parseInt(req.params.id))
    if (!tea) {
        return res.status(404).send("Hey tea not found")
    }else{
        const {name,price}=req.body
        tea.name=name
        tea.price=price
        res.send(200).send(tea)
    }
})

app.delete('/tea/:id',(req,res)=>{
   const index= teaData.findIndex(t=>t.id===parseInt(req.params.id))
    if(index===-1){
        return res.status(404).send('tea not found')
    }else{
        teaData.splice(index, 1)
        return res.status(204).send('Deleted')
    }
})



app.listen(port,()=>{
    console.log(`server is running at ${port}`)
})