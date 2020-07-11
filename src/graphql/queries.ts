/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getStudent = /* GraphQL */ `
  query GetStudent($id: ID!) {
    getStudent(id: $id) {
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
export const listStudents = /* GraphQL */ `
  query ListStudents(
    $filter: ModelStudentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStudents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          note
          createdAt
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
