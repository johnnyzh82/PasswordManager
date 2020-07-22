const SUBSCRIPTION = "4bf7bf1e-c4c0-4104-9703-79def723015a";
const RESOURCE_GROUP = "CredManagement";

const KEY_VAULT_PROVIDER = "Microsoft.KeyVault/vaults";
const RESOURCE_API = "2019-09-01";

export const listKeyVaultUrl = () => {    
    return `https://management.azure.com/subscriptions/${SUBSCRIPTION}/resources?` + 
        encodeURIComponent(`$filter=resourceType eq '${KEY_VAULT_PROVIDER}'`) + `&api-version=${RESOURCE_API}`;
}

export const listKeyVault = async (accessToken) => {
    const url = listKeyVaultUrl();
    const response = await fetch(url, {        
        method: "GET",
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
    });
    return response.json();
}

