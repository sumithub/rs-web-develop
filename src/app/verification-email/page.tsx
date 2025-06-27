import { Suspense } from "react";
import VerificationEmailClient from "../../components/VerificationEmailClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerificationEmailClient />
    </Suspense>
  );
}
