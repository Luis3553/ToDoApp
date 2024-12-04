import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/accounts';
import { AuthContext } from '../../Memory/Auth';
import { AnimatePresence, motion } from 'framer-motion';

function LoginPage() {
    const [, setToken] = useContext(AuthContext);

    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const { email, password } = values;

    const onChange = (e) => {
        setValues({
            ...values,
            [e.target.id]: e.target.value
        });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const request = await login({ email: email, password: password });
            setToken({ type: 'place', token: request.token });
            navigate('/dashboard');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <AnimatePresence mode='wait'>
            <motion.div
                id='login-page'
                initial={{ x: "-420px", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-420px", opacity: 0 }}
                transition={{ type: "spring", duration: 0.2 }}
            >
                <div id="title-sign-in-page-box">
                    <h2>Welcome Back!</h2>
                </div>
                <div id="img-box">
                    <img id="manwithphoneimg" src="./src/assets/img/undraw_access_account_re_8spm 1.png" alt="" />
                </div>
                <form id="sing-in-form" onSubmit={onSubmit}>
                    <label className="input-title" htmlFor="emailSignIn">Email</label>
                    <input
                        type="email"
                        id="email"
                        onChange={onChange}
                        className='input-design'
                        placeholder="leny.lopez@mail.com"
                        value={email} />
                    <label className="input-title" htmlFor="passwordSignIn">Password</label>
                    <input
                        type="password"
                        id="password"
                        onChange={onChange}
                        className='input-design'
                        placeholder="****************"
                        value={password} />
                    <p id="forgot-psswd" onClick={() => alert('This function is not available yet.')}>Forgot Password?</p>
                    <button type="submit" id="btn-signin" className='btn-design'>Login</button>
                    <p className='opts' id="mb-1">Don't have an account? <span><Link to="/register" style={{ color: '#62D2C3', textDecoration: 'none' }}>Sign Up</Link></span></p>
                </form>
            </motion.div>
        </AnimatePresence>
    );
}

export default LoginPage;