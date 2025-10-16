import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { User, Mail, Lock } from 'lucide-react';

// 1. Define the validation schema with Yup
const signUpSchema = Yup.object({
    name: Yup.string()
        .min(3, 'Name must be at least 3 characters')
        .required('Full Name is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Must contain one uppercase, one lowercase, one number, and one special character'
        )
        .required('Password is required'),
});

const SignUp = () => {
    // 2. Initialize Formik with the useFormik hook
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: signUpSchema,
        onSubmit: (values, { resetForm }) => {
            console.log('Form Submitted:', values);

            // Save credentials to local storage
            localStorage.setItem('signup-credentials', JSON.stringify(values.email));
            resetForm();
            
        },
    });

    return (
        <div className='min-h-screen bg-gray-100 flex justify-center items-center p-4'>
            <div className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md'>
                <div className='text-center mb-6'>
                    <h2 className='text-3xl font-bold text-gray-800'>Create Account</h2>
                </div>

                {/* 3. Use formik.handleSubmit for the form's onSubmit event */}
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
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${formik.touched.name && formik.errors.name
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 focus:ring-blue-500'
                                }`}
                            // placeholder='John Doe'
                            // 4. Connect input fields to Formik
                            {...formik.getFieldProps('name')}
                        />
                        {/* 5. Display validation errors */}
                        {formik.touched.name && formik.errors.name ? (
                            <p className='text-red-500 text-xs mt-1'>{formik.errors.name}</p>
                        ) : null}
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
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${formik.touched.email && formik.errors.email
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 focus:ring-blue-500'
                                }`}
                            // placeholder='you@example.com'
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <p className='text-red-500 text-xs mt-1'>{formik.errors.email}</p>
                        ) : null}
                    </div>

                    {/* Password Input */}
                    <div className='mb-6'>
                        <label htmlFor='password' className='flex items-center gap-2 text-gray-700 text-sm font-bold mb-2'>
                            <Lock size={18} /> Password
                        </label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${formik.touched.password && formik.errors.password
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 focus:ring-blue-500'
                                }`}
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <p className='text-red-500 text-xs mt-1'>{formik.errors.password}</p>
                        ) : null}
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
                    <a href='#' className='text-blue-600 hover:underline font-semibold'>
                        Log In
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignUp;