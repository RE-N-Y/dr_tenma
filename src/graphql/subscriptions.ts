/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateStudent = /* GraphQL */ `
  subscription OnCreateStudent($owner: String) {
    onCreateStudent(owner: $owner) {
      id
      name
      email
      records {
        fever
        coughing
        breathing
        soreThroat
        allergies
        bodyAches
        temperature
        location {
          longitude
          latitude
        }
        note
        createdAt
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateStudent = /* GraphQL */ `
  subscription OnUpdateStudent {
    onUpdateStudent {
      id
      name
      email
      records {
        fever
        coughing
        breathing
        soreThroat
        allergies
        bodyAches
        temperature
        location {
          longitude
          latitude
        }
        note
        createdAt
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteStudent = /* GraphQL */ `
  subscription OnDeleteStudent {
    onDeleteStudent {
      id
      name
      email
      records {
        fever
        coughing
        breathing
        soreThroat
        allergies
        bodyAches
        temperature
        location {
          longitude
          latitude
        }
        note
        createdAt
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
