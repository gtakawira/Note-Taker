const notesData = require("../db/db.json");
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { stringify } = require("querystring");

module.exports = function (app) {
    app.get("/api/notes", function (req, res) {
        res.json(notesData)
    });

    app.delete(`/api/notes/:id`, function (req, res) {

        var toDelete = req.params.id;

        //we need to get the correct object
        for (var i = 0; i < notesData.length; i++) {

            if (notesData[i].id == toDelete) {

                notesData.splice(i, 1);
                res.json(true);
                fs.writeFile('./db/db.json', JSON.stringify(notesData), function (err) {
                    if (err) throw err;
                });
                break;//Stop this loop, we found it!
            }


        }



    });



    app.post("/api/notes", function (req, res) {
        req.body.id = uuidv4();
        notesData.push(((req.body)));
        res.json(true);
        fs.writeFile('./db/db.json', JSON.stringify(notesData), function (err) {
            if (err) throw err;
        });
    })
};








