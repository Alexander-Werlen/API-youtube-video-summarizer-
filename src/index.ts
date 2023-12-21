import express from "express"
import axios from 'axios';
import { YoutubeTranscript } from 'youtube-transcript';
import OpenAI from "openai";
require("dotenv").config()
const cors=require("cors");

const PORT = process.env.PORT || 3000

const corsOptions ={
    origin:'*', 
    optionSuccessStatus:200,
}

const openai = new OpenAI();

const app = express()

app.use(express.json())
app.use(cors(corsOptions))

app.get('/ping', (_req, res) => {
    console.log("Alguien hizo ping")
    res.send("version: 21/12/2023")
})

app.get('/api/summarize', (req, res) => {
    console.log("GET summarize requested")
    const video_id:string | null = <string>req.query.id || "";
    let responseJson = {
        id_is_valid: false,
        found_transcript: false,
        found_summary: false,
        summary: ""
    };

    //checking if video exists
    axios.get('https://www.googleapis.com/youtube/v3/videos', {
        params: {
            part: "id",
            id: video_id,
            key: process.env.YOUTUBE_DATA_API_KEY
        }
    })
    .then((response) => {
        const found_vid = response.data.pageInfo.totalResults;
        if(found_vid==0){
            throw Error("Video doesnt exists");
        }else{
            responseJson.id_is_valid=true;
        }
    }).then(()=>{
        //getting transcript
        YoutubeTranscript.fetchTranscript(video_id).then((subtitles) => {
            responseJson.found_transcript=true;
            return subtitles.map((subtitle_entry)=> subtitle_entry.text).join(" ")
            }
        ).then((transcript)=>{
            let prompt_start = "I will give you a text that comes from the transcript of a youtube video, describe in english and in less than 100 words what are the main topics covered in the text. The transcript text is the following: "
            openai.chat.completions.create({
            messages: [{ role: "system", content: prompt_start+transcript }],
            model: "gpt-3.5-turbo",}).then((response)=>{
                responseJson.found_summary=true;
                responseJson.summary=response.choices[0].message.content || "";
                res.send(responseJson).status(200)}).catch((e)=>{console.log(e);res.send(responseJson).status(400)})
        }).catch((e)=>{console.log(e);res.send(responseJson).status(400)})
    }).catch((e)=>{console.log(e);res.send(responseJson).status(400)})
})

app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`)
})