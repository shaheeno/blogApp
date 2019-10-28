module.exports = `
type Blog {
  id: ID
  title: String!
  author: String
  content: String
}

type User {
  name: String!
  password: String!
  email: String!
}

type Query {
  showAllBlogs: [Blog]
  userList: User
}

input BlogPostInput {
  content: String
}

type Subscription {
    blogCreated: Blog
    blogUpdate: Blog
    userCreated: User
  }


type Mutation {
  login(email: String! password: String!): User
  signup(username: String!, email: String! , password: String!): User
  createBlog(title: String!, author: String, content: String): Blog
  updateBlog(id: ID, title: String, author: String, content: String): Blog
}
  
`