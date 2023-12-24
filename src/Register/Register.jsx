import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { ProviderContext } from "../../Provider/Provider";
// import { ProviderContext } from "../../provider/provider";
import Swal from 'sweetalert2';
import { Helmet } from "react-helmet";
import Lottie from "lottie-react";
// import LogReg from "./LogReg.json"
import RegisterAnim from "./RegisterAnim.json"
import { ProviderContext } from "../Provider/Provider";
import useAxiosPublic from "../hooks/useAxiosPublic";


const Register = () => {
    const axiosPublic = useAxiosPublic()
    const { createUser } = useContext(ProviderContext)
    const Navigate = useNavigate()
    const [regError, setRegError] = useState("")
    // console.log(createUser)

    const handleRegister = e => {
        e.preventDefault();
        const displayName = e.target.name.value;
        const photoURL = e.target.ImageURL.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password, displayName);
        // eslint-disable-next-line no-constant-condition
        if (!/^(?=.*[a-z])(?=.*[^A-Z0-9a-z]).{6,}$/.test(password)) {
            setRegError("Password must have at least six character, one capital letter and one special character")
        }
        else {
            createUser(email, password, displayName, photoURL)
                .then(result => {
                    console.log(result.user)
                    const userInfo = {
                        name: displayName,
                        email: email,
                        role: 'regular'
                    }
                    axiosPublic.post('/users', userInfo)
                        .then(res => {
                            if (res.data.insertedId) {
                                console.log('user added to the database')
                                e.target.reset();
                                Navigate("/")
                                Swal.fire(
                                    'Registration completed successfully by Email',
                                    "Enjoy our services don't forget to feedback",
                                    'success'
                                )
                            }
                        })

                })
                .catch(error => {
                    console.log("error: ", error);
                    setRegError(error.message);
                })
        }

    }

    return (
        <div className="min-h-screen">
            <Helmet>
                <title>ShareFood | Register
                </title>
            </Helmet>
            <div className="hero pt-[80px] pb-[100px]">
                <div className="hero-content flex">
                    <Lottie className="hidden lg:flex min-w-[400px]" animationData={RegisterAnim}></Lottie>
                    <div>
                        <div className="text-center lg:text-left mb-8">
                            <h1 className="text-5xl font-bold text-center">Register now!</h1>
                        </div>
                        <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
                            <form className="card-body w-[500px] py-[60px]" onSubmit={handleRegister}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" name="name" placeholder="Your name" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Image URL</span>
                                    </label>
                                    <input type="text" name="ImageURL" placeholder="URL" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" name="email" placeholder="Email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" name="password" placeholder="Password" className="input input-bordered" required />
                                    <label className="label">
                                        <p className="text-red-500">{regError}</p>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn  border-none font-bold bg-[#701a75] text-white hover:bg-base-300 hover:border-black hover:text-black">Register</button>
                                </div>
                                <p className="text-center">Already have an account? Please <Link to="/login"><button className="btn-link text-purple-700 font-bold uppercase">Login</button></Link></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;