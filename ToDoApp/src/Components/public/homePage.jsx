import { Link } from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion';

function Home() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        id="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}><img src="./src/assets/img/mobile.png" alt="mobile" /></div>
        <div id="information-box">
          <h2>Get things done with ToDoApp</h2>
          <p>Embark on a journey of productivity and organization with ToDoApp, your go-to platform for seamlessly
            managing tasks and getting things done. </p>
        </div>
        <Link to='/login' ><button type="button" id="get-started-btn" className='btn-design'>Get Started</button></Link>
      </motion.div>
    </AnimatePresence>
  );
}

export default Home;