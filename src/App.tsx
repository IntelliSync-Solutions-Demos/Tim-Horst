import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Layout } from '@/components/layout';
import { Routes } from '@/components/routes';
import { AuthProvider } from '@/contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="light" storageKey="tim-horst-ui-theme">
        <Layout>
          <Routes />
        </Layout>
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
