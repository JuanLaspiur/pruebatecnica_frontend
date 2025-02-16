import { useState } from "react";
import { register } from "@/lib/auth";
import { validateEmail } from "@/utils/validators";

export const useRegister = (onClose: () => void) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [error, setError] = useState<string>("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const setField = (field: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const validateForm = () => {
    const { password, repeatPassword, email } = formData;

    if (password !== repeatPassword) {
      return "Las contraseñas no coinciden";
    }

    if (!validateEmail(email)) {
      return "El correo electrónico no es válido";
    }

    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const { name, email, password } = formData;
      const result = await register(name, email, password);

      if (result.error) {
        setError("El correo electrónico ya está registrado.");
      } else {
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          onClose();
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      setError("Hubo un problema al registrar el usuario. Intenta de nuevo.");
    }
  };

  return {
    formData,
    error,
    showSuccessModal,
    setField,
    setError,
    setShowSuccessModal,
    handleSubmit,
  };
};
