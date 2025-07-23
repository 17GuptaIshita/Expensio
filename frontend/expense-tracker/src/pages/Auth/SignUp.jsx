import React, { useState, useContext } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/Helper';
import ProfilePhotoSelector from '../../components/Inputs/profilPhotoSelector'; 
import axiosInstance from '../../utils/axiosInstance'; // Add this import
import API_PATHS from '../../utils/ApiPaths'; 
import { UserContext } from '../../context/UserContext';
import uploadImage from '../../utils/uploadImage';

const SignUp = () => {
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  // Handle SignUp Form Submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if(!fullName) {
      setError("Please enter your full name.");
      return;
    }
    if(!validateEmail(email)) { 
      setError("Please enter a valid email address.");
      return; 
    }
    if(!password) {
      setError("Please enter the password.");
      return;
    }
    setError(" ");

    //SIGNUP API call

    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl; // Assuming the response contains the image URL
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.SIGNUP, {
        fullName,
        email,
        password,
        profileImageURL: profileImageUrl,
      });
      const { token, user } = response.data;
      if (token) {
        updateUser({ ...user, hasPaid: user.hasPaid !== undefined ? user.hasPaid : false });
        localStorage.setItem("token", token);
        navigate("/dashboard");
      }
  }
  catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
      <AuthLayout>
        <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-12 mb-5">
            <div className="flex-1 w-full">
              <h3 className='text-xl font-semibold text-black'>Create your account</h3>
              <p className='text-xs text-slate-700 mt-[4px] mb-4'>Enter credentials to create your account</p>
            </div>
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          </div>
          <form onSubmit={handleSignUp}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <Input
                value={fullName}
                onChange={({ target }) => setFullName(target.value)}
                label="Full Name"
                placeholder="Ishita Gupta"
                type="text"
              />
              <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="ishita@example.com"
            type="text"
          />
          <div className='col-span-2'>
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Enter minimum 8 characters"
            type="password"
          />
        </div>
        </div>
        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button type="submit" className="btn-primary">SignUp</button>
          <p className="text-[13px] text-slate-800">
           Already have an account? {" "}
           <Link className="font-medium text-primary underline" to="/login">
           Login
           </Link>
         </p> 
        </form>
        </div>
      </AuthLayout>
  )
}
export default SignUp;
