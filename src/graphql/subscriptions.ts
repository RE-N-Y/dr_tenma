/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePatient = /* GraphQL */ `
  subscription OnCreatePatient($owner: String) {
    onCreatePatient(owner: $owner) {
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
export const onUpdatePatient = /* GraphQL */ `
  subscription OnUpdatePatient {
    onUpdatePatient {
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
export const onDeletePatient = /* GraphQL */ `
  subscription OnDeletePatient {
    onDeletePatient {
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
export const onCreateSymptom = /* GraphQL */ `
  subscription OnCreateSymptom($owner: String) {
    onCreateSymptom(owner: $owner) {
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
export const onUpdateSymptom = /* GraphQL */ `
  subscription OnUpdateSymptom {
    onUpdateSymptom {
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
export const onDeleteSymptom = /* GraphQL */ `
  subscription OnDeleteSymptom {
    onDeleteSymptom {
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
