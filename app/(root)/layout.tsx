import MobileNavbar from "@/components/MobileNavbar";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = {
    $id: "1",
    email: "email@gmail.com",
    userId: "userId",
    dwollaCustomerUrl: "",
    dwollaCustomerId: "",
    firstName: "Alberto",
    lastName: "Tao",
    address1: "",
    city: "",
    state: "",
    postalCode: "",
    dateOfBirth: "",
    ssn: "",
  }
  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar user={loggedIn}/>
      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image src="./icons/logo.svg" width={30} height={30} alt="Horizon Logo"/>
          <div>
            <MobileNavbar user={loggedIn}/>
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}