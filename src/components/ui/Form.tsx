// components/ui/Form.tsx

"use client";

import { useState } from "react";
import CustomInput from "@/components/ui/CustomInput";
import CustomButton from "@/components/ui/CustumButton";  // Oprava - CustumButton -> CustomButton

// Typ pre polia formulára
interface FormField {
  id: string;
  label: string;
  type: string;
}

interface FormProps {
  formFields: FormField[];
  onSubmit: (data: { [key: string]: string }) => void;
}

const Form = ({ formFields, onSubmit }: FormProps) => {
  const [formData, setFormData] = useState(
    formFields.reduce((acc, field) => ({ ...acc, [field.id]: "" }), {})
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleFormSubmit} className="w-full">
      {formFields.map((field) => (
        <CustomInput
          key={field.id}
          type={field.type}
          placeholder={field.label}
          value={formData[field.id]}
          onChange={handleChange}
          name={field.id}  // Posielame id ako name atribút
          className="mt-6"
        />
      ))}
      <CustomButton
        type="submit"
        text="Submit"
        color="bg-blue-500"
        size="large"
        hoverColor="hover:bg-blue-600"
        className="w-full mt-6 py-3 text-lg font-semibold"
      />
    </form>
  );
};

export default Form;
