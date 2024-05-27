// components/AddUserForm.tsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { User } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setData } from '../slices/usersSlice';

const phoneRegExp = /^[0-9]{11}$/;

const AddUserForm: React.FC = () => {
    const dispatch = useDispatch();
    const data = useSelector((state: RootState) => state.users.data);

    const formik = useFormik({
        initialValues: {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
        },
        validationSchema: Yup.object({
            id: Yup.number().required('Required'),
            firstName: Yup.string().matches(/^[A-Za-z]+$/, 'Must be only letters').required('Required'),
            lastName: Yup.string().matches(/^[A-Za-z]+$/, 'Must be only letters').required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid. It should contain 11 digits.').required('Required'),
        }),
        onSubmit: (values) => {
            const newUser: User = {
                id: parseInt(values.id, 10),
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                phone: values.phone,
                address: {
                    streetAddress: '',
                    city: '',
                    state: '',
                    zip: '',
                },
                description: '',
            };
            dispatch(setData([newUser, ...data]));
            formik.resetForm();
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
                <label htmlFor="id">ID</label>
                <input
                    id="id"
                    name="id"
                    type="text"
                    className={`form-control ${formik.touched.id && formik.errors.id ? 'is-invalid' : ''}`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.id}
                />
                {formik.touched.id && formik.errors.id ? (
                    <div className="invalid-feedback">{formik.errors.id}</div>
                ) : null}
            </div>

            <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    className={`form-control ${formik.touched.firstName && formik.errors.firstName ? 'is-invalid' : ''}`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                    <div className="invalid-feedback">{formik.errors.firstName}</div>
                ) : null}
            </div>

            <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    className={`form-control ${formik.touched.lastName && formik.errors.lastName ? 'is-invalid' : ''}`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                    <div className="invalid-feedback">{formik.errors.lastName}</div>
                ) : null}
            </div>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div className="invalid-feedback">{formik.errors.email}</div>
                ) : null}
            </div>

            <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                    id="phone"
                    name="phone"
                    type="text"
                    className={`form-control ${formik.touched.phone && formik.errors.phone ? 'is-invalid' : ''}`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                    placeholder="Enter phone number as 79999993366E"
                />
                {formik.touched.phone && formik.errors.phone ? (
                    <div className="invalid-feedback">{formik.errors.phone}</div>
                ) : null}
            </div>

            <button type="submit" className="btn btn-primary mt-2" disabled={!formik.isValid || formik.isSubmitting}>
                Add User
            </button>
        </form>
    );
};

export default AddUserForm;
