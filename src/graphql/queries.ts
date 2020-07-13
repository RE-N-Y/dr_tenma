/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPatient = /* GraphQL */ `
  query GetPatient($id: ID!) {
    getPatient(id: $id) {
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
export const listPatients = /* GraphQL */ `
  query ListPatients(
    $filter: ModelPatientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPatients(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        records {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getSymptom = /* GraphQL */ `
  query GetSymptom($id: ID!) {
    getSymptom(id: $id) {
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
export const listSymptoms = /* GraphQL */ `
  query ListSymptoms(
    $filter: ModelSymptomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSymptoms(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        location {
          longitude
          latitude
        }
        note
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
