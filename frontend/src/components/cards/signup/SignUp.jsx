import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../../input/Input';
import { MdOutlineAlternateEmail } from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import { registerApi } from '../../../services/Auth';

const SignUpCard = ({ updateState, className,...divProps }) => {

  const [userData, setUserData] = useState({});
  const [isWorking, setIsWorking] = useState(false);
  const [errorFields, setErrorFields] = useState({});

  const navigate = useNavigate();

  const setFormDataOnChange = (key, value) => {
    setUserData({ ...userData, [key]: value });
  };
  
  function isStringEmpty(text) {
    if (text === undefined || text === null) {
      return true
    }  
    return /^\s*$/.test(text)
  }

  const checkDataFields = (data) => {
    setErrorFields({});    
    for (const key in data) {
      if (key === 'conf_password') {
        if (isStringEmpty(data[key])) {
          setErrorFields({ ...errorFields, [key]: { error: true, message: `This field is required!` } }); 
          return true
        } else if ( data[key] !== data['password'] ) {
          setErrorFields({ ...errorFields, [key]: { error: true, message: `Password didn't Matched!` } });
          return true
        }
      }
      else if (isStringEmpty(data[key])) {
        setErrorFields({ ...errorFields, [key]: { error: true, message: `This field is required!` } }); 
        return true
      }
    }
    return false
  }

  const performRegister = () => {
    setIsWorking(true);
    const inValidData = checkDataFields(userData)
    if (inValidData) {
      setIsWorking(false)
      return
    }

    registerApi(userData)
      .then((response) => {
        setIsWorking(false);
        updateState('login');
      })
      .catch((error) => {
        console.log(error);
        setIsWorking(false);
      });
  };


  return (
    <div
      {...divProps}
      className={`w-full max-w-sm text-left bg-white rounded-lg sm:py-6 md:py-8 ${className}`}
    >
      <div className="flex flex-col space-y-4">
        <h5 className="text-xl font-medium text-gray-900">Create Account!</h5>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">First Name</label>
          <Input 
            type="text" 
            name="fullname" 
            placeholder="Full Name" 
            required={true} 
            updateData={setFormDataOnChange} 
          />
          {errorFields?.fullname?.error ? (
            <small className="text-red-600 font-medium mt-1 text-xs">
              {errorFields?.fullname.message}
            </small>
          ) : (
            <></>
          )}          
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Your Email</label>
          <Input 
            icon={<MdOutlineAlternateEmail className='w-5 h-5' />}
            type="email" 
            name="email" 
            placeholder="example@email.com" 
            required={true} 
            updateData={setFormDataOnChange} 
          />
          {errorFields?.email?.error ? (
            <small className="text-red-600 font-medium mt-1 text-xs">
              {errorFields?.email.message}
            </small>
          ) : (
            <></>
          )}
        </div>
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
            <Input type="password" name="password" placeholder='Enter your password' required={true} updateData={setFormDataOnChange} />
            {errorFields?.password?.error ? (
              <small className="text-red-600 font-medium mt-1 text-xs">
                {errorFields?.password.message}
              </small>
            ) : (
              <></>
            )}
        </div>
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
            <Input type="password" name="conf_password" placeholder='Enter your password' required={true} updateData={setFormDataOnChange} />
            {errorFields?.conf_password?.error ? (
              <small className="text-red-600 font-medium mt-1 text-xs">
                {errorFields?.conf_password.message}
              </small>
            ) : (
              <></>
            )}
        </div>
        <div className=''>
          <button 
            type="submit"
            className="w-full flex justify-center text-white bg-indigo-600 hover:bg-indigo-600 focus:ring-indigo-300 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={() => performRegister()}
          >
            {isWorking ? (
              <>
                <div role="status">
                  <svg
                    className="inline -mt-1 mr-2 w-4 h-4 text-gray-200 animate-spin fill-white"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
                <span>Please wait...</span>
              </>
            ) : (
              <span>Register</span>
            )}            
          </button>
          <div className="text-sm font-medium text-gray-500 mt-4">
              Already Have account? <span onClick={() => updateState('login')} className="text-indigo-700 hover:underline cursor-pointer">Login</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpCard;

SignUpCard.defaultProps = {};

SignUpCard.propTypes = {
  updateState: PropTypes.func,
  className: PropTypes.string
};
