const request=require('request')

 const geocode=(address,callbacks)=>{
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1Ijoicm9oaXQtcmFuamFuIiwiYSI6ImNrM2Y2ZXl1aTAxankzaXFueWY0cXNlNXkifQ.wxOEfMlXeUg3kiaHkZdFXw&limit=1"
    request({url:url,json:true},(error,response)=>{
    if(error)
    {
        callbacks('sorrryy!!! unable to connect the internet',undefined)
    }
    else if(response.body.features.length===0)
    {
        callbacks('unable to find location. try another search',undefined)
    }
    else{
        callbacks(undefined,{longitude:response.body.features[0].center[0],
        latitude:response.body.features[0].center[1],location:response.body.timezone})
    }
})
 }
 module.exports=geocode;

