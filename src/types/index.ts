export interface FormStructure {
  formId: string;
  fields: FormStructureSection[];
  title: string;
}

export interface FormStructureSection {
  fields: FormStructureFields[];
  id: string;
  label: string;
  type: string;
}

export interface FormStructureFields {
  id: string;
  label: string;
  required: boolean;
  type: string;
  options?: string[];
  dynamicOptions?: DynamicOptions;
  visibility?: Visibility;
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