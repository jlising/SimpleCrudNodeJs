'use strict';

module.exports = (app, db) => {

  /**
   * Get the list of users
   */
  app.get('/users', (req, res) => {
      const q = req.query;
      const offset =  parseInt(q.page) > 0 ? parseInt(q.page) * parseInt(q.size) : parseInt(q.page);

      db.users.findAndCountAll(
          {order: [[q.sort, q.order]], offset: offset, limit: parseInt(q.size),
           where : {
                    $or : [
                            {
                                fname: {$like: '%' + q.search +'%'}
                            },
                            {
                                lname: {$like: '%' + q.search +'%'}
                            }
                           ]
                    },
           include: [ { model: db.accounts }] // include: [db.accounts]
      }).then(users => {
          res.json(users);
      });
    });

   /**
    * Find one user by id
    */
    app.get('/users/:id', (req, res) => {
      const p = req.params;

      db.users.findOne({where: {id: p.id}})
        .then(user => {
          res.json(user);
      });
    });

    /**
    * Create new account
    */
    app.post('/users', (req, res) => {
      const newUser = req.body.user;

      newUser.id = db.util.generateUUID();

      //Find first if exists, then add if not.
      db.users.findOne({where: {email: newUser.email}})
                 .then(user => {
                        if(user){
                            // Return error if record already exists
                            res.statusMessage = "User with the same email " + user.email + " already exists.";
                            res.status(409).json(user);
                        }else{
                            db.users.create({id : newUser.id,
                                                fname : newUser.fname,
                                                mname : newUser.mname,
                                                lname : newUser.lname,
                                                email : newUser.email,
                                                account_id : newUser.account_id
                                                })
                            .then(user => {
                               res.json(user);
                            });
                        }
                 });
    });

   /**
    * Update user
    */
    app.patch('/users/:id',(req, res) => {
        const id = req.params.id;
        const User = req.body.user;

        // Update the account
        db.users.findById(id)
                   .then(user => {
                        user.updateAttributes(User); //db.update() can also be used
                            res.json(User);
                   });
    });

   /**
    * Delete user
    */
    app.delete('/users/:id',(req, res) => {
          const id = req.params.id;
          // Delete the user
          db.users.findById(id)
                  .then(user => {
                     user.destroy().then(userDeleted => {
                        res.json(user);
                  });
          });

    });
};