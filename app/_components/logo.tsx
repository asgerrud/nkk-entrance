import Image from "next/image";

export default function Logo() {
  return (
    <div>
      <Image
        className="mx-auto mb-5"
        src={`/nkk-logo.png`}
        alt="Nørrebro Klatreklub Logo"
        width="128"
        height="128"
      />
      <h3 className="text-4xl font-bold text-center">Nørrebro Klatreklub</h3>
    </div>
  );
}
