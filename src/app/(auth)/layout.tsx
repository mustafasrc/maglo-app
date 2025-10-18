import Image from "next/image";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="h-screen xl:min-h-screen">
        <div className="grid grid-cols-12 h-full">
          <div className="col-span-12 xl:col-span-7 h-full">
            <div className=" max-w-2xl mx-auto p-12 h-full">
              <div className="flex flex-col h-full">
                <div className="flex gap-x-2 items-center">
                  <div className="relative w-8 h-8">
                    <Image
                      src="/logo.png"
                      alt="Logo"
                      width={35}
                      height={35}
                      className="object-contain"
                    />
                  </div>

                  <h1 className="font-bold text-xl">Maglo.</h1>
                </div>

                <div className="flex flex-col gap-y-12 my-auto">
                  {children}
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 xl:col-span-5 hidden xl:block">
            <div className="relative h-screen w-full">
              <Image
                src="/image.jpg"
                alt="Description"
                fill
                className="object-cover"
              />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
