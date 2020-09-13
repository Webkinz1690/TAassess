const mongoose = require('mongoose'),
validator = require('validator'),
bcrypt = require('bcryptjs'),
jwt = require('jsonwebtoken'),
  Post = require('./post');

  const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
          },
     
      email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
          if (!validator.isEmail(value)) {
            throw new Error('Email is invalid.');
          }
        }
      },
      password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
          if (value.toLowerCase().includes('password')) {
            throw new Error("your password cannot include the word password");
          }
          if (value.length < 6) {
            throw new Error('password must be at least 6 characters long.');
          }
        }
      },
      tokens: [
        {
          token: {
            type: String,
            required: true
          }
        }
      ],

     
    },
    {
      timestamps: true
    }
  );

  // Create relation between User and post.
userSchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'author'
  });


  userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
  };
  
  userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign(
      { _id: user._id.toString(), name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
  };
  
  // find user by email and password
  userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Unable to log in.');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Unable to login.');
    return user;
  };
  
  // This mongoose middleware will hash our user's passwords whenever a user is created or a user password is updated.
  userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password'))
      user.password = await bcrypt.hash(user.password, 8);
  
    next();
  });

  // Delete user posts when user is removed.
userSchema.pre('remove', async function (next) {
    const user = this;
    await Post.deleteMany({
      author: user._id
    });
    next();
  });

const User = mongoose.model('User', userSchema);

module.exports = User;