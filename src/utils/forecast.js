const request=require('request')
    const forecast=(latitude,longitude,callbacks)=>{
        const url="https://api.darksky.net/forecast/f002e72aa83fa16299e7dc8c847625f9/"+latitude+","+longitude+"?units=si"
        request({ url : url,  json : true},(error,response)=>{
        if(error){
            callbacks('sorrryyy! unable to connect the internet',undefined)
        }
        else if (response.body.length==0){
            callbacks('No data found try another coordinates',undefined)
        }
        else{
            callbacks(undefined,{discription:response.body.daily.summary,temperature:response.body.hourly.data[0].temperature,
                latitude:response.body.latitude,longitude:response.body.longitude,location:response.body.timezone})
        }
    })
}
module.exports=forecast;