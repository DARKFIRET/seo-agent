import { IMaskInput } from "react-imask";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  required?: boolean;
  placeholder?: string;
  id?: string;
}

/**
 * Russian phone input with IMask: +7 (000) 000-00-00
 */
export function PhoneInput({
  value,
  onChange,
  className,
  required,
  placeholder = "+7 (999) 123-45-67",
  id,
}: PhoneInputProps) {
  return (
    <IMaskInput
      id={id}
      mask="+{7} (000) 000-00-00"
      value={value}
      onAccept={(v: string) => onChange(v)}
      placeholder={placeholder}
      required={required}
      className={className}
      inputMode="tel"
      autoComplete="tel"
    />
  );
}
