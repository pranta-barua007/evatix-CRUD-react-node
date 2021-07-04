import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { requestSignup } from '../redux/user/user.actions';

import Header from '../partials/Header';

function SignUp({ onSubmitSignup }) {
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [profession, setProfession] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (event) => {
      event.preventDefault();
      const result =  onSubmitSignup(name, birthdate, profession, email, password);
      console.log(result);
      clearForm();
  };

  const clearForm = () => {
      setName('');
      setBirthdate('');
      setEmail('');
      setPassword('');
  };
  
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">

        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Welcome. We exist to make entrepreneurism easier.</h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="name">Name <span className="text-red-600">*</span></label>
                      <input 
                      id="name" 
                      type="text" 
                      className="form-input w-full text-gray-800" 
                      placeholder="Enter your Full name" 
                      required 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="profession">Profession <span className="text-red-600">*</span></label>
                      <input 
                      id="profession" 
                      type="text" 
                      className="form-input w-full text-gray-800" 
                      placeholder="Profession" 
                      required 
                      value={profession}
                      onChange={(e) => setProfession(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">Email <span className="text-red-600">*</span></label>
                      <input 
                      id="email" 
                      type="email" 
                      className="form-input w-full text-gray-800" 
                      placeholder="Enter your email address" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="date">Birthdate <span className="text-red-600">*</span></label>
                      <input 
                        id="date"
                        type="date"
                        className="form-input w-full text-gray-800"
                        required 
                        onChange={(e) => setBirthdate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="password">Password <span className="text-red-600">*</span></label>
                      <input 
                      id="password" 
                      type="password" 
                      className="form-input w-full text-gray-800" 
                      placeholder="Enter your password" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} 
                    />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">Sign up</button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 text-center mt-3">
                    By creating an account, you agree to the <a className="underline" href="#0">terms & conditions</a>, and our <a className="underline" href="#0">privacy policy</a>.
                  </div>
                </form>
                <div className="flex items-center my-6">
                  <div className="border-t border-gray-300 flex-grow mr-3" aria-hidden="true"></div>
                  <div className="text-gray-600 italic">Or</div>
                  <div className="border-t border-gray-300 flex-grow ml-3" aria-hidden="true"></div>
                </div>
                <div className="text-gray-600 text-center mt-6">
                  Already using Simple? <Link to="/signin" className="text-blue-600 hover:underline transition duration-150 ease-in-out">Sign in</Link>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmitSignup: (name, birthdate, profession, email, password) => dispatch(requestSignup(name, birthdate, profession, email, password))
  }
};

export default connect(null, mapDispatchToProps)(SignUp);