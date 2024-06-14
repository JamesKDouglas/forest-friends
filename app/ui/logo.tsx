import { lusitana } from '@/app/ui/fonts';
import { FaTree } from "react-icons/fa6";

export default function Logo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <FaTree size={50} />

      <p className="text-[44px]">Forest Friends</p>
    </div>
  );
}
