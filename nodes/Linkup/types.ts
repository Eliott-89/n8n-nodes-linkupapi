// Types pour une meilleure organisation
export interface LinkupCredentials {
  apiKey: string;
  email?: string;
  password?: string;
  country?: string;
  loginToken?: string;
}

export interface RequestBody {
  [key: string]: any;
}

// Centralisation des constantes
export const LINKUP_API_BASE_URL = "https://api.linkupapi.com/v1";
export const NODE_VERSION = "1.3.28"; 