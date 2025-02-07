import { ThemeProvider } from '@/contexts/ThemeContext';
import { Toaster } from '@/components/ui/toaster';
import { Layout } from '@/components/layout';
import { Routes } from '@/components/routes';
import { AuthProvider } from '@/contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="light">
        <Layout>
          <Routes />
        </Layout>
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
