const baseURL = 'api/';

export default {
    // getUsers() {
    //     return fetch(baseURL)
    //     .then(res => res.json());
    // },

    addUser(user) {
        return fetch(baseURL + "register", {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json());
    },

    loginUser(user) {
        return fetch(baseURL + "login", {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json());
    },

    updateUser(user) {
        return fetch(baseURL + "me/update", {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json());
    },

    deleteUser(id) {
        return fetch(baseURL + "me/delete", {
            method: 'DELETE'
        });
    }
};
