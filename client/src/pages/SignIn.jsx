import React from 'react'
import { useState } from 'react'
import {Link , useNavigate} from 'react-router-dom'
import {Label, TextInput , Button, Alert , Spinner} from 'flowbite-react'
import { useDispatch , useSelector} from 'react-redux'
import { signInFailure,signInStart,signInSuccess } from '../redux/user/userSlice'
import OAuth from '../components/OAuth'
function SignIn() {
  
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const {loading , error:errorMessage} =  useSelector(state=>state.user);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  }
  const handleSubmit = async (e) =>{
    if( !formData.email || !formData.password){
      return dispatch(signInFailure('All fields are required'));
    }
    e.preventDefault();
    try{
      dispatch(signInStart());
      const res = await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success===false){
        dispatch(signInFailure(data.message));
      }
      if(res.ok){
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch(error){
      dispatch(signInFailure(error.message));
    };
  }
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 mx-auto max-w-3xl gap-5 flex-col md:flex-row md:items-center'>
        <div className='flex-1'>
          <Link to='/' className=' font-bold dark:text-white text-4xl flex-col md:flex-row md-items-center'>
              <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Nilesh's</span>
              Blog
          </Link>
          <p className='text-sm mt-5'>
              This is a demo project. You can Sign Up with your email and password or with Google
          </p>
        </div>
        <div className='flex-1'>
          <form action="" className='flex flex-col gap-4' onSubmit={handleSubmit}>
              
              <Label value='Your email'/>
              <TextInput
                type='email'
                placeholder='email'
                id='email'
                onChange={handleChange}
              />
              <Label value='Your password'/>
              <TextInput
                type='password'
                placeholder='password'
                id='password'
                onChange={handleChange}
              />  
              <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
                {
                  loading ? (
                    <>
                      <Spinner size='sm'/>
                      <span className='pl-3'>Loading...</span>
                    </>
                  ) : (
                    'Sign In'
                  )
                }
              </Button>
              <OAuth/>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Dont Have A Account ?</span>
            <Link to='/sign-up' className='text-blue-500'>
              Sign Up
            </Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default SignIn