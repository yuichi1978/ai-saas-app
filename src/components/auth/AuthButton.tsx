"use client";

import { SignInButton, SignUpButton, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default  function AuthButton() {
  const { userId } =  useAuth();

  if (userId) {
    return (
      <UserButton
        appearance={{
          elements: {
            avatarBox: "w-10 h-10",
          },
        }}
      />
    );
  }

  return (
    <div className="flex items-center gap-4">
      <SignInButton
        mode="modal"
        fallbackRedirectUrl={"/dashboard"}
        forceRedirectUrl={"/dashboard"}
      >
        <Button variant="outline">ログイン</Button>
      </SignInButton>
      <SignUpButton
        mode="modal"
        fallbackRedirectUrl={"/dashboard"}
        forceRedirectUrl={"/dashboard"}
      >
        <Button variant="default">新規登録</Button>
      </SignUpButton>
    </div>
  );
}
