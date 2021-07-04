import React, {useState, useEffect} from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser, selectUserIsPending } from '../redux/user/user.selectors';
import { requestProfileUpdate } from '../redux/user/user.actions';

import Header from '../partials/Header';


function Profile({ userLoading, currentUser, onSubmitUpdateProfile }) {
  const [profileEmail, setProfileEmail] = useState('');
  const [profileName, setProfileName] = useState('');

  const loadUser = (userData) => {
    const {name, email} = userData;
    setProfileEmail(email);
    setProfileName(name);
  };
 
  
  useEffect(() => {
    if(userLoading) {
        return (<>'Loading'</>)
    }
    loadUser(currentUser);
  },[userLoading, currentUser]);


  const handleSubmit = (event) => {
      event.preventDefault();
      onSubmitUpdateProfile(currentUser.id, profileName, profileEmail);
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
                <h1 className="h1">Welcome back {profileName}. You can Update your profile here.</h1>
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
                              placeholder={profileName} 
                              required 
                              onChange={(event) => setProfileName(event.target.value)}
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
                        placeholder={profileEmail} 
                        required 
                        onChange={(event) => setProfileEmail(event.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label className="flex items-center">
                          <input 
                            type="checkbox" 
                            className="form-checkbox" 
                            required
                        />
                          <span className="text-gray-600 ml-2">Commit changes</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">Update Profile</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

      </main>

    </div>
  );
};

const mapStateToProps = createStructuredSelector(
    {
        currentUser: selectCurrentUser,
        userLoading: selectUserIsPending
    }
);

const mapDispatchToProps = dispatch => {
  return {
    onSubmitUpdateProfile: (id, email, password) => dispatch(requestProfileUpdate(id, email, password))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);