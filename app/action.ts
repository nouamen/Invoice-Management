"use server"

import prisma from "./lib/prisma"

export async function checkAndAddUser (name:string, email:string) {
    if(!email || !name) return 
    try {
        const existingUser = await prisma.user.findUnique({
            where : {
                email : email
            }
        })
        if(!existingUser){
            await prisma.user.create({
                data : {
                    email ,
                    name
                }
            })
        }
    } catch (error) {
        console.error(error)
    }
}