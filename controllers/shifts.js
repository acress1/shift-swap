const express = require('express')
const router = express.Router()
const Shift = require("../models/shifts.js");

// NEW
router.get("/new", (req, res) =>{
    res.render("new.ejs", {
      currentUser: req.session.currentUser
    })
})

router.get('/seed', async (req, res) => {
  const newShifts =
    [
      {
        name: {type: String, required: true },
        date: {type: Number, required: true },
        time: {type: Number, required: true },
        position: {type: String, required: true }
      }, {
        name: {type: String, required: true },
        date: {type: Number, required: true },
        time: {type: Number, required: true },
        position: {type: String, required: true }
      }
    ]

  try {
    const sendShifts = await Shift.create(newShifts)
    res.send(sendShifts)
  } catch (err) {
    res.send(err.message)
  }
})

// DELETE
router.delete("/:id", (req, res) =>{
  Shift.findByIdAndDelete(req.params.id, (err, data) =>{
    res.redirect('/swap')
  })
})

// EDIT
router.get('/:id/edit', (req,res) =>{
  Shift.findById(req.params.id, (err, chosenShift) => {
    res.render(
      'edit.ejs',
      {
        shifts: chosenShift
      }
    )
  })
})


// PUT
router.put('/:id', (req, res)=>{
  Shift.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err,updateModel) =>{
    res.redirect('/swap')
  })
})

// Create
router.post("/", (req,res) =>{
    Shift.create(req.body)
    res.redirect("/swap")
})

// Index
router.get("/", (req,res) => {
      Shift.find({}, (error, shifts) => {
        res.render("index.ejs", {
          shifts: shifts,
          currentUser: req.session.currentUser
        })
      })
})

// SHOW
router.get('/:id',(req,res)=>{
  Shift.findById(req.params.id, (err, foundShift) => { 
      res.render("show.ejs", {
        shift: foundShift
      });
    });
});

module.exports = router;