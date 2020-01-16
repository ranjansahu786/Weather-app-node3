const request=require('request')
const path=require('path')
const express=require('express')
const app=express()
const port=process.env.PORT

const hbs=require('hbs')
const forecast=require('./utils/forecast')
const geocode=require('./utils/geocode')

const pathtohtmlfile=path.join(__dirname,'../public')
const viewpath=path.join(__dirname,'../templates/views')
const partialpath=path.join(__dirname,'../templates/partials')
app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialpath)

app.use(express.static(pathtohtmlfile))
app.get('', (req,res)=>{
    res.render('weather',{
    title:'weather app',
    description:'weather is showing up'})
})
app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
           error: 'provide an address'
        })
          
    }
        geocode(req.query.address,(error,{longitude,latitude,location}={})=>
{
    if(error){
        return res.send({error})

    }
    else{
        forecast(latitude,longitude,(error,{discription,temperature,latitude,longitude,location})=>{
            if(error){
               return  res.send({error});

            }
            res.send({ temperature :temperature,forecast:discription,latitude,longitude,location} )
            
            })
    }
})

    })

app.get('/about',(req,res)=>{
res.render('about')
})
app.get('/help',(req,res)=>
{
    res.render('help')
})
app.get('*',(req,res)=>{
    res.send('404 ERROR page not found')
})

app.listen(port,()=>{
    console.log("web server local host "+port)
}) 