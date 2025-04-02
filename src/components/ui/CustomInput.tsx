// components/ui/CustomInput.tsx

interface CustomInputProps {
    type?: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    name: string;  // Pridaný parameter name pre každý input, ktorý by mal byť unikátny
  }
  
  export default function CustomInput({
    type = "text",
    placeholder,
    value,
    onChange,
    className = "",
    name,
  }: CustomInputProps) {
    return (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full p-3 rounded bg-gray-900 text-white border border-blue-500 ${className}`}
        name={name}  // Tu priradíme name parameter
      />
    );
  }
  