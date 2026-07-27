import { eq, sql } from "drizzle-orm";
import { db } from "../../db";
import { employees1,userDetails,users} from "../../db/schema/employee.schema";


export const getEmployees = async () => {
    const result=await db.select().from(employees1)
  return  result
};

export const addUsers=async(data:any)=>{
   const result = await db
    .insert(employees1)
    .values({
      name: data.name,
      email: data.email,
      price: data.price,             
      dilivered: data.is_delivered,
      description: data.description,
      barcode: data.barcode
    })
    .returning();


    
  return result 
}