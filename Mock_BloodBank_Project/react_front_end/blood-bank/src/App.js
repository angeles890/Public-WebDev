import logo from './logo.svg';
import './App.css';
import { store } from './actions/store';
import  { Provider } from 'react-redux';
import DCanidates  from './components/DCanidates';
import DCanidatesForm from './components/DCanidatesForm';
import { Container } from '@material-ui/core';
import { ToastProvider } from 'react-toast-notifications';

function App() {
  return (
    <Provider store = {store}>      
      <ToastProvider autoDismiss={true}>
        <Container maxWidth="lg">
          <DCanidates />
        </Container>
      </ToastProvider>
    </Provider>
  );
}

export default App;
