import { ApolloProvider } from '@apollo/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, Container } from 'react-bootstrap'

import './styles/theme/custom.scss'
import './styles/reset.scss'
import './lib/dayjs'
import './lib/yup'

import { Router } from './Routes'
import { client } from './lib/apollo'
import { AppProvider } from './contexts'
import { Navbar } from './components/Navbar'
import { Sidebar } from './components/Sidebar'

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ThemeProvider>
          <AppProvider>
            <Container fluid className="ps-0 pe-0">
              <Navbar />
              <Sidebar />
              <Container fluid="lg" className="pb-4 pt-2 ps-lg-5">
                <Router />
              </Container>
            </Container>
          </AppProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App
