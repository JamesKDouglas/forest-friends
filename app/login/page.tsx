import Logo from '@/app/ui/logo';
import LoginForm from '@/app/ui/login/login-form';
import { Metadata } from 'next';
import SignupButton from '@/app/ui/login/signup-button';

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-green-700 p-3 md:h-36">
            <Logo />
        </div>
        <LoginForm />
      </div>
    </main>
  );
}