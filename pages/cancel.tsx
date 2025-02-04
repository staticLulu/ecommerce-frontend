import { useEffect } from "react";
import { useRouter } from "next/router";

const CancelPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/cart");
  }, [router]);

  return null; // No UI, just redirects
};

export default CancelPage;
