interface AuthConfig {
  adminCredentials: {
    username: string;
    password: string;
  };
  isDevelopment: boolean;
}

const developmentConfig: AuthConfig = {
  adminCredentials: {
    username: 'admin',
    password: 'admin123'
  },
  isDevelopment: true
};

const getEnvVar = (key: string): string => {
  const value = import.meta.env[key];
  if (!value) {
    console.warn(`Environment variable ${key} is not defined or empty`);
    return '';
  }
  if (typeof value === 'string' && value.startsWith('${')) {
    console.warn(`Environment variable ${key} appears to be unprocessed: ${value}`);
    return '';
  }
  return value;
};

const productionConfig: AuthConfig = {
  adminCredentials: {
    username: getEnvVar('VITE_ADMIN_USERNAME'),
    password: getEnvVar('VITE_ADMIN_PASSWORD')
  },
  isDevelopment: false
};

export const authConfig: AuthConfig = 
  import.meta.env.DEV ? developmentConfig : productionConfig;

// Helper function to validate credentials
export function validateCredentials(): void {
  const { username, password } = authConfig.adminCredentials;
  
  console.log('Environment Variables Status:', {
    VITE_ADMIN_USERNAME: getEnvVar('VITE_ADMIN_USERNAME'),
    VITE_ADMIN_PASSWORD: getEnvVar('VITE_ADMIN_PASSWORD') ? '[SET]' : '[NOT SET]',
    mode: import.meta.env.MODE,
    isDev: import.meta.env.DEV
  });

  if (!authConfig.isDevelopment) {
    if (!username || !password) {
      console.error('Production environment detected but admin credentials are not configured.');
      console.error('Please set VITE_ADMIN_USERNAME and VITE_ADMIN_PASSWORD in your environment variables.');
    }
  }
}
