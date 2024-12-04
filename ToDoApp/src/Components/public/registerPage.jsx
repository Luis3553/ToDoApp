import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createAccount } from '../../services/accounts';
import { AnimatePresence, motion } from 'framer-motion';

function RegisterPage() {
    const navigate = useNavigate();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const [validation, setValidation] = useState({
        email: true,
        password: true,
        confirmPassword: true
    });
    const [value, setValue] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { name, email, password, confirmPassword } = value;

    const handleInput = (e) => {
        setValue({
            ...value,
            [e.target.id]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const account = { username: name, email: email, password: password };
        const request = await createAccount(account);
        // if (request === 201) return navigate('/login');
        navigate('/login');
    }

    const debounce = useRef(null);

    useEffect(() => {
        clearTimeout(debounce.current);
        debounce.current = setTimeout(() => {
            const validations = {
                email: () => emailPattern.test(email) || email === '',
                password: () => password.length >= 6 || password === '',
                confirmPassword: () => confirmPassword === password || confirmPassword === ''
            };
            setValidation({
                ...validation,
                email: validations.email(),
                password: validations.password(),
                confirmPassword: validations.confirmPassword()
            });
        }, 500);
    }, [value]);

    return (
        <AnimatePresence mode='wait'>
            <motion.div
                id="register-page"
                initial={{ x: "420px", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "420px", opacity: 0 }}
                transition={{ type: "spring", duration: 0.2 }}
            >
                <div id="title-register-page-box">
                    <h2>Welcome Onboard!</h2>
                    <p>Lets help you in completing your tasks</p>
                </div>
                <form id="register-form" onSubmit={handleSubmit}>
                    <label className="input-title" htmlFor="name">Full name</label>
                    <input
                        type="text"
                        id="name"
                        className='input-design'
                        placeholder="Leny Lopez"
                        value={name}
                        onChange={handleInput}
                        maxLength={22} />
                    <label className="input-title" htmlFor="email" aria-required={validation.email}>Email <span className='invalid-text' style={{ bottom: validation.email ? '-22px' : '0px', opacity: validation.email ? 0 : 1, transition: 'bottom 0.3s ease, opacity 0.3s ease' }}>Invalid Email</span></label>
                    <input
                        id="email"
                        type="email"
                        className={`input-design ${validation.email ? '' : 'invalid-input'}`}
                        placeholder="leny.lopez@mail.com"
                        value={email}
                        onChange={handleInput}
                        style={{ backgroundColor: validation.email ? 'white' : '#FF8080' }} />
                    <label className="input-title" htmlFor="password">Password <span className='invalid-text' style={{ bottom: validation.password ? '-22px' : '0px', opacity: validation.password ? 0 : 1, transition: 'bottom 0.3s ease, opacity 0.3s ease' }}>Must have 6 characthers or more</span></label>
                    <input
                        type="password"
                        id="password"
                        className={`input-design ${validation.password ? '' : 'invalid-input'}`}
                        placeholder="****************"
                        value={password}
                        onChange={handleInput}
                        style={{ backgroundColor: validation.password ? 'white' : '#FF8080' }} />
                    <label className="input-title" htmlFor="confirmPassword">Confirm Password <span className='invalid-text' style={{ bottom: validation.confirmPassword ? '-20px' : '0px', opacity: validation.confirmPassword ? 0 : 1, transition: 'bottom 0.3s ease, opacity 0.3s ease' }}>Passwords must match</span></label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className={`input-design ${validation.confirmPassword ? '' : 'invalid-input'}`}
                        placeholder="****************"
                        value={confirmPassword}
                        onChange={handleInput} /><br
                        style={{ backgroundColor: validation.confirmPassword ? 'white' : '#FF8080' }} />
                    <button type="submit" id="btn-register" className='btn-design'>Register</button>
                    <p className='opts'>Already have an account? <Link to='/login' style={{ color: '#62D2C3', textDecoration: 'none' }}><span>Sign In</span></Link></p>
                </form>
            </motion.div>
        </AnimatePresence>
    )
}

export default RegisterPage;