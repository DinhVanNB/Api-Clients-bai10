import {HashRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Add from './components/Add';
import Edit from './components/Edit';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/edit/:userId' element={<Edit/>}/>
        <Route path='/edit/:userId/:articleId' element={<Edit/>}/>
        <Route path='/add' element={<Add/>}/>
        <Route path='/add/:userId' element={<Add/>}/>
      </Routes>
    </HashRouter>
  );
}

export default App;
