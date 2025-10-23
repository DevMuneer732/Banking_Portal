import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useFormik } from 'formik';
import { signInSchema } from '../utils/validationSchema';
import { useBankStore } from '../store/useBankStore';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';

const SignIn = () => {
    const navigate = useNavigate();
    const login = useBankStore((state) => state.login);
    const [loginError, setLoginError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false)


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: signInSchema,
        onSubmit: (values, { resetForm, setSubmitting }) => {
            setLoginError('');

            const storedCredentialsString = localStorage.getItem('signup-credentials');

            if (storedCredentialsString) {
                const storedCredentials = JSON.parse(storedCredentialsString);

                if (values.email === storedCredentials.email && values.password === storedCredentials.password) {
                    // show loader, simulate short processing, then login + navigate
                    setLoading(true);
                    setTimeout(() => {
                        login(values.email, storedCredentials.name || 'John', storedCredentials.phone, storedCredentials.password);
                        toast.success('Successfully logged in');
                        setLoading(false);
                        setSubmitting(false);
                        navigate('/');
                    }, 1200);

                } else {
                    setLoginError('Invalid email or password. Please try again.');
                    toast.error(`Invalid Email or Password. Please try again.`)
                    setSubmitting(false);
                    resetForm()
                }
            } else {
                // No user found
                setLoginError('No user found. Please sign up first.');
                setSubmitting(false);
            }
        },
    });


    return (
        <div className='min-h-screen bg-gray-100 flex justify-center items-center p-4'>
            <LoadingSpinner active={loading || formik.isSubmitting} text="Signing in..." />
            <div className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md'>
                <div className='mb-6'>
                    <h2 className='text-3xl font-bold text-gray-800'>Sign In</h2>
                </div>

                {loginError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <span className="block sm:inline">{loginError}</span>
                    </div>
                )}

                <form onSubmit={formik.handleSubmit} noValidate>
                    {/* Email Input */}
                    <div className='mb-4'>
                        <label htmlFor='email' className='flex items-center gap-2 text-gray-700 text-sm font-bold mb-2'>
                            <Mail size={18} /> Email Address
                        </label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${formik.touched.email && formik.errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email ? (<p className='text-red-500 text-xs mt-1'>{formik.errors.email}</p>) : null}
                    </div>

                    {/* Password Input */}
                    <div className='mb-6'>
                        <label htmlFor='password' className='flex items-center gap-2 text-gray-700 text-sm font-bold mb-2'>
                            <Lock size={18} /> Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id='password'
                                name='password'
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 pr-10 ${formik.touched.password && formik.errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                                {...formik.getFieldProps('password')}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {formik.touched.password && formik.errors.password ? (<p className='text-red-500 text-xs mt-1'>{formik.errors.password}</p>) : null}
                    </div>

                    {/* Submit Button */}
                    <button
                        type='submit'
                        className='w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 disabled:bg-blue-300 cursor-pointer flex items-center justify-center'
                        disabled={!formik.isValid || formik.isSubmitting || loading}
                    >
                        {(loading || formik.isSubmitting) ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                </svg>
                                Signing in...
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                {/* Footer Link */}
                <p className='text-center text-gray-600 text-sm mt-6'>
                    Don't have an account?{' '}
                    <a onClick={() => navigate('/signup')} className='text-blue-600 hover:underline font-semibold cursor-pointer'>
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignIn;