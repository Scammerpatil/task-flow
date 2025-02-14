import Image from "next/image";
import Link from "next/link";

const pageNoFound = () => {
  return (
    <div className="w-full flex items-center justify-center flex-col">
      <Image src="/404.svg" width={500} height={500} alt="404" />

      <Link href="/" className="link`">
        Go back to Home
      </Link>
    </div>
  );
};

export default pageNoFound;
