import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
  });

  const { name, email, passwordOne, passwordTwo } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();
    if (passwordOne !== passwordTwo) {
      //console.log("Passwords don't match");
      setAlert('Passwords do not match', 'danger');
    } else {
      //console.log(formData);
      register({ name, email, password: passwordOne });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/journals' />;
  }

  return (
    <>
      {' '}
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
            //required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            //required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='passwordOne'
            minLength='6'
            value={passwordOne}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='passwordTwo'
            value={passwordTwo}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account?
        <Link to='/login'> Sign In</Link>
      </p>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
