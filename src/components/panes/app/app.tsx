import './app.scss';
import Calculator from '../calculator/calculator';
import Toolkit from '../toolkit/toolkit';


function App() {
  return (
    <div className='app'>
      <Toolkit />
      <Calculator />
    </div>
  );
}

export default App;
