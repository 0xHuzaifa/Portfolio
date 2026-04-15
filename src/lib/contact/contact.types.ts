export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export type ContactFieldName = keyof ContactFormData;

export type ContactFieldErrors = Partial<Record<ContactFieldName, string>>;

export type ContactApiResponse =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      message: string;
      fieldErrors?: ContactFieldErrors;
    };
