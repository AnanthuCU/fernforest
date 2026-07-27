import { Request,Response } from "express";
import * as logic from '../modules/employee/employee.service'
import logger from "../utils/logger";

export const get_user=async(req:Request,res:Response)=>{
  try {
console.log("from main");

    
    
     const result=await logic.getEmployees()
    return res.status(200).json({
        success:true,
        data:result
    })
    
  } catch (err:any) {
    res.status(400).json({ message: err.message });
  }
 
}
export const add_user=async(req:Request,res:Response)=>{
try {
  console.log("hhhhhhhhhhh");
  
  const body=req.body
  logger.info(JSON.stringify(body))
  logger.info("lalal")
  const result=await logic.addUsers(body)
     return res.status(200).json({
        success:true,
        message:"data added successfully",
        data:result
    })
  
  
} catch (err:any) {
 return res.status(500).json({
  success:false,
  message:err.message
 })
  
}
}

