"use server"

import { randomBytes } from "crypto"
import prisma from "./lib/prisma"

export async function checkAndAddUser (email:string, name:string) {
    if(!email || !name) return 
    try {
        await prisma.user.upsert({
            where : {email},
            update : {},
            create : {
                email ,
                name
            }
        })
    } catch (error) {
        console.error(error)
    }
}
const generateUniqueId = async (): Promise<string> => {
    while(true){
        const uniqueId = randomBytes(3).toString("hex")
        const existingInvoice = await prisma.invoice.findUnique({
            where: {
                id : uniqueId
            }
        })
        if(!existingInvoice) return uniqueId
    }

   
}
export async function createEmptyInvoice(email:string, name:string) {
    try {
        const user = await prisma.user.findUnique({
            where : {
                email:email
            }
        })
        if(!user) return 
        const uniqueId = await generateUniqueId()
        await prisma.invoice.create({
            data : {
                id : uniqueId,
                name,
                userId : user.id
            }
        })
    } catch (error) {
        console.error(error)
    }
}