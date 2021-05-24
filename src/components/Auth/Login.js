import React, { useState } from 'react';

// ROUTING
import { useHistory, Link } from 'react-router-dom';

// FORMS
import { appendErrors, useForm } from "react-hook-form";

// TOAST
import cogoToast from 'cogo-toast';

// IMAGES
import { ReactComponent as LoadingSpinner } from '../../img/LoadingSpinner.svg';

// COMPONENTS
// import CustomConfirmation from './CustomConfirmation';
// import CustomResetPassword from './CustomResetPassword';

// ----------------------------------------------------------------------------------
// ------------------------------------ LOGIN ---------------------------------------
// ----------------------------------------------------------------------------------

const Login = () => {
  // State
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [screen, setScreen] = useState('signin');
  const [password, setPassword] = useState();
  const [email, setEmail] = useState()
  const [confirmFromSignup, setConfirmFromSignup] = useState(false);
  const [input, setInput] = useState({
    username: '',
    password: ''
  })

  // React Router
  const history = useHistory();

  // Function to handle submitting Login form
  const onSubmit = async (data) => {
    setSubmitting(true);

    // console.log(data.username.toLowerCase().replace(/ /g, ""))
    console.log(data)

    // await Auth.signIn(data.username, data.password)
    //   .then(() => {
    //     setSubmitting(false);
    //     cogoToast.success('Successfully logged in', {
    //       hideAfter: 3,
    //     });
    //     history.push('/dashboard')
    //   })
    //   .catch(err => {
    //     if (err.message === 'User is not confirmed.') {
    //       setSubmitting(false);
    //       setPassword(data.password)
    //       setEmail(data.username)
    //       setScreen('code');
    //       cogoToast.warn(err.message + ' Please confirm your account.', {
    //         hideAfter: 5,
    //       });
    //       console.log(err)
    //     } else {
    //       setSubmitting(false);
    //       cogoToast.error(err.message, {
    //         hideAfter: 3,
    //       });
    //       console.log(err)
    //     }
    //   })
  };

  // Helper function to change screens from children
  let changeScreen = (screenName) => {
    setScreen(screenName);
  }

  return (
    <div className="flex items-center justify-center">
      {screen === 'signin' ? (
        <form className="p-10 bg-taterpurple rounded-lg text-white" onSubmit={handleSubmit(onSubmit)}>
          <h4 className='text-2xl mb-4'>Sign in to your account</h4>
          <div className="form-group">
            <label className='mr-3'>Email address</label>
            {errors.username && (
              <span className='text-red-500'>{errors.username.message}</span>
            )}
            <input
              name='username'
              type='username'
              placeholder='Enter your username'
              className='form-control text-black w-full flex items-center mb-7 mt-3 p-2 rounded-md text-lg'
              {...register('username', {
                required: 'Required field',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "(Invalid email address)"
                }
              })}
            />

          </div>
          <div className="form-group">
            <label className='mr-3'>Password</label>
            {errors.password && (
              <span className='text-red-500'>{errors.password.message}</span>
            )}
            <input
              name='password'
              type='password'
              placeholder='Enter your password'
              className='form-control text-black w-full flex items-center mb-3 mt-3 p-2 rounded-md text-lg'
              {...register('password', {
                required: 'Required field'
              })} />
          </div>
          <div className='mb-9'>
            <p>Forgot your password?
                <span
                className='ml-1 cursor-pointer text-logintext hover:text-purplebutton focus:outline-none'
                onClick={() => setScreen('resetpassword')}
              >
                Reset password
                </span>
            </p>
          </div>
          <div className='flex'>
            <div className='mr-20 flex items-center text-xl'>
              <p>No account?
                  <span className='ml-1'>
                  <Link
                    to='/signup'
                    className='text-logintext hover:text-purplebutton focus:outline-none'
                  >
                    Create account
					          </Link>
                </span>
              </p>
            </div>
            <button
              type="submit"
              className={`${submitting && 'opacity-50 pointer-events-none'
                } flex items-center rounded-lg text-lg px-12 py-3 text-center font-medium bg-purplebutton hover:bg-white hover:text-purplebutton focus:ring transition duration-150 ease-in-out`}>
              {submitting && (
                <LoadingSpinner />
              )}
              SIGN IN
              </button>
          </div>
        </form>

      ) : screen === 'code' ? (
        // <CustomConfirmation password={password} email={email} confirmFromSignup={confirmFromSignup} changeScreen={changeScreen} />
        <p>hello</p>
      ) : screen === 'resetpassword' ? (
        // <CustomResetPassword changeScreen={changeScreen} />
        <p>hello</p>
      ) : null}
    </div >
  );
}

export default Login;