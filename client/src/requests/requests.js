const API_URL = 'http://localhost:8000';

// Signin 
async function httpSignin(email, password) {
    const response = await fetch(`${API_URL}/signin`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password
            })
        }
    );
    return await response.json();
};

// Register 
async function httpSignup(name, birthdate, email, password) {
    const response = await fetch(`${API_URL}/register`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: name,
                birthdate: birthdate,
                email: email,
                password: password
            })
        }
    );
    return await response.json();
};

// Update Profile 
async function httpUpdateProfile(id, name, email) {
    const response = await fetch(`${API_URL}/profile/${id}`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: name,
                email: email,
            })
        }
    );
    return await response.json();
};

export {
    httpSignin,
    httpSignup,
    httpUpdateProfile
};