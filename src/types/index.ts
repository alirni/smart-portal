export interface FormStructure {
  formId: string;
  fields: FormStructureFields[];
  title: string;
}

export interface FormStructureFields {
  id: string;
  label: string;
  required: boolean;
  type: string;
  options?: string[];
  dynamicOptions?: DynamicOptions;
  visibility?: Visibility;
  fields?: FormStructureFields[];
}

export interface DynamicOptions {
  dependsOn: string;
  endpoint: string;
  method: string;
};

export interface Visibility {
  condition: "equals" | "notEquals";
  dependsOn: string;
  value: string;
};

export interface FormValues {
  [key: string]: unknown;
}