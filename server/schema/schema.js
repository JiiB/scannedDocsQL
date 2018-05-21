const graphql = require('graphql');
const _ = require('lodash');
const Document = require('../models/document');
const User = require('../models/user');


const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean
} = graphql;

const DocumentType = new GraphQLObjectType({
  name: 'Document',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    displayName: {
      type: GraphQLString
    },
    create_date: {
      type: GraphQLString
    },
    active: {
      type: GraphQLBoolean
    },
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    email: {
      type: GraphQLString
    },
    create_date: {
      type: GraphQLString
    },
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    document: {
      type: DocumentType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        return Document.findById(args.id);
      }
    },
    documents: {
      type: new GraphQLList(DocumentType),
      resolve(parent, args) {
        return Document.find();
      }
    },
    user: {
      type: UserType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        return User.findById(args.id);
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find();
      }
    },
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    updateDocument: {
      type: DocumentType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        },
        displayName: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve(parent, args) {

        return Document.findByIdAndUpdate(args.id, {
          displayName: args.displayName
        });
      }
    },
    deactivateDocument: {
      type: DocumentType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        },
        active: {
          type: new GraphQLNonNull(GraphQLBoolean)
        }
      },
      resolve(parent, args) {

        return Document.findByIdAndUpdate(args.id, {
          active: args.active
        });
      }
    },
    addUser: {
      type: UserType,
      args: {
        email: {
          type: new GraphQLNonNull(GraphQLString)
        },
        create_date: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve(parent, args) {
        let user = new User({
          email: args.email,
          create_date: args.create_date
        });
        return user.save();
      }
    },
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});