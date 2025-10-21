import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { User, Mail, Lock, Eye, EyeOff, Phone  } from 'lucide-react';
import { signUpSchema } from '../utils/validationSchema';
import { useBankStore } from '../store/useBankStore';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const login = useBankStore((state) => state.login);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            password: '',
        },
        validationSchema: signUpSchema,
        onSubmit: (values, { resetForm, setSubmitting }) => {
            // Save credentials to local storage for sign-in check
            const credentialsToSave = {
                name: values.name,
                email: values.email,
                phone: values.phone,
                password: values.password,
            };
            localStorage.setItem('signup-credentials', JSON.stringify(credentialsToSave));

            // Log user in via Zustand store
            login(values.email, values.name);

            // alert('Sign up successful! Welcome to the Dashboard!');
            resetForm();
            setSubmitting(false);

            // Navigate to Dashboard
            navigate('/');
        },
    });

    return (
        <div className='min-h-screen bg-gray-100 flex justify-center items-center p-4'>
            <div className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md'>
                <div className='text-center mb-6'>
                    <h2 className='text-3xl font-bold text-gray-800'>Sign Up</h2>
                </div>

                <form onSubmit={formik.handleSubmit} noValidate>

                    {/* Name Input */}
                    <div className='mb-4'>
                        <label htmlFor='name' className='flex items-center gap-2 text-gray-700 text-sm font-bold mb-2'>
                            <User size={18} /> Full Name
                        </label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${formik.touched.name && formik.errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                            {...formik.getFieldProps('name')}
                        />
                        {formik.touched.name && formik.errors.name ? (<p className='text-red-500 text-xs mt-1'>{formik.errors.name}</p>) : null}
                    </div>

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

                    {/* Phone Input */}
                    <div className='mb-4'>
                        <label htmlFor='phone' className='flex items-center gap-2 text-gray-700 text-sm font-bold mb-2'>
                            <Phone  size={18} /> Phone
                        </label>
                        <input
                            type='tel'
                            id='phone'
                            name='phone'
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${formik.touched.phone && formik.errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                            {...formik.getFieldProps('phone')}
                        />
                        {formik.touched.phone && formik.errors.phone ? (<p className='text-red-500 text-xs mt-1'>{formik.errors.email}</p>) : null}
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

                    <button
                        type='submit'
                        className='w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 disabled:bg-blue-300'
                        disabled={!formik.isValid || formik.isSubmitting}
                    >
                        Sign Up
                    </button>
                </form>

                <p className='text-center text-gray-600 text-sm mt-6'>
                    Already have an account?{' '}
                    <a onClick={() => navigate('/signin')} className='text-blue-600 hover:underline font-semibold cursor-pointer'>
                        Log In
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignUp;