import express from "express"
const app = express()
app.use(express.json()) 

const PORT = process.env.PORT || 3000

app.get('/ping', (_req, res) => {
    console.log("Alguien hizo ping")
    res.send("pong")
})

app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`)
})