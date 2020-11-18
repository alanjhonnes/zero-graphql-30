import fastify from 'fastify';
import mercurius from 'mercurius';
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList,  } from 'graphql';
import DataLoader from 'dataloader';
import { users } from './users';

const userType: GraphQLObjectType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLInt),
        },
        name: { type: new GraphQLNonNull(GraphQLString)},
        email: { type: new GraphQLNonNull(GraphQLString)},
        friends: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(userType))),
            resolve: (obj, args, context) => {
                return context.loaders.userById.loadMany(obj.friendIds);
            }
        }
    })
})

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        hello: { 
            type: GraphQLString,
            resolve: () => {
                return 'Hello World';
            }
        },
        users: {
            type: new GraphQLList(userType),
            resolve: () => {
                return users;
            }
        }
    }
})

const schema = new GraphQLSchema({
    query: queryType,
});

const app = fastify();

app.register(mercurius, {
    schema: schema,
    graphiql: 'playground',
    context: () => ({
        loaders: {
            userById: new DataLoader(async (ids) => {
                console.log('loading user ids: ', ids);
                return ids.map(id => users.find(user => user.id === id));
            })
        }
    })
});

app.listen(4000, () => {
    console.log('Listening on port 4000')
});
