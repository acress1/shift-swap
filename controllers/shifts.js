const express = require('express')
const router = express.Router()
const Shift = require("../models/shifts.js");

// |   NAME   |     PATH       |   HTTP VERB     |            PURPOSE                   |
// |----------|----------------|-----------------|--------------------------------------| 
// | Index    | /shift          |      GET        | Displays all shifts                  |
// | New      | /shift/new      |      GET        | Shows new form for new shift entry   |
// | Create   | /shift          |      POST       | Creates a new shift                  |
// | Show     | /shift/:id      |      GET        | Shows one specified shift            |
// | Edit     | /shift/:id/edit |      GET        | Shows edit form for one shift        |
// | Update   | /shift/:id      |      PUT        | Updates a particular shift           |
// | Destroy  | /shift/:id      |      DELETE     | Deletes a particular shift           |

// NEW
router.get("/new", (req, res) =>{
  if(req.session.currentUser){
  res.render("shifts/new.ejs", {currentUser: req.session.currentUser});
  } else {
    res.redirect("/sessions/new");
  }
});


// DELETE
router.delete("/shift/:id", (req, res) =>{
  Shift.findByIdAndDelete(req.params.id, (err, data) =>{
    res.redirect('/')
  })
})

// EDIT
router.get('/shift/:id/edit', (req,res) =>{
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
router.put('/shift/:id', (req, res)=>{
  Shift.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err,updateModel) =>{
    res.redirect('/')
  })
})

// Create
router.post("/", (req,res) =>{
  console.log(req.body);
    Shift.create(req.body, (err, createdShift)=>{
      res.send(createdShift)
      shifts.push(req.body);
      res.redirect("/")
});
});

// Index
router.get("/", (req,res) => {
  if(req.session.currentUser) {
      Shift.find({}, (error, shifts) => {
        res.render("index.ejs", {currentUser: req.session.currentUser, shifts: shifts});
      });
  } else {
    res.redirect("/sessions/new");
  }
})

//SEED DATA
router.get('/seed', (req, res) => {
  console.log("whatever")
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
      }
    ], (err, data)=>{
      res.redirect('/');
  })
});


//SHOW
router.get('/:id',(req,res)=>{
  Shift.findById(req.params.id, (err, foundShift) => { 
      res.render("show.ejs", {
        shifts: foundShift,
         currentUser: req.session.currentUser
      });
    });
});

module.exports = router;