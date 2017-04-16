import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';

import { typeDefs, resolvers } from '/imports/api/schema';

const graphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

/*
* createApolloServer is used to create and configure an Express GraphQL server
* integrated with of meteor. Assuming you want to run the Apollo Server inside a
* Meteor instance, you will want to bind the Express server to Meteor like
* 'this'. That way, there is no CORS issue -- your Express routes are integrated
* into Meteor and you can navigate to your GraphQL endpoint/GraphiQL path just
* like any other page in your application!
* createApolloServer(customOptions = {}, customConfig = {})
* see: http://dev.apollodata.com/core/meteor.html#createApolloServer
*/
const customOptions = {
  schema: graphQLSchema,

  // values to be used as context and rootValue in resolvers
  // context?: any,
  // rootValue?: any,

  // function used to format errors before returning them to clients
  // formatError?: Function,

  // additional validation rules to be applied to client-specified queries
  // validationRules?: Array<ValidationRule>,

  // function applied for each query in a batch to format parameters before passing them to `runQuery`
  // formatParams?: Function,

  // function applied to each response before returning data to clients
  // formatResponse?: Function,

  // a boolean option that will trigger additional debug logging if execution errors occur
  // debug?: boolean
};
/* const customConfig = {
  configServer: expressServer => expressServer.use((req, res, next) => {
    // do something there manually or use an express middleware instead of this custom function
  }),
}; */

createApolloServer(customOptions);
