import { Router } from "express";
const router=Router()
import * as controllers from "../controllers/userRegister"

router.get('/health',(req,res)=>{
    return res.send('your healthy')
})
router.get('/get-user',controllers.get_user)
router.post('/add-users',controllers.add_user)

export default router