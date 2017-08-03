'use strict';

module.exports = (app, db) => {
  // Get the list of users
  app.get('/users', (req, res) => {
      const q = req.query;
      db.users.findAndCountAll(
          {order: [[q.sort, q.order]], offset: parseInt(q.page), limit: parseInt(q.size),
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
          res.send(users);
      });
    });
};