const handleProfileUpdate = (req, res, db) => {
    const { id } = req.params
    const { name, age, pet } = req.body.formInput
    db('users')
    .where({ id })
    .update({ name: name, age: age, pet: pet })
    .then(resp => {
      if (resp) {
        res.status(200).json({...resp, message: "Success updating profile"})
      } else {
        res.status(400).json({error: 'Not found'})
      }
    })
    .catch(err => res.status(400).json({error: 'error updating user'}))
  };
  
  module.exports = {
    handleProfileUpdate
  }