import express from 'express'
import { clerkWebhooks, paymentRazorpay, userCredits } from '../controllers/UserController.js'
import authUser from '../middlewares/auth.js'

const userRouter = express.Router()

userRouter.post('/webhooks', clerkWebhooks)
userRouter.get('/credits', authUser, userCredits)
userRouter.post('/pay-razor', authUser, paymentRazorpay)

export default userRouter