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

export {
    httpSignin,
    httpSignup
};