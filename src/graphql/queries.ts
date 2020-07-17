/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const nearbySymptoms = /* GraphQL */ `
  query NearbySymptoms(
    $location: LocationInput!
    $m: Int
    $limit: Int
    $nextToken: String
  ) {
    nearbySymptoms(
      location: $location
      m: $m
      limit: $limit
      nextToken: $nextToken
    ) {
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
        severity
        location {
          lat
          lon
        }
        note
        createdAt
        updatedAt
        owner
      }
      total
      nextToken
    }
  }
`;
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
          severity
          note
          createdAt
          updatedAt
          owner
        }
        total
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
          total
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
      severity
      location {
        lat
        lon
      }
      note
      createdAt
      updatedAt
      owner
    }
  }
`;
export const getSymptomSeries = /* GraphQL */ `
  query GetPatient($id: ID!) {
    getPatient(id: $id) {
      records {
        items {
          fever
          coughing
          breathing
          soreThroat
          allergies
          bodyAches
          temperature
          location {
            lat
            lon
          }
          updatedAt
        }
      }
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
        severity
        location {
          lat
          lon
        }
        note
        createdAt
        updatedAt
        owner
      }
      total
      nextToken
    }
  }
`;
export const searchSymptoms = /* GraphQL */ `
  query SearchSymptoms(
    $filter: SearchableSymptomFilterInput
    $sort: SearchableSymptomSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchSymptoms(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
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
        severity
        location {
          lat
          lon
        }
        note
        createdAt
        updatedAt
        owner
      }
      nextToken
      total
    }
  }
`;
