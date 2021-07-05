import React, {useState, useEffect} from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser, selectUserIsPending } from '../redux/user/user.selectors';
import { requestProfileUpdate, requestProfileDelete } from '../redux/user/user.actions';

import Header from '../partials/Header';


function Profile({ userLoading, currentUser, onSubmitUpdateProfile, onSubmitDeleteProfile }) {
  const [profileEmail, setProfileEmail] = useState('');
  const [profileName, setProfileName] = useState('');
  const [profileProfession, setProfileProfession] = useState('');

  const loadUser = (userData) => {
    const {name, email, profession} = userData;
    setProfileEmail(email);
    setProfileName(name);
    setProfileProfession(profession);
  };
 
  
  useEffect(() => {
    if(userLoading) {
        return (<>'Loading'</>)
    }
    loadUser(currentUser);
  },[userLoading, currentUser]);


  const handleSubmit = (event) => {
      event.preventDefault();
      onSubmitUpdateProfile(currentUser.id, profileName, profileEmail, profileProfession);
  };

  const handleDeleteSubmit = (event) => {
    event.preventDefault();
    onSubmitDeleteProfile(currentUser.id);
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
                <h1 className="h1">Welcome back! 
                  <p>{profileName}</p> 
                  Update your profile here.</h1>
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
                            <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="profession">Profession <span className="text-red-600">*</span></label>
                            <input 
                              id="profession" 
                              type="text" 
                              className="form-input w-full text-gray-800" 
                              placeholder={profileProfession} 
                              required 
                              onChange={(event) => setProfileProfession(event.target.value)}
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

                <div className="flex items-center my-6">
                  <div className="border-t border-gray-300 flex-grow mr-3" aria-hidden="true"></div>
                  <div className="text-gray-600 italic">Or</div>
                  <div className="border-t border-gray-300 flex-grow ml-3" aria-hidden="true"></div>
                </div>
                <form onSubmit={handleDeleteSubmit}>
                  <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <div className="flex justify-between">
                          <label className="flex items-center">
                            <input 
                              type="checkbox" 
                              className="form-checkbox" 
                              required
                          />
                            <span className="text-gray-600 ml-2">I am no longer interested. Good bye!</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3">
                      <div className="w-full px-3">
                        <button className="btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center">
                          <span className="flex-auto pl-16 pr-8 -ml-16">Delete Account</span>
                        </button>
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
    onSubmitUpdateProfile: (id, name, email, profession) => dispatch(requestProfileUpdate(id, name, email, profession)),
    onSubmitDeleteProfile: (id) => dispatch(requestProfileDelete(id))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);