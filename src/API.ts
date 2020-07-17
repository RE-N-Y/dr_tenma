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

export enum Severity {
  SAFE = "SAFE",
  WATCH = "WATCH",
  ALERT = "ALERT",
  WARNING = "WARNING",
}


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
  severity: Severity,
  location?: LocationInput | null,
  note?: string | null,
  createdAt?: string | null,
};

export type LocationInput = {
  lat: number,
  lon: number,
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
  severity?: ModelSeverityInput | null,
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

export type ModelSeverityInput = {
  eq?: Severity | null,
  ne?: Severity | null,
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
  severity?: Severity | null,
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
  severity?: ModelSeverityInput | null,
  note?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelSymptomFilterInput | null > | null,
  or?: Array< ModelSymptomFilterInput | null > | null,
  not?: ModelSymptomFilterInput | null,
};

export type SearchableSymptomFilterInput = {
  id?: SearchableIDFilterInput | null,
  patientID?: SearchableIDFilterInput | null,
  fever?: SearchableIntFilterInput | null,
  coughing?: SearchableIntFilterInput | null,
  breathing?: SearchableIntFilterInput | null,
  soreThroat?: SearchableIntFilterInput | null,
  allergies?: SearchableIntFilterInput | null,
  bodyAches?: SearchableIntFilterInput | null,
  temperature?: SearchableFloatFilterInput | null,
  note?: SearchableStringFilterInput | null,
  createdAt?: SearchableStringFilterInput | null,
  and?: Array< SearchableSymptomFilterInput | null > | null,
  or?: Array< SearchableSymptomFilterInput | null > | null,
  not?: SearchableSymptomFilterInput | null,
};

export type SearchableIDFilterInput = {
  ne?: string | null,
  gt?: string | null,
  lt?: string | null,
  gte?: string | null,
  lte?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
};

export type SearchableIntFilterInput = {
  ne?: number | null,
  gt?: number | null,
  lt?: number | null,
  gte?: number | null,
  lte?: number | null,
  eq?: number | null,
  range?: Array< number | null > | null,
};

export type SearchableFloatFilterInput = {
  ne?: number | null,
  gt?: number | null,
  lt?: number | null,
  gte?: number | null,
  lte?: number | null,
  eq?: number | null,
  range?: Array< number | null > | null,
};

export type SearchableStringFilterInput = {
  ne?: string | null,
  gt?: string | null,
  lt?: string | null,
  gte?: string | null,
  lte?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
};

export type SearchableSymptomSortInput = {
  field?: SearchableSymptomSortableFields | null,
  direction?: SearchableSortDirection | null,
};

export enum SearchableSymptomSortableFields {
  id = "id",
  patientID = "patientID",
  fever = "fever",
  coughing = "coughing",
  breathing = "breathing",
  soreThroat = "soreThroat",
  allergies = "allergies",
  bodyAches = "bodyAches",
  temperature = "temperature",
  note = "note",
  createdAt = "createdAt",
}


export enum SearchableSortDirection {
  asc = "asc",
  desc = "desc",
}


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
        severity: Severity,
        note: string | null,
        createdAt: string,
        updatedAt: string,
        owner: string | null,
      } | null > | null,
      total: number | null,
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
        severity: Severity,
        note: string | null,
        createdAt: string,
        updatedAt: string,
        owner: string | null,
      } | null > | null,
      total: number | null,
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
        severity: Severity,
        note: string | null,
        createdAt: string,
        updatedAt: string,
        owner: string | null,
      } | null > | null,
      total: number | null,
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
    severity: Severity,
    location:  {
      __typename: "Location",
      lat: number,
      lon: number,
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
    severity: Severity,
    location:  {
      __typename: "Location",
      lat: number,
      lon: number,
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
    severity: Severity,
    location:  {
      __typename: "Location",
      lat: number,
      lon: number,
    } | null,
    note: string | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type NearbySymptomsQueryVariables = {
  location: LocationInput,
  m?: number | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type NearbySymptomsQuery = {
  nearbySymptoms:  {
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
      severity: Severity,
      location:  {
        __typename: "Location",
        lat: number,
        lon: number,
      } | null,
      note: string | null,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null > | null,
    total: number | null,
    nextToken: string | null,
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
        severity: Severity,
        note: string | null,
        createdAt: string,
        updatedAt: string,
        owner: string | null,
      } | null > | null,
      total: number | null,
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
        total: number | null,
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
    severity: Severity,
    location:  {
      __typename: "Location",
      lat: number,
      lon: number,
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
      severity: Severity,
      location:  {
        __typename: "Location",
        lat: number,
        lon: number,
      } | null,
      note: string | null,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null > | null,
    total: number | null,
    nextToken: string | null,
  } | null,
};

export type SearchSymptomsQueryVariables = {
  filter?: SearchableSymptomFilterInput | null,
  sort?: SearchableSymptomSortInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type SearchSymptomsQuery = {
  searchSymptoms:  {
    __typename: "SearchableSymptomConnection",
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
      severity: Severity,
      location:  {
        __typename: "Location",
        lat: number,
        lon: number,
      } | null,
      note: string | null,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
    total: number | null,
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
        severity: Severity,
        note: string | null,
        createdAt: string,
        updatedAt: string,
        owner: string | null,
      } | null > | null,
      total: number | null,
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
        severity: Severity,
        note: string | null,
        createdAt: string,
        updatedAt: string,
        owner: string | null,
      } | null > | null,
      total: number | null,
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
        severity: Severity,
        note: string | null,
        createdAt: string,
        updatedAt: string,
        owner: string | null,
      } | null > | null,
      total: number | null,
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
    severity: Severity,
    location:  {
      __typename: "Location",
      lat: number,
      lon: number,
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
    severity: Severity,
    location:  {
      __typename: "Location",
      lat: number,
      lon: number,
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
    severity: Severity,
    location:  {
      __typename: "Location",
      lat: number,
      lon: number,
    } | null,
    note: string | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};
