/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateStudentInput = {
  id?: string | null,
  name?: string | null,
  email?: string | null,
  records?: Array< SymptomInput | null > | null,
};

export type SymptomInput = {
  fever: number,
  coughing: number,
  breathing: number,
  soreThroat: number,
  allergies: number,
  bodyAches: number,
  temperature: number,
  location?: LocationInput | null,
  note?: string | null,
  createdAt: string,
};

export type LocationInput = {
  longitude: number,
  latitude: number,
};

export type ModelStudentConditionInput = {
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  and?: Array< ModelStudentConditionInput | null > | null,
  or?: Array< ModelStudentConditionInput | null > | null,
  not?: ModelStudentConditionInput | null,
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

export type UpdateStudentInput = {
  id: string,
  name?: string | null,
  email?: string | null,
  records?: Array< SymptomInput | null > | null,
};

export type DeleteStudentInput = {
  id?: string | null,
};

export type ModelStudentFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  and?: Array< ModelStudentFilterInput | null > | null,
  or?: Array< ModelStudentFilterInput | null > | null,
  not?: ModelStudentFilterInput | null,
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

export type CreateStudentMutationVariables = {
  input: CreateStudentInput,
  condition?: ModelStudentConditionInput | null,
};

export type CreateStudentMutation = {
  createStudent:  {
    __typename: "Student",
    id: string,
    name: string | null,
    email: string | null,
    records:  Array< {
      __typename: "Symptom",
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
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type UpdateStudentMutationVariables = {
  input: UpdateStudentInput,
  condition?: ModelStudentConditionInput | null,
};

export type UpdateStudentMutation = {
  updateStudent:  {
    __typename: "Student",
    id: string,
    name: string | null,
    email: string | null,
    records:  Array< {
      __typename: "Symptom",
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
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type DeleteStudentMutationVariables = {
  input: DeleteStudentInput,
  condition?: ModelStudentConditionInput | null,
};

export type DeleteStudentMutation = {
  deleteStudent:  {
    __typename: "Student",
    id: string,
    name: string | null,
    email: string | null,
    records:  Array< {
      __typename: "Symptom",
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
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type GetStudentQueryVariables = {
  id: string,
};

export type GetStudentQuery = {
  getStudent:  {
    __typename: "Student",
    id: string,
    name: string | null,
    email: string | null,
    records:  Array< {
      __typename: "Symptom",
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
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type ListStudentsQueryVariables = {
  filter?: ModelStudentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListStudentsQuery = {
  listStudents:  {
    __typename: "ModelStudentConnection",
    items:  Array< {
      __typename: "Student",
      id: string,
      name: string | null,
      email: string | null,
      records:  Array< {
        __typename: "Symptom",
        fever: number,
        coughing: number,
        breathing: number,
        soreThroat: number,
        allergies: number,
        bodyAches: number,
        temperature: number,
        note: string | null,
        createdAt: string,
      } | null > | null,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateStudentSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateStudentSubscription = {
  onCreateStudent:  {
    __typename: "Student",
    id: string,
    name: string | null,
    email: string | null,
    records:  Array< {
      __typename: "Symptom",
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
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnUpdateStudentSubscription = {
  onUpdateStudent:  {
    __typename: "Student",
    id: string,
    name: string | null,
    email: string | null,
    records:  Array< {
      __typename: "Symptom",
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
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnDeleteStudentSubscription = {
  onDeleteStudent:  {
    __typename: "Student",
    id: string,
    name: string | null,
    email: string | null,
    records:  Array< {
      __typename: "Symptom",
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
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};
