import { BrowserRouter } from "react-router-dom";
import Navbar from "./Commponents/Navbar/Navbar";
import Admin from "./Pages/Admin/Admin";
import Footer from "./Commponents/Footer/Footer";



function App() {
  return (

      <>
        <Navbar />
        <Admin />
        <Footer />
        
        
      </>

  );
}

export default App;