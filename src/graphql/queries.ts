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
        Fever
        Coughing
        Breathing
        SoreThroat
        Allergies
        BodyAches
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
          Fever
          Coughing
          Breathing
          SoreThroat
          Allergies
          BodyAches
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
