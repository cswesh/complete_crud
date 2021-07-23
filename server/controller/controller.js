var Userdb = require('../model/model');

//create and save new user
exports.create = (req,res)=>{
    //validate request
    if(!req.body){
        res.status(400).send({message:"content cannot be empty"});
        return;
    }

    //new user
    const user = new Userdb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status
    })

    //save user in db
    user
        .save(user)
        .then(data => {
            //res.send(data)
            res.redirect('/add-user')
        })
        .catch(err =>{
            res.status(500).send({
                message:err.message || "some error occured while saving"
            })
        })
}

//retrieve and return all users / single user
exports.find = (req,res)=>{

    if(req.query.id){
        const id=req.query.id;

        Userdb.findById(id)
          .then(data=>{
              if(!data){
                  res.status(404).send({
                      message:"User not found"
                  })
              }
              else{
                  res.send(data)
              }
          })
          .catch(err=>{
              res.status(500).send({
                  message:"error occurred"
              })
          })
    }
    else
    {
        Userdb.find()
            .then(user =>{
                res.send(user)
            })
            .catch(err =>{
                res.status(500).send({
                    message:err.message||"error occurred while retrieving"
                });
            })
    }
}

//update a new identified user by id
exports.update = (req,res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({
                message:"Data cannot be empty"
            })
    }
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{userFindAndModify:false})
      .then(data=>{
          if(!data){
              res.status(404).send({
                  message:"cannot update user, user not available"
              })
          }
          else{
              res.send(data)
          }
      })
      .catch(err=>{
          res.status(500).send({
              message:"error update user info"
          })
      })
}

//delete a user with specified user id
exports.delete = (req,res)=>{
    const id = req.params.id;
    Userdb.findByIdAndDelete(id)
      .then(data=>{
          if(!data){
              res.status(404).send({
                  message:"cannot delete user, may be wrong"
              })
          }
          else{
              res.send({
                  message:"User deleted successfully"
              })
          }
      })
      .catch(err=>{
          res.status(500).send({
              message:"error occurred"
          })
      })
}