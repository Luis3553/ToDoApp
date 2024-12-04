import { useState, useRef, useEffect, useContext } from "react";
import { ContextTasks } from "../../Memory/tasks";
import ListOfTasks from "./list";
import { Outlet, useNavigate } from "react-router-dom";
import addIcon from '../../assets/img/plus circle.png';
import clockImg from '../../assets/img/clock.png';
import { AuthContext } from "../../Memory/Auth";
import { getUserInfo } from "../../services/accounts";
import { uploadPhotoProfile } from "../../services/photo";
import defaultUserImg from '../../assets/img/defaultPhoto.webp';
import { AnimatePresence, motion } from 'framer-motion';

function DashBoard() {
    const fileUploader = useRef(null);
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [auth] = useContext(AuthContext);
    const [state, dispatch] = useContext(ContextTasks);

    const navigate = useNavigate();

    const handleFileSubmit = (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('image', file);
            uploadPhotoProfile(auth.token, formData);
            const reader = new FileReader();
            reader.onload = (e) => {
                dispatch({ type: 'setPhoto', photo: e.target.result });
            };
            reader.readAsDataURL(file);
        }
    }

    const triggerFileUpload = () => {
        fileUploader.current.click();
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        (async function () {
            try {
                const user = await getUserInfo(auth.token);
                dispatch({ type: 'place', user: user });
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    return (
        <>
            <AnimatePresence mode="wait">
                <motion.div
                    id="dashboard-page"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div id="profile-box">
                        <input
                            type="file"
                            id="file-uploader"
                            accept="image/*"
                            style={{ display: "none" }}
                            ref={fileUploader}
                            onChange={handleFileSubmit} />
                        <div id="img-container">
                            <img
                                id="user-photo"
                                src={state.profilePhoto || defaultUserImg}
                                alt=""
                                onClick={triggerFileUpload} />
                        </div>
                        <h2>Welcome {state.username}!</h2>
                    </div>
                    <div id="time-box">
                        <p>{time}</p>
                        <img src={clockImg} alt="clock" />
                    </div>
                    <div id="tasks-box">
                        <h2>Tasks List</h2>
                        <div id="list-container">
                            <div id="list-header">
                                <h3>Daily Tasks</h3>
                                <img src={addIcon} alt="plus" onClick={() => navigate('/dashboard/new')} />
                            </div>
                            <ListOfTasks />
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
            <Outlet />
        </>
    );
};

export default DashBoard;