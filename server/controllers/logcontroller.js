const express = require("express");
const router = express.Router();
const { logModel } = require("../models");
let validateJWT = require("../middleware/validate-jwt");

router.post("/", validateJWT, async (req, res) => {
    const { description, definition, result } = req.body.log;
    const { id } = req.user;
    const logEntry = {
        description,
        definition,
        result,
        owner_id: id
    };
    try {
        const newLog = await logModel.create(logEntry);
        res.status(201).json({
            message: "Item successfully created",
            description: newLog,
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to register Submission"});
    }
});

//Get all logs section
router.get("/", validateJWT, async (req, res) => {
    try {
        const logs = await logModel.findAll();
        res.status(201).json(logs);
    } catch (err) {
        res.status(500).json({ 
            message: `error: ${err}`
         });
    }
});

router.get("/:id", validateJWT, async (req, res) => {
    const logId = req.params.id;
    const ownerid = req.user.id;

    try {
        const query = {
            where: {
                id: logId,
                userId: ownerid,
            },
        };
        const logs = await logModel.find(query);
        res.status(201).json(logs);
        // res.status(201).json({ message: "Item has been deleted" });
    } catch (err) {
        res.status(500).json({ message: `error: ${err}` });
    }
});

//delete log by id
router.delete("/:id", validateJWT,  async (req, res) => {
    const logId = req.params.id;
    const ownerid = req.user.id;

    try {
        const query = {
            where: {
                id: logId,
                owner_id: ownerid,
            },
        };
        await logModel.destroy(query);
        res.status(201).json({ message: "Item has been deleted" });
    } catch (err) {
        res.status(500).json({ message: `${err}` });
    }
});

router.put("/:logId", validateJWT, async (req, res) => {56
    const { description, definition, result } = req.body.log;
    // const id = req.user;
    const logId = req.params.logId;
    const ownerid = req.user.id;
    
    const query = {
        where: {
            id: logId,
            owner_id: ownerid
        },
    };

    const newNewLog = {
        description: description,
        definition: definition,
        result: result,
        owner_id: ownerid
        
    };

    try {
        const updatedLog = await logModel.update(newNewLog, query);
        res.status(200).json({updatedLog, message: "Item has been updated" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;