import model from "../models/model.js";
const handleLogin = (req, res)=>
{
    const {email, password} = req.body;
    const user = model.findOne({email})
    .then((user)=>{
        if (user)
        {
            if (password === user.password)
            {
                console.log(`Sucessfully logged in as ${user.firstName}`)
                res.json({"status":"Login sucessful", "firstName":user.firstName, "lastName":user.lastName})
            }
            else
            {
                console.log("The password doesnot match")
                res.json("Invalid password")
            }
        }
        else
        {
            console.log(`No any user exist with that email and password`)
            res.json("No any user exist with that email")
        }
    })
}

export default handleLogin;