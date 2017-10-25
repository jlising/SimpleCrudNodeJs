'use strict';

//http://lorenstewart.me/2016/09/12/sequelize-table-associations-joins/
//http://lorenstewart.me/2016/10/03/sequelize-crud-101/

module.exports = (app, db, passport) => {
  /**
   * Get the list of accounts
   */
  app.get('/accounts', app.util.isRequestAuthenticated, (req, res) => {
    const q = req.query;
    const queryOptions = {};

    if(q.sort && q.order){
        queryOptions.order = [[q.sort, q.order]];
    }

    if(q.page &&  q.size){
        const offset =  parseInt(q.page) > 0 ? parseInt(q.page) * parseInt(q.size) : parseInt(q.page);
        queryOptions.offset = offset;
        queryOptions.limit = parseInt(q.size);
    }

    if(q.search){
        queryOptions.where = {name: {$like: '%' + q.search +'%'}};
    }

    queryOptions.include = [{
                             model: db.addresses,
                             //as: 'address',
                             where: { type : 'MAILING'},
                             limit: 1, //return only 1
                             offset: 0 //should start only at 0 since we are getting only 1 record
                           }];

    db.accounts.findAndCountAll(queryOptions).then(accounts => {
        res.json(accounts);
    });
  });

  /**
   * Find one account by id
   */
  app.get('/accounts/:id', app.util.isRequestAuthenticated, (req, res) => {
      const p = req.params;

      db.accounts.findOne({
                          where: {id: p.id},
                          include: [
                               {
                                 model: db.addresses,
                                 //as: 'address',
                                 where: { type : 'MAILING'},
                                 limit: 1
                               }
                         ]}).then(account => {
          res.json(account);
      });
   });

  /**
   * Create new account
   */
  app.post('/accounts', app.util.isRequestAuthenticated, (req, res) => {
      const newAccount = req.body.account;

      newAccount.id = app.util.generateUUID();
      newAccount.address.id = app.util.generateUUID();

      //Find first if exists, then add if not.
      db.accounts.findOne({where: {name: newAccount.name}})
                 .then(account => {
                        if(account){
                            // Return error if record already exists
                            res.statusMessage = "Account with the same name " + account.name + " already exists.";
                            res.status(409).json(account);
                        }else{
                            db.accounts.create({id : newAccount.id,
                                                name : newAccount.name,
                                                type : newAccount.type,
                                                //alias 'address' was used in associations
                                                addresses : [{
                                                    id : newAccount.address.id,
                                                    city : newAccount.address.city,
                                                    street : newAccount.address.street,
                                                    state : newAccount.address.state,
                                                    country : newAccount.address.country,
                                                    type : newAccount.address.type,
                                                    zip: newAccount.address.zip,
                                                    phone : newAccount.address.phone
                                                }]},{
                                                    include: ['addresses'] //address if alias is used
                                                })
                              .then(account => {
                                res.json(account);
                              });
                        }
                 });
    });

  /**
   * Update account together with the associated address
   */
  app.patch('/accounts/:id', app.util.isRequestAuthenticated, (req, res) => {
        const id = req.params.id;
        const Account = req.body.account;

        // Update the account
        db.accounts.findById(id)
                    .then(account => {
                        account.updateAttributes(Account); //db.update() can also be used

                        // Update the address
                        db.addresses.findById(Account.address.id)
                                    .then(address => {
                                                    address.updateAttributes(Account.address);
                                                    res.json(Account);
                        });
        });

  });

  /**
   * Delete account
   */
  app.delete('/accounts/:id', app.util.isRequestAuthenticated, (req, res) => {
          const id = req.params.id;
          // Delete the account
          db.accounts.findById(id)
                              .then(account => {
                                 account.destroy().then(accountDeleted => {
                                    // Delete the addresses
                                    db.addresses.destroy({where: {account_id : id}})
                                                .then(addressesDeleted => {
                                                    // Delete the users
                                                    db.users.destroy({where: {account_id : id}})
                                                                .then(usersDeleted => {
                                                                    res.json(account);
                                                                });
                                                });
                                 });
          });

  });
};