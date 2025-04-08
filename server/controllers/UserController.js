import { Webhook } from 'svix'
import userModel from "../models/userModel.js"
import Razorpay from 'razorpay'
import transactionModel from '../models/transactionModel.js'

// Api controller function to manage clerk user with database
// http://localhost:4000/api/user/webhooks

const clerkWebhooks = async (req, res) => {
    try {

        // Create a svix instance with clerk webhook secret.
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })

        const { data, type } = req.body

        switch (type) {
            case "user.created": {
                const existingUser = await userModel.findOne({ email: data.email_addresses?.[0]?.email_address });

                if (existingUser) {
                    console.log("⚠️ User already exists, skipping insertion.");
                    return res.json({ message: "User already exists" });
                }

                const userData = {
                    clerkId: data.id,
                    email: data.email_addresses?.[0]?.email_address || "",
                    firstName: data.first_name || "",
                    lastName: data.last_name || "",
                    photo: data.image_url || ""
                }

                try {
                    await userModel.create(userData);
                    console.log("User successfully saved to DB:", userData);
                } catch (dbError) {
                    console.error("Error saving user:", dbError.message);
                }

                res.status(200).json({ success: true });

                break;
            }

            case "user.updated": {

                const userData = {
                    email: data.email_addresses?.[0]?.email_address || "",
                    firstName: data.first_name || "",
                    lastName: data.last_name || "",
                    photo: data.image_url || ""
                }

                await userModel.findOneAndUpdate({ clerkId: data.id }, userData)
                console.log("Userdata updated succesfully")
                res.status(200).json({ success: true });

                break;
            }

            case "user.deleted": {

                await userModel.findOneAndDelete({ clerkId: data.id })
                console.log("Userdata deleted succesfully")
                res.status(200).json({ success: true });

                break;
            }

            default:
                break;
        }

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

// get user available credits data
const userCredits = async (req, res) => {
    try {
        const { clerkId } = req.body
        const userData = await userModel.findOne({ clerkId })

        res.json({ success: true, credits: userData.creditBalance })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}




// gateway razorpay initialization
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

//Api to make payment for user credits
const paymentRazorpay = async (req, res) => {
    try {
        const { clerkId, planId } = req.body

        const userData = await userModel.findOne({ clerkId })

        if (!userData || !planId) {
            return res.json({ success: false, message: "Invalid Credentials" })
        }

        let credits, plan, amount, date
        switch (planId) {
            case 'Basic':
                plan = "Basic"
                credits = 100
                amount = 10
                break;

            case 'Advanced':
                plan = "Advanced"
                credits = 500
                amount = 50
                break;

            case 'Business':
                plan = "Business"
                credits = 5000
                amount = 250
                break;

            default:
                break;
        }
        date = Date.now()

        // creating transaction in database
        const transactionData = {
            clerkId,
            plan,
            amount,
            credits,
            date
        }

        const newTransaction = await transactionModel.create(transactionData)

        const options = {
            amount : amount * 100, // amount in smallest currency unit
            currency: process.env.CURRENCY,
            receipt: newTransaction._id
        }

        await razorpayInstance.orders.create(options, (error,order)=>{
            if(error){
                return res.json({success: false, message: error})
            }
            res.json({success: true, order,key: process.env.RAZORPAY_KEY_ID})
        })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

export { clerkWebhooks, userCredits, paymentRazorpay }