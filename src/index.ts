import express from "express"
import { YoutubeTranscript } from 'youtube-transcript';
import OpenAI from "openai";
require("dotenv").config()

const PORT = process.env.PORT || 3000

const openai = new OpenAI();

const app = express()
app.use(express.json()) 

app.get('/ping', (_req, res) => {
    console.log("Alguien hizo ping")
    res.send("pong")
})

app.get('/test/chatgpt', (_req, res) => {
    openai.chat.completions.create({
        messages: [{ role: "system", content: "Me puedes explicar que es una API?" }],
        model: "gpt-3.5-turbo",
    }).then((response)=>res.send(response.choices[0]).status(200)).catch((e)=>{console.log(e);res.send("error").status(400)})
})

app.get('/api/summarize', (req, res) => {
    let video_url = req.body.video_url

    YoutubeTranscript.fetchTranscript(video_url).then((subtitles) => {
            return subtitles.map((subtitle_entry)=> subtitle_entry.text).join(" ")
        }
    ).then((transcript)=>{
        let prompt_start = "Te dare un texto que proviene de la transcripcion de un video de youtube, describe en menos de 100 palabras cuales son los principales temas tratados en el texto. El texto transcripto del video es el siguiente: "
        openai.chat.completions.create({
        messages: [{ role: "system", content: prompt_start+transcript }],
        model: "gpt-3.5-turbo",}).then((response)=>res.send(response.choices[0].message.content).status(200))
    }).catch((e)=>{console.log(e);res.send("Error").status(400)})
})

app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`)
})