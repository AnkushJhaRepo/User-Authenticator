import React, { Suspense } from "react";
import VerifyEmailClient from "./verifyEmailClient";

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
            <VerifyEmailClient />
        </Suspense>
    );
}
