import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ContextTasks } from '../../Memory/tasks';
import { createTask, deleteTask, updatesTask } from '../../services/tasks';
import { AuthContext } from '../../Memory/Auth';

function Modal() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [state, dispatch] = useContext(ContextTasks);
    const [taskDetails, setTaskDetails] = useState({
        name: '',
        completed: false
    });
    const { name } = taskDetails;
    const taskMemory = state.tasks.objects[id];
    const [auth] = useContext(AuthContext);

    const cancelAction = () => {
        navigate('/dashboard');
    }

    const handleInputName = (e) => {
        setTaskDetails({
            ...taskDetails,
            name: e.target.value
        })
    }

    const deletes = async () => {
        await deleteTask(id, auth.token);
        dispatch({ type: 'delete', id: Number(id) });
        navigate('/dashboard');
    }

    const update = async () => {
        const updatedTask = await updatesTask(taskDetails, auth.token);
        dispatch({ type: 'update', task: updatedTask });
        navigate('/dashboard');
    }

    const create = async () => {
        const createdTask = await createTask(taskDetails, auth.token);
        dispatch({ type: 'create', task: createdTask });
        navigate('/dashboard');
    }

    useEffect(() => {
        console.log(id);
        if (!id) return;
        if (!taskMemory) {
            const timeoutId = setTimeout(() => {
                navigate('/dashboard');
            }, 500);
            return () => clearTimeout(timeoutId);
        }

        setTaskDetails(taskMemory);
    }, [id, taskMemory, navigate]);

    return (
        <>
            <div className="modal" onClick={cancelAction}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <h2 style={{ fontWeight: "bold" }}>{id ? 'Edit Task' : 'Add New Task'}</h2>
                    <textarea
                        maxLength={50}
                        id="newTaskName"
                        placeholder="Enter task name"
                        value={name}
                        onChange={handleInputName}
                        style={{ border: "1px solid gray" }}
                    />
                    <p>{name.length}/50</p>
                    <div className="btns-box">
                        {id
                            ? <>
                                <button className="btns-modal-task-design" id="btn-delete" onClick={deletes}>Delete</button>
                                <button className="btns-modal-task-design" id="btn-save" onClick={update}>Save</button>
                            </>
                            : <>
                                <button className="btns-modal-task-design" id="btn-cancel" onClick={cancelAction}>Cancel</button>
                                <button className="btns-modal-task-design" id="btn-confirm" onClick={create}>Confirm</button>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Modal;