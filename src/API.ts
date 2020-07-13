/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreatePatientInput = {
  id?: string | null,
  name?: string | null,
  email: string,
};

export type ModelPatientConditionInput = {
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  and?: Array< ModelPatientConditionInput | null > | null,
  or?: Array< ModelPatientConditionInput | null > | null,
  not?: ModelPatientConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type UpdatePatientInput = {
  id: string,
  name?: string | null,
  email?: string | null,
};

export type DeletePatientInput = {
  id?: string | null,
};

export type CreateSymptomInput = {
  id?: string | null,
  patientID: string,
  fever: number,
  coughing: number,
  breathing: number,
  soreThroat: number,
  allergies: number,
  bodyAches: number,
  temperature: number,
  location?: LocationInput | null,
  note?: string | null,
  createdAt?: string | null,
};

export type LocationInput = {
  longitude: number,
  latitude: number,
};

export type ModelSymptomConditionInput = {
  patientID?: ModelIDInput | null,
  fever?: ModelIntInput | null,
  coughing?: ModelIntInput | null,
  breathing?: ModelIntInput | null,
  soreThroat?: ModelIntInput | null,
  allergies?: ModelIntInput | null,
  bodyAches?: ModelIntInput | null,
  temperature?: ModelFloatInput | null,
  note?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelSymptomConditionInput | null > | null,
  or?: Array< ModelSymptomConditionInput | null > | null,
  not?: ModelSymptomConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateSymptomInput = {
  id: string,
  patientID?: string | null,
  fever?: number | null,
  coughing?: number | null,
  breathing?: number | null,
  soreThroat?: number | null,
  allergies?: number | null,
  bodyAches?: number | null,
  temperature?: number | null,
  location?: LocationInput | null,
  note?: string | null,
  createdAt?: string | null,
};

export type DeleteSymptomInput = {
  id?: string | null,
};

export type ModelPatientFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  and?: Array< ModelPatientFilterInput | null > | null,
  or?: Array< ModelPatientFilterInput | null > | null,
  not?: ModelPatientFilterInput | null,
};

export type ModelSymptomFilterInput = {
  id?: ModelIDInput | null,
  patientID?: ModelIDInput | null,
  fever?: ModelIntInput | null,
  coughing?: ModelIntInput | null,
  breathing?: ModelIntInput | null,
  soreThroat?: ModelIntInput | null,
  allergies?: ModelIntInput | null,
  bodyAches?: ModelIntInput | null,
  temperature?: ModelFloatInput | null,
  note?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelSymptomFilterInput | null > | null,
  or?: Array< ModelSymptomFilterInput | null > | null,
  not?: ModelSymptomFilterInput | null,
};

export type CreatePatientMutationVariables = {
  input: CreatePatientInput,
  condition?: ModelPatientConditionInput | null,
};

export type CreatePatientMutation = {
  createPatient:  {
    __typename: "Patient",
    id: string,
    name: string | null,
    email: string,
    records:  {
      __typename: "ModelSymptomConnection",
      items:  Array< {
        __typename: "Symptom",
        id: string,
        patientID: string,
        fever: number,
        coughing: number,
        breathing: number,
        soreThroat: number,
        allergies: number,
        bodyAches: number,
        temperature: number,
        note: string | null,
        createdAt: string,
        updatedAt: string,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type UpdatePatientMutationVariables = {
  input: UpdatePatientInput,
  condition?: ModelPatientConditionInput | null,
};

export type UpdatePatientMutation = {
  updatePatient:  {
    __typename: "Patient",
    id: string,
    name: string | null,
    email: string,
    records:  {
      __typename: "ModelSymptomConnection",
      items:  Array< {
        __typename: "Symptom",
        id: string,
        patientID: string,
        fever: number,
        coughing: number,
        breathing: number,
        soreThroat: number,
        allergies: number,
        bodyAches: number,
        temperature: number,
        note: string | null,
        createdAt: string,
        updatedAt: string,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type DeletePatientMutationVariables = {
  input: DeletePatientInput,
  condition?: ModelPatientConditionInput | null,
};

export type DeletePatientMutation = {
  deletePatient:  {
    __typename: "Patient",
    id: string,
    name: string | null,
    email: string,
    records:  {
      __typename: "ModelSymptomConnection",
      items:  Array< {
        __typename: "Symptom",
        id: string,
        patientID: string,
        fever: number,
        coughing: number,
        breathing: number,
        soreThroat: number,
        allergies: number,
        bodyAches: number,
        temperature: number,
        note: string | null,
        createdAt: string,
        updatedAt: string,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type CreateSymptomMutationVariables = {
  input: CreateSymptomInput,
  condition?: ModelSymptomConditionInput | null,
};

export type CreateSymptomMutation = {
  createSymptom:  {
    __typename: "Symptom",
    id: string,
    patientID: string,
    fever: number,
    coughing: number,
    breathing: number,
    soreThroat: number,
    allergies: number,
    bodyAches: number,
    temperature: number,
    location:  {
      __typename: "Location",
      longitude: number,
      latitude: number,
    } | null,
    note: string | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type UpdateSymptomMutationVariables = {
  input: UpdateSymptomInput,
  condition?: ModelSymptomConditionInput | null,
};

export type UpdateSymptomMutation = {
  updateSymptom:  {
    __typename: "Symptom",
    id: string,
    patientID: string,
    fever: number,
    coughing: number,
    breathing: number,
    soreThroat: number,
    allergies: number,
    bodyAches: number,
    temperature: number,
    location:  {
      __typename: "Location",
      longitude: number,
      latitude: number,
    } | null,
    note: string | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type DeleteSymptomMutationVariables = {
  input: DeleteSymptomInput,
  condition?: ModelSymptomConditionInput | null,
};

export type DeleteSymptomMutation = {
  deleteSymptom:  {
    __typename: "Symptom",
    id: string,
    patientID: string,
    fever: number,
    coughing: number,
    breathing: number,
    soreThroat: number,
    allergies: number,
    bodyAches: number,
    temperature: number,
    location:  {
      __typename: "Location",
      longitude: number,
      latitude: number,
    } | null,
    note: string | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type GetPatientQueryVariables = {
  id: string,
};

export type GetPatientQuery = {
  getPatient:  {
    __typename: "Patient",
    id: string,
    name: string | null,
    email: string,
    records:  {
      __typename: "ModelSymptomConnection",
      items:  Array< {
        __typename: "Symptom",
        id: string,
        patientID: string,
        fever: number,
        coughing: number,
        breathing: number,
        soreThroat: number,
        allergies: number,
        bodyAches: number,
        temperature: number,
        note: string | null,
        createdAt: string,
        updatedAt: string,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type ListPatientsQueryVariables = {
  filter?: ModelPatientFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPatientsQuery = {
  listPatients:  {
    __typename: "ModelPatientConnection",
    items:  Array< {
      __typename: "Patient",
      id: string,
      name: string | null,
      email: string,
      records:  {
        __typename: "ModelSymptomConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetSymptomQueryVariables = {
  id: string,
};

export type GetSymptomQuery = {
  getSymptom:  {
    __typename: "Symptom",
    id: string,
    patientID: string,
    fever: number,
    coughing: number,
    breathing: number,
    soreThroat: number,
    allergies: number,
    bodyAches: number,
    temperature: number,
    location:  {
      __typename: "Location",
      longitude: number,
      latitude: number,
    } | null,
    note: string | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type ListSymptomsQueryVariables = {
  filter?: ModelSymptomFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSymptomsQuery = {
  listSymptoms:  {
    __typename: "ModelSymptomConnection",
    items:  Array< {
      __typename: "Symptom",
      id: string,
      patientID: string,
      fever: number,
      coughing: number,
      breathing: number,
      soreThroat: number,
      allergies: number,
      bodyAches: number,
      temperature: number,
      location:  {
        __typename: "Location",
        longitude: number,
        latitude: number,
      } | null,
      note: string | null,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreatePatientSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreatePatientSubscription = {
  onCreatePatient:  {
    __typename: "Patient",
    id: string,
    name: string | null,
    email: string,
    records:  {
      __typename: "ModelSymptomConnection",
      items:  Array< {
        __typename: "Symptom",
        id: string,
        patientID: string,
        fever: number,
        coughing: number,
        breathing: number,
        soreThroat: number,
        allergies: number,
        bodyAches: number,
        temperature: number,
        note: string | null,
        createdAt: string,
        updatedAt: string,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnUpdatePatientSubscription = {
  onUpdatePatient:  {
    __typename: "Patient",
    id: string,
    name: string | null,
    email: string,
    records:  {
      __typename: "ModelSymptomConnection",
      items:  Array< {
        __typename: "Symptom",
        id: string,
        patientID: string,
        fever: number,
        coughing: number,
        breathing: number,
        soreThroat: number,
        allergies: number,
        bodyAches: number,
        temperature: number,
        note: string | null,
        createdAt: string,
        updatedAt: string,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnDeletePatientSubscription = {
  onDeletePatient:  {
    __typename: "Patient",
    id: string,
    name: string | null,
    email: string,
    records:  {
      __typename: "ModelSymptomConnection",
      items:  Array< {
        __typename: "Symptom",
        id: string,
        patientID: string,
        fever: number,
        coughing: number,
        breathing: number,
        soreThroat: number,
        allergies: number,
        bodyAches: number,
        temperature: number,
        note: string | null,
        createdAt: string,
        updatedAt: string,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnCreateSymptomSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateSymptomSubscription = {
  onCreateSymptom:  {
    __typename: "Symptom",
    id: string,
    patientID: string,
    fever: number,
    coughing: number,
    breathing: number,
    soreThroat: number,
    allergies: number,
    bodyAches: number,
    temperature: number,
    location:  {
      __typename: "Location",
      longitude: number,
      latitude: number,
    } | null,
    note: string | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnUpdateSymptomSubscription = {
  onUpdateSymptom:  {
    __typename: "Symptom",
    id: string,
    patientID: string,
    fever: number,
    coughing: number,
    breathing: number,
    soreThroat: number,
    allergies: number,
    bodyAches: number,
    temperature: number,
    location:  {
      __typename: "Location",
      longitude: number,
      latitude: number,
    } | null,
    note: string | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnDeleteSymptomSubscription = {
  onDeleteSymptom:  {
    __typename: "Symptom",
    id: string,
    patientID: string,
    fever: number,
    coughing: number,
    breathing: number,
    soreThroat: number,
    allergies: number,
    bodyAches: number,
    temperature: number,
    location:  {
      __typename: "Location",
      longitude: number,
      latitude: number,
    } | null,
    note: string | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};
