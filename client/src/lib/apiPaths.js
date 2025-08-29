export const API_PATHS ={
    AUTH:{
        LOGIN:`/auth/login`,
        SIGN_UP:`/auth/signup`,
        CHECK_AUTH:`/auth/check-auth`,
        LOGOUT:`/auth/logout`,
        UPDATE_PROFILE:`/auth/update-profile`,
    },
    MESSAGES:{
        GET_USERS:`/messages/users`,
        GET_MESSAGES:(id)=>`/messages/${id}`,
        SEND_MESSAGE:(id)=>`/messages/send/${id}`,
    }
    
}