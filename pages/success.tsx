import { useEffect } from "react";
import { useRouter } from "next/router";

const SuccessPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return null; // No UI, just redirects
};

export default SuccessPage;
