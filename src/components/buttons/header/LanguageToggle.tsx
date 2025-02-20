"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts";


const LanguageToggle: React.FC = () => {
  const locale = useLocale() as "es" | "en";
  const router = useRouter();
  const pathname = usePathname();
  const { token, user} = useAuth();



  const changeLanguage = () => {
    const newLocale = locale === "es" ? "en" : "es";

    if(token)
    localStorage.setItem("authToken", token);
    localStorage.setItem("authUser", JSON.stringify(user));

    router.replace(`/${newLocale}${pathname.substring(3)}`);
  };

  return (
    <motion.button
      onClick={changeLanguage}
      className="px-2 py-1 bg-blue-500 text-white rounded-full flex items-center space-x-1"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {locale === "es" ? (
        <Image
          src="/Flag_of_Argentina.png"
          alt="Flag of Argentina"
          width={16}
          height={16}
        />
      ) : (
        <Image
          src="/Flag_of_usa.png"
          alt="Flag of United States"
          width={16}
          height={16}
        />
      )}
      <span className="ml-1 text-sm">{locale.toUpperCase()}</span>
    </motion.button>
  );
};

export default LanguageToggle;

