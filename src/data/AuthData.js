import { UserAgentApplication } from "msal";

const LOGIN_ROOT = "https://login.microsoftonline.com";
const CLIENT_ID = "ff8c62b9-a935-4bb9-b6fe-c7457e9aa3a7";
const TENANT_ID = "fea70d2f-da63-4bc4-9543-2a3f68c59c04";
const REDIRECT_URL = "http://localhost:3000";

/**
 * Enum of user login status
 */
export const LOGIN_STATUS = {
    NOT_LOGIN: 0,
    IN_PROGRESS: 1,
    LOGIN_SUCCESS: 2,
    LOGIN_ERROR: 3,
};

/**
 * API permission scope section
 */
export const LOGIN_SCOPES = [ "openid","profile","user.read" ];
export const ARM_SCOPES = [ "https://management.azure.com/user_impersonation" ];

/**
 * Instantiate msal instance
 */
export const msalInstance = new UserAgentApplication({
    auth:{
        clientId: CLIENT_ID,
        authority: `${LOGIN_ROOT}/${TENANT_ID}`,
        validateAuthority: true,
        postLogoutRedirectUri: REDIRECT_URL,
        navigateToLoginRequestUrl:true
    },
    cache:{
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false 
    }
});

/**
 * Login user to establish the user context
 * @param {string[]} scope 
 */
export const loginPopup = (scope) => {
    return msalInstance.loginPopup(scope);
}

/**
 * Make a silent request to get the access token
 * @param {string[]} scope 
 */
export const acquireToken = (scope) => {
    try {
        return msalInstance.acquireTokenSilent({
            scopes: scope
        });
    }
    catch (err) {
        if (err.name === "InteractionRequiredAuthError") {
            return msalInstance.acquireTokenPopup(scope);
        }
    }
}
