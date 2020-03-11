const express = require('express')
const router = express.Router()
const Shift = require("../models/shifts.js");

//___________________
//7 Restful Routes
//___________________
// Index  : GET    '/'          
// Show   : GET    '/:id'     
// New    : GET    '/new'      
// Create : POST   '/'          
// Edit   : GET    '/:id/edit'
// Update : PUT    '/:id'      
// Delete : DELETE '/:id'      

// NEW
router.get("/new", (req, res) =>{
    res.render("shifts/new.ejs", {
      currentUser: req.session.currentUser
    })
})


// DELETE
router.delete("/:id", (req, res) =>{
  Shift.findByIdAndDelete(req.params.id, (err, data) =>{
    res.redirect('/')
  })
})

// EDIT
router.get('/:id/edit', (req,res) =>{
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
router.put('/:id', (req, res)=>{
  Shift.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err,updateModel) =>{
    res.redirect('/')
  })
})

// Create
router.post("/", (req,res) =>{
    Shift.create(req.body, (err, data)=>{
    res.redirect("/")
});
});

// Index
router.get("/", (req,res) => {
      Shift.find({}, (error, shift) => {
        res.render("index.ejs", {
          shift: shift,
          currentUser: req.session.currentUser
        })
      })
})

//SHOW
router.get('/:id',(req,res)=>{
  Shift.findById(req.params.id, (err, foundShift) => { 
      res.render("show.ejs", {
        shift: foundShift,
         currentUser: req.session.currentUser
      });
    });
});

module.exports = router;