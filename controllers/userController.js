const { User, Thought} = require('../models');
const { ObjectId } = require('mongodb');

module.exports = {
    //Get all Users
    getUsers(req, res) {
        User.find()
        .populate('friends')
        .populate('thoughts')
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err))
    },
      // Get a user
    getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate('friends')
      .populate('thoughts')
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: 'user and thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  addFriend(req,res){
    console.log('You are adding a friend!')
    console.log(req.body)
    User.findOneAndUpdate(
        { _id: req.params.userId},
        { $addToSet: {friends: req.params.friendId}},
        { runValidators: true, new: true}
    )
        .then((user) => !user ? res.status(404)
        .json({ message: 'No user found with this id'})
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err))
  },
  removeFriend(req, res){
    User.findOneAndUpdate(
        { _id: req.params.userId},
        { $pull: { friends: req.params.friendId} } ,
        { runValidators: true, new: true}
    )
    .then((user) =>
    !user ? res.status(404).json({message: 'No user with this id'}) : res.json('done'))
    .catch((err)=> res.status(500).json(err))
  }

}