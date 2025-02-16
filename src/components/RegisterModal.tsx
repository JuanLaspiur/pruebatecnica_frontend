"use client";

import { useRegister } from "@/hooks/useRegister";
import RegisterModalLayout from "./subcomponents/registermodal/RegisterModalLayout";
import RegisterForm from "./subcomponents/registermodal/RegisterForm";
import { ErrorModal, SuccessModal } from "./subcomponents";

interface RegisterModalProps {
  onClose: () => void;
}

const RegisterModal = ({ onClose }: RegisterModalProps) => {
  const {
    formData,
    error,
    showSuccessModal,
    setField,
    setError,
    setShowSuccessModal,
    handleSubmit,
  } = useRegister(onClose);

  return (
    <>
      {error && <ErrorModal message={error} onClose={() => setError("")} />}
      {showSuccessModal && (
        <SuccessModal message="Registrado con éxito" onClose={() => setShowSuccessModal(false)} />
      )}

      <RegisterModalLayout onClose={onClose}>
        <RegisterForm
          name={formData.name}
          email={formData.email}
          password={formData.password}
          repeatPassword={formData.repeatPassword}
          setName={(value: string) => setField('name', value)}
          setEmail={(value: string) => setField('email', value)}
          setPassword={(value: string) => setField('password', value)}
          setRepeatPassword={(value: string) => setField('repeatPassword', value)}
          handleSubmit={handleSubmit}
        />
      </RegisterModalLayout>
    </>
  );
};

export default RegisterModal;
