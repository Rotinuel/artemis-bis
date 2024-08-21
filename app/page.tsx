import {Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button} from "@/components/ui/button"
import { LoginButton } from "@/components/auth/login-button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-400 to-blue-800">
      <div className="space-y-6 text-center">
        <h1 className={cn("text-6xl font-semibold text-white drop-shadow-md", font.className)}>🧭Artemis-Bis</h1>
        <p className="text-2xl text-white">A simple, fast and secure web3</p>
        <LoginButton>
          <Button variant="secondary" size="lg">Sign in</Button>
        </LoginButton>
      </div>
    </main>
  );
}
