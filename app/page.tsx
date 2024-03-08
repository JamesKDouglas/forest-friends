import Logo from '@/app/ui/logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';
import { lusitana } from '@/app/ui/fonts'
import Image from 'next/image';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-green-700 p-4 md:h-52">
        <Logo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          
          <div className={styles.container}>
            <div className={styles.tree}>
              <div className={styles.treetriangle1}></div>
              <div className={styles.treetriangle2}></div>
              <div className={styles.treetriangle3}></div>
              <div className={styles.trunk}></div>
            </div>
          </div>

          <p className = { `${lusitana.className} text-2xl` }>
            <strong>Welcome to Forest Friends.</strong> Summer camp for forest fun!
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Go Inside</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
         
          <Image
            src="/LogoTree.png"
            width={200}
            height={200}
            className="hidden md:block"
            alt="Drawing of a tree. Trees are great, thanks trees!"
          />
        </div>
      </div>
    </main>
  );
}
