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

const productionConfig: AuthConfig = {
  adminCredentials: {
    username: import.meta.env.VITE_ADMIN_USERNAME || '',
    password: import.meta.env.VITE_ADMIN_PASSWORD || ''
  },
  isDevelopment: false
};

export const authConfig: AuthConfig = 
  import.meta.env.DEV ? developmentConfig : productionConfig;

// Helper function to validate credentials
export function validateCredentials(): void {
  if (!authConfig.isDevelopment) {
    if (!authConfig.adminCredentials.username || !authConfig.adminCredentials.password) {
      console.error('Production environment detected but admin credentials are not configured.');
      console.error('Please set VITE_ADMIN_USERNAME and VITE_ADMIN_PASSWORD in your environment variables.');
    }
  }
}
