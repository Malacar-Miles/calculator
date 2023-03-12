import './app.scss';
import Calculator from '../calculator/calculator';
import Toolkit from '../toolkit/toolkit';
import ModeSwitch from '../mode-switch/mode-switch';


function App() {
  return (
    <div className='app-pane'>
      <ModeSwitch />
      <Toolkit />
      <Calculator />
    </div>
  );
}

export default App;
