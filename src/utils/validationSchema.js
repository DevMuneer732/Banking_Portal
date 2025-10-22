import * as Yup from 'yup';

export const signInSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required'),
});

export const signUpSchema = Yup.object({
    name: Yup.string()
        .min(3, 'Name must be at least 3 characters')
        .required('Full Name is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    phone: Yup.string()
        .required("Phone number is required"),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Must contain one uppercase, one lowercase, one number, and one special character'
        )
        .required('Password is required'),
});