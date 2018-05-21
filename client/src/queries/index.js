import { gql } from "apollo-boost";

const getDocumentsQuery = gql`
  {
    documents {
      id
      name
      displayName
      create_date
      active
    }
  }
`;

const updateDocumentMutation = gql`
  mutation($id: ID!, $displayName: String!) {
    updateDocument(id: $id, displayName: $displayName) {
      id
      displayName
      create_date
    }
  }
`;

const deactivateDocumentMutation = gql`
  mutation($id: ID!) {
    deactivateDocument(id: $id, active: false) {
      id
      displayName
      create_date
      active
    }
  }
`;

export {
  getDocumentsQuery,
  updateDocumentMutation,
  deactivateDocumentMutation
};
