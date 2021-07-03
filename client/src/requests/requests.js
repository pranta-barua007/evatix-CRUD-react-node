const API_URL = 'http://localhost:8000';

// Signin 
async function httpSigin(email, password) {
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

export {
    httpSigin
};