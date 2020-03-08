const express = require('express')
const router = express.Router()
const Shift = require("../models/shifts.js");

// NEW
router.get("/new", (req, res) =>{
    res.render("new.ejs")
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
      //Shift.find({}, (error, shifts) => {
        res.render("index.ejs", {
          //shifts: shifts,
          //urrentUser: req.session.currentUser
       // })
      })
})

//took seed route out
//took show route out

module.exports = router;