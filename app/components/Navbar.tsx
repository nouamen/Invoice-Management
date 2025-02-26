"use client"
import { usePathname } from "next/navigation";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { Layers } from "lucide-react";
import { useEffect } from "react";
import { checkAndAddUser } from "../action";

const Navbar = () => {
  const pathname = usePathname()
  const {user} = useUser()
  const navLinks = [
    {
      href : "/",
      label : "facteurs"
    }
  ]
  const isActiveLink = (href:string) =>
    pathname.replace(/\/$/,"") === href.replace(/\/$/,"")
  const renderLinks = (classname:string) => {
    return navLinks.map(({href,label})=>{
      return <Link href={href} key={href} className={`btn btn-sm ${classname} ${isActiveLink(href) ? "btn-accent" : ""}`}>{label}</Link>
    })
  }
  useEffect(()=>{
    if(user?.primaryEmailAddress?.emailAddress && user.fullName){
        checkAndAddUser(user?.primaryEmailAddress?.emailAddress,user.fullName)
    }
  },[user])

  return (
    <div className="border-b border-base-300 px-5 md:px-[9%] py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-accent-content text-accent rounded-full p-2">
            <Layers />
          </div>
          <span className="ml-2 font-bold text-2xl italic">
            In<span className="text-accent">Voice</span>
          </span>
        </div>
        <div className="flex items-center space-x-4">
          {renderLinks("bv")}
          <UserButton />
        </div>
      </div>
      <div></div>
    </div>
  );
}


export default Navbar