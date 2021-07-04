const handleProfileUpdate = (req, res, db) => {
    const { id } = req.params
    const { name, email, profession } = req.body;
    db('users')
    .where({ id })
    .update({ name: name, email: email, profession: profession })
    .then(resp => {
      if (resp) {
        db('login')
        .where({ id: id })
        .update({email: email})
        .then(updated => {
          updated ? ( 
            res.status(200).json({message: "Success updating profile"})
          ) : (
            res.status(400).json({error: 'Not found'})
          )
        })
      } else {
        res.status(400).json({error: 'Not found'})
      }
    })
    .catch(err => res.status(404).json({error: 'unable to update'}))
};
  
module.exports = {
  handleProfileUpdate
}