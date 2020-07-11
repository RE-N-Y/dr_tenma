/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createStudent = /* GraphQL */ `
  mutation CreateStudent(
    $input: CreateStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    createStudent(input: $input, condition: $condition) {
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
export const updateStudent = /* GraphQL */ `
  mutation UpdateStudent(
    $input: UpdateStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    updateStudent(input: $input, condition: $condition) {
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
export const deleteStudent = /* GraphQL */ `
  mutation DeleteStudent(
    $input: DeleteStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    deleteStudent(input: $input, condition: $condition) {
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
