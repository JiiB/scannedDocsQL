import { gql } from "apollo-boost";

const getDocumentsQuery = gql`
  {
    documents {
      id
      name
      displayName
      create_date
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

export { getDocumentsQuery, updateDocumentMutation };
