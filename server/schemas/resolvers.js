const { Book, User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
      me: async (parent, args, context) => {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id })
          .select('__v -password')
          .populate('books')
          return userData;
        }
        throw new AuthenticationError('Need to login');
      },
    },
    
    Mutation: {
        addUser: async (parent, args) => {
          const user = await User.create(args);
          const token = signToken(user);
    
          return { token, user };
        },

        saveBook: async (parent, { bookData }, context) => {
          console.log(context.user);
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { savedBooks: bookData } },
            {new: true, runValidators: true }
          );
        },

        removeBook: async (parent, { bookId }, context) => {
          const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId: bookId } } },
                { new: true }
          );
            if (context.user === null) {
              throw new AuthenticationError('Need to login');
            }
            return updatedUser;
          },

        login: async (parent, { email, password }) => {
          const user = await User.findOne({ email });
    
          if (!user) {
            throw AuthenticationError;
          }
    
          const correctPw = await user.isCorrectPassword(password);
    
          if (!correctPw) {
            throw AuthenticationError('Incorect email or password. Try again!');
          }
    
          const token = signToken(user);
    
          return { token, user };
        }
      }
    };
    
    module.exports = resolvers;
    