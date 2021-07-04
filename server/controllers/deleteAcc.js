const handleProfileDelete = (req, res, db) => {
  const { id } = req.params;
  const { accId } = req.body;

  if(accId !== Number(id)) {
    return res.status(400).json({error: 'unauthorized action'})
  }
  
    db('users')
    .where({ id })
    .del()
    .then(resp => {
      if (resp) {
        db('login')
        .where({ id: id })
        .del()
        .then(profileDeleted => {
          profileDeleted ? ( 
            res.status(200).json({message: "Success deleting profile"})
          ) : (
            res.status(400).json({error: 'Not found'})
          )
        })
      } else {
        res.status(400).json({error: 'Not found'})
      }
    })
    .catch(err => res.status(404).json({error: 'unable to delete'}))
};
  
module.exports = {
    handleProfileDelete
}