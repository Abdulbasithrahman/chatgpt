const { Configuration, OpenAIApi } =require("openai" ) ;
const express = require('express')
const bodyParser= require('body-parser')
const cors = require('cors')

const configuration = new Configuration({
    organization: "org-AO27IqqxNYc4F5oRTsdiivWm",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);



const app=express();
app.use(bodyParser.json())
app.use(cors())

const port =3080

app.post('/', async (req,res)=>{
      const {message,currentModel} = req.body
      console.log(message);
      console.log(currentModel)
    const response = await openai.createCompletion({
        model:`${currentModel}`,
        prompt:`${message}`,
        max_tokens:100,
        temperature:0.5,
    })
    res.json({
        message:response.data.choices[0].text
    })
})

app.get('/models', async (req,res)=>{
   const response =await openai.listEngines()
   console.log(response.data)
   res.json({
    models:response.data
   })
})

app.listen(port,()=>{
    console.log(`Example app Listening at http://localhost:${port}`)
})