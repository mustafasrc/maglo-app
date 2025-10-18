
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
                  <img src="/logo.png" alt="" />
                  <h1 className="font-bold text-xl">Maglo.</h1>
                </div>

                <div className="flex flex-col gap-y-12 my-auto">
                  {children}
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 xl:col-span-5 hidden xl:block">
            <img src="/image.jpg" className="h-screen w-full" />
          </div>
        </div>
      </div>
    </>
  );
}
