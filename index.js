const express = require('express')
const fs = require('fs');
const app = express()

app.use(express.json()); // Para manejar JSON en las solicitudes

app.listen(3000, console.log("¡Servidor encendido!"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
    })
    

app.get("/canciones", (req, res) => {
const repertorio = JSON.parse(fs.readFileSync("repertorio.json"))
res.json(repertorio)
})

app.post("/canciones", (req, res) => {
    const nuevaCancion = req.body
    const canciones = JSON.parse(fs.readFileSync("repertorio.json"))
    canciones.push(nuevaCancion)
    fs.writeFileSync("repertorio.json", JSON.stringify(canciones))
    res.send("Cancion agregada con éxito!")
    })

    app.delete("/canciones/:id", (req, res) => {
        const { id } = req.params
        const repertorio = JSON.parse(fs.readFileSync("repertorio.json"))
        const index = repertorio.findIndex(p => p.id == id)
        repertorio.splice(index, 1)
        fs.writeFileSync("repertorio.json", JSON.stringify(repertorio))
        res.send("Canción eliminada con éxito")
        })

        app.put("/canciones/:id", (req, res) => {
            const { id } = req.params
            const cancionActualizada = req.body
            const canciones = JSON.parse(fs.readFileSync("repertorio.json"))
            const index = canciones.findIndex(cancion => cancion.id == id)
            canciones[index] = { ...canciones[index], ...cancionActualizada };
            fs.writeFileSync("repertorio.json", JSON.stringify(canciones))
            res.send("Repertorio modificado con éxito")
            })
            