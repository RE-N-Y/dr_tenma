/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPatient = /* GraphQL */ `
  mutation CreatePatient(
    $input: CreatePatientInput!
    $condition: ModelPatientConditionInput
  ) {
    createPatient(input: $input, condition: $condition) {
      id
      name
      email
      records {
        items {
          id
          patientID
          fever
          coughing
          breathing
          soreThroat
          allergies
          bodyAches
          temperature
          note
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updatePatient = /* GraphQL */ `
  mutation UpdatePatient(
    $input: UpdatePatientInput!
    $condition: ModelPatientConditionInput
  ) {
    updatePatient(input: $input, condition: $condition) {
      id
      name
      email
      records {
        items {
          id
          patientID
          fever
          coughing
          breathing
          soreThroat
          allergies
          bodyAches
          temperature
          note
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deletePatient = /* GraphQL */ `
  mutation DeletePatient(
    $input: DeletePatientInput!
    $condition: ModelPatientConditionInput
  ) {
    deletePatient(input: $input, condition: $condition) {
      id
      name
      email
      records {
        items {
          id
          patientID
          fever
          coughing
          breathing
          soreThroat
          allergies
          bodyAches
          temperature
          note
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createSymptom = /* GraphQL */ `
  mutation CreateSymptom(
    $input: CreateSymptomInput!
    $condition: ModelSymptomConditionInput
  ) {
    createSymptom(input: $input, condition: $condition) {
      id
      patientID
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
      updatedAt
      owner
    }
  }
`;
export const updateSymptom = /* GraphQL */ `
  mutation UpdateSymptom(
    $input: UpdateSymptomInput!
    $condition: ModelSymptomConditionInput
  ) {
    updateSymptom(input: $input, condition: $condition) {
      id
      patientID
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
      updatedAt
      owner
    }
  }
`;
export const deleteSymptom = /* GraphQL */ `
  mutation DeleteSymptom(
    $input: DeleteSymptomInput!
    $condition: ModelSymptomConditionInput
  ) {
    deleteSymptom(input: $input, condition: $condition) {
      id
      patientID
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
      updatedAt
      owner
    }
  }
`;
