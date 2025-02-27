"use client"
import { Layers } from "lucide-react";
import Wrapper from "./components/Wrapper";
import { useEffect, useState } from "react";
import { createEmptyInvoice } from "./action";
import { useUser } from "@clerk/nextjs";
import confetti from "canvas-confetti";

export default function Home() {
  const [invoiceName,setInvoiceName] = useState("")
  const [isNameValid,setIsNameValid] = useState(true)
  const {user} = useUser()
  const email = user?.primaryEmailAddress?.emailAddress
  useEffect(()=>{
    setIsNameValid(invoiceName.length > 0 && invoiceName.length <= 60)
  },[invoiceName])
  const handleCreateInvoice = async () => {
    try {
      if(email){
        await createEmptyInvoice(email,invoiceName)
      }
      setInvoiceName("")
      const modal = document.getElementById("my_modal_3") as HTMLDialogElement
      modal.close()
      confetti({
        particleCount : 100,
        spread : 70,
        origin : {y:0.6},
        zIndex : 9999
      })
    } catch (error) {
      console.error("Error lors de la creation de la facture",error)
    }
  }
  return (
    <Wrapper>
      <div className="flex flex-col space-y-4">
        <h1 className="text-lg font-bold">Mes Factures</h1>

        <div className="grid md:grid-cols-3 gap-4">
          <button
            className="btn btn-md btn-accent"
            onClick={() => (document.getElementById("my_modal_3") as HTMLDialogElement).showModal()}
          >
            <div className="font-bold mr-2">
              Créer une facture
            </div>
            <div className="bg-accent-content text-accent rounded-full p-2">
              <Layers className="h-4 w-4" />
            </div>
          </button>
        </div>
        
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Nouvelle facture</h3>
            <input type="text" 
            placeholder="nom de la facture"
            className="input input-bordered w-full my-4"
            value={invoiceName}
            onChange={(e)=>setInvoiceName(e.target.value)}
            />
           {!isNameValid && <p className="mb-4 text-red-700 text-sm font-semibold">Le nom doit être compris entre 1 et 60 caractères</p>}
           <button
           className="btn btn-accent"
           disabled={!isNameValid}
           onClick={handleCreateInvoice}
           >Créer</button>
          </div>
        </dialog>
      </div>
      
    </Wrapper>
  );
}
