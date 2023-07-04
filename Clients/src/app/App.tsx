import { QueryClientProvider, QueryClient } from 'react-query';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo/client';
import Home from '../pages/Home';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

const queryClient = new QueryClient();

function App() {

  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Home />
        </ThemeProvider>
      </QueryClientProvider>
    </ApolloProvider>
  );
}

export default App;
