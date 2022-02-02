const { REACT_APP_API_URL, REACT_APP_AUTH } = process.env;


export function categoryURI(categoryName) {
}

export function setRole(roles) {
    if (roles.some(e => e.authority === 'ROLE_ADMIN')) {
        return 'Project lord'
    } else if (roles.some(e => e.authority === 'ROLE_SUPER_USER')) {
        return 'Project manager'
    } else if (roles.some(e => e.authority === 'ROLE_USER')) {
        return 'Project fanatic';
    } else {
        return 'whatwhat?'
    }
}