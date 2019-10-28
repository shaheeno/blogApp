module.exports ={
    Query: {
        showAllBlogs: async function (parent, args, context) {
          const {Blog} = context.database.models;
          // const {blog} = args;
          return await Blog.findAll({
            order: [
              ['id', 'ASC'],
            ],
           
          });
        },
       
        userList: async function (parent, args, context) {
          const {User} = context.database.models;
          return await User.findAll({
            order: [
              ['id', 'DESC'],
            ]
          });
        },
      },
}