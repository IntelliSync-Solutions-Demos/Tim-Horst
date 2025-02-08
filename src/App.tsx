import { ThemeProvider } from '@/contexts/ThemeContext';
import { Toaster as UIToaster } from '@/components/ui/toaster';
import { Toaster } from 'sonner';
import { Layout } from '@/components/layout';
import { Routes } from '@/components/routes';

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <Layout>
        <Routes />
      </Layout>
      <UIToaster />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
