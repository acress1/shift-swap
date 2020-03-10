const express = require('express')
const router = express.Router()
const Shift = require("../models/shifts.js");

// NEW
router.get("/swap/new", (req, res) =>{
    res.render("shifts/new.ejs", {
      currentUser: req.session.currentUser
    })
})

router.get('/seed', (req, res) => {
  Shift.create(
    [
      {
        name: "Ron",
        date: 4/9/2020,
        time: 9-5,
        position: "Shift Supervisor"
      }, 
      {
        name: "Veronica",
        date: 4/1/2020,
        time: 8-12,
        position: "barista"
      },
    ]);
    res.redirect("/swap");
   
});

// DELETE
router.delete("/swap/:id", (req, res) =>{
  Shift.findByIdAndDelete(req.params.id, (err, data) =>{
    res.redirect('/swap')
  })
})

// EDIT
router.get('/swap/:id/edit', (req,res) =>{
  Shift.findById(req.params.id, (err, chosenShift) => {
    res.render(
      'edit.ejs',
      {
        shift: chosenShift,
        currentUser: req.session.currentUser
      }
    )
  })
})


// PUT
router.put('/swap/:id', (req, res)=>{
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
      Shift.find({}, (error, shift) => {
        res.render("index.ejs", {
          shift: shift,
          currentUser: req.session.currentUser
        })
      })
})

// SHOW
// router.get('/swap/:id',(req,res)=>{
//   Shift.findById(req.params.id, (err, foundShift) => { 
//       res.render("show.ejs", {
//         shift: foundShift,
//          currentUser: req.session.currentUser
//       });
//     });
// });

module.exports = router;