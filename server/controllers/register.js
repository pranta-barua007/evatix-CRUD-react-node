const handleRegister = (req, res, db, bcrypt) => {
    const {name, email, birthdate, password} = req.body;
    if (!email || !name || !password){
        return res.status(400).json('incorrect form submission');
    }
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({ 
                name: name,
                email: loginEmail[0],
                birthdate: new Date(birthdate)  
            })
            .then(user => {
                res.status(201).json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })   
    .catch(err => res.status(404).json({error: 'unable to register'}))
};

module.exports = {
    handleRegister: handleRegister
};