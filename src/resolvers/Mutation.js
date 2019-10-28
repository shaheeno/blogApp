const { withFilter } = require('graphql-subscriptions');
let {PubSub} = require("apollo-server");


const BLOGUPDATED = "BLOGUPDATED";
const BLOGCREATED = "BLOGCREATED";
const USER_CREATED = "USER_CREATED";

const pubsub = new PubSub();



module.exports = {
    Mutation: {
        signup: async (parent, args, {database}) => {
            const user = {...args};
            console.log(user)
            const {User} = database.models
            const insertUser = await User.create(user)
            return insertUser;
        },

        login: async function (parent, args, context) {
            const {User} = context.database.models;
            const findUser = await User.findOne({where: {email: args.email}});
            if (findUser) {
              return findUser;
            }else {
              return Error("No user found or missing details");
            }
          },

          createBlog: async function (parent, args, {database}) {
            const {Blog} = database.models;
            let create = await Blog.create(args);
            pubsub.publish(BLOGCREATED, {blogCreated: create });
            return create;
          },

          updateBlog: async function (parent, args , {database}){
            const {Blog} = database.models;
          console.log(args.title)
             await Blog.update({
              title: args.title,
              author: args.author,
              content: args.content
            }, {
              where:{
                id: args.id
              }
            });
            const update = Blog.findOne({where: {
              id: args.id
            }})
            pubsub.publish(BLOGUPDATED, {blogUpdate: update});
            return update;
          }
        },
          Subscription: {
            blogCreated : {
              subscribe: () => pubsub.asyncIterator([BLOGCREATED])
            },

            blogUpdate : {
              subscribe : () => pubsub.asyncIterator([BLOGUPDATED])
            },
            // BlogCreated: {
            //   subscribe: () => pubsub.asyncIterator([BLOGCREATED]),
            // },
            // userCreated: {
            //   subscribe: () => pubsub.asyncIterator([USER_CREATED]),
            // },
          }
}