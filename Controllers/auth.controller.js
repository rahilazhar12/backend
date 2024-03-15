const Userschema = require('../Models/Users.model')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')


const UserRegistration = async (req, res) => {
    try {
        const { firstname, lastname, position, email, password, role, } = req.body;

        if (!firstname || !lastname || !position || !email || !password) {
            return res.status(400).send({ message: "Please fill all the fields." });
        }

        // Check existing email 
        const checkUser = await Userschema.findOne({ email });
        if (checkUser) {
            return res.status(400).send({ message: "User already exists." });
        }

        const hashed = await bcrypt.hash(password, 10);
        const newUser = new Userschema({
            firstname,
            lastname,
            position,
            email,
            password: hashed,
            role
        });

        if (req.file) {
            // If file is uploaded, save file path in profilePicture field
            newUser.profilePicture = req.file.path;
        }

        const result = await newUser.save();
        if (result) {
            return res.status(201).send({ message: "User registered successfully", role, email });
        }

    } catch (error) {
        console.error("Registration Error:", error);
        return res.status(500).send({ message: "Failed to register user." });
    }
};

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Userschema.findOne({ email });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        // generateTokenAndSetCookie(user._id, user.name, res);
        const token = JWT.sign({ id: user._id, role: user.role, name: user.name }, process.env.JWT_Key, { expiresIn: '7d' });

        res.status(200).json({
            Message: "Login Success",
            _id: user._id,
            username: user.name,
            email: user.email,
            token: token,
            role: user.role,
            Picture: user.profilePicture

        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const Getdata = async (req, res) => {
    const data = await Userschema.find()

    if (data.length > 0) {
        return res.status(200).send(data)
    } else {
        return res.status(400).send({ Messgae: "No user found" })
    }
}


const getoneuser = async (req, res) => {
    const id = req.params.id;

    const getuser = await Userschema.findById(id)

    if (getuser) {
        return res.send(getuser)
    } else {
        return res.send({ Message: "user not found" })
    }
}


const Edituser = async (req, res) => {
    const id = req.params.id;
    const userdata = req.body


    try {
        const updateuser = await Userschema.findByIdAndUpdate(id, userdata, {
            new: true,
        })

        if (updateuser) {
            return res.send({ message: "success", updateuser })
        } else {
            return res.send({ Message: "No user found " })
        }
    } catch (error) {

    }
}


const Deleteuser = async (req, res) => {
    const id = req.params.id; // Corrected the extraction of id

    const checkId = await Userschema.findOne({ _id: id });

    if (!checkId) {
        return res.send({ Message: "No User Available" });
    }

    const deleteUserId = await Userschema.findByIdAndDelete(id);

    if (deleteUserId) {
        return res.send({ Message: "User deleted" });
    } else {
        return res.send({ Message: "User delete failed" });
    }
}





module.exports = { UserRegistration, Login, Getdata, Edituser, getoneuser , Deleteuser }
