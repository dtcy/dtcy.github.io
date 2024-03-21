"use client";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back(); // 이전 페이지로 이동
  };

  return <button onClick={handleGoBack}>Go Back</button>;
};

export default BackButton;
