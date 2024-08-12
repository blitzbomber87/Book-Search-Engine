const typeDefs = `
  type Book {
    bookId: String!
    authors: [String]
    description: String!
    image: String
    link: String
    title: String!
  }

  type User {
    _id: ID
    username: String!
    email: String!
    bookCount: int
    savedBooks: [Book]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
   addUser(username: String!, email: String!, password String!): Auth
   saveBook(bookId: String!,authors: [String], description: String!, image: String, link: String, title: String!): User
   removeBook(bookId: String!): User
   login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
