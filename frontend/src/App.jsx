import './index.css';
import './App.css'
import CategorySelection from './components/CategorySelection';

function App() {
  return (
    <div className='text-center'>
      <h1 className='text-9xl'>Welcome to Hangman</h1>
      <CategorySelection />
    </div>
  )
}

export default App
