const express = require("express")
const server = express()
const serverPort = 3000

// get db file
const db = require("./database/db.js")

// config public path
server.use(express.static("public"))

// enable req.body
server.use(express.urlencoded({ extended: true }))

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

    // req.query
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    req.body
    // insert data in db
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
        `

    values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if (err) {
            return res.render("create-point.html", { error: true, error_msg: err})
        }
        console.log("Cadastrado com sucesso")
        console.log(this)
        return res.render("create-point.html", { saved: true})
    }

    db.run(query, values, afterInsertData)
    // return res.send("ok")
})

// create-point
server.get("/search", (req, res) => {
    // get data from db

    const search = req.query.search

    if (search == "") {
        return res.render("search-results.html", { total: 0})
    }

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }

        // console.log("Aqui estão os seus registros")
        // console.log(rows)
        const total = rows.length
        return res.render("search-results.html", { places: rows, total: total })
    }
    )
})

// start server
server.listen(serverPort)
