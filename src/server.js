const express = require("express")
const server = express()
const serverPort = 3000

// config public path
server.use(express.static("public"))

// use template engines
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", { express: server, noCache: true })

// config application paths
// index
server.get("/", (req, res) => {
    return res.render("index.html", {
        title: "Seu marketplace de coleta de resíduos"
    })
})


// create-point
server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})


// create-point
server.get("/search", (req, res) => {
    return res.render("search-results.html")
})

// start server
server.listen(serverPort)
