import { useContext, useRef } from "react";
import { ContextTasks } from "../../Memory/tasks";
import { Link } from "react-router-dom";
import editIcon from '../../assets/img/boligrafo.png'
import { updatesTask } from "../../services/tasks";
import { AuthContext } from "../../Memory/Auth";

function ListOfTasks() {
    const [state, dispatch] = useContext(ContextTasks);
    const [auth] = useContext(AuthContext);

    const update = useRef(null);
    const pendingChanges = useRef([]);

    const handleCheck = (id) => {

        dispatch({ type: 'check', id: id });

        const task = { ...state.tasks.objects[id], completed: !state.tasks.objects[id].completed };
        pendingChanges.current.push(task);
        
        clearTimeout(update.current);
        update.current = setTimeout(() => {
            processPendingChanges();
        }, 500);
    }

    const processPendingChanges = () => {
        const changes = [...pendingChanges.current];
        pendingChanges.current = [];

        for (const changeRequest of changes) {
            updatesTask(changeRequest, auth.token);
        }
    }

    return (
        <div id="tasks-list">
            <ul>
                {state.tasks.order.map((id) => (
                    <li key={id}>
                        <label>
                            <input
                                type="checkbox"
                                checked={state.tasks.objects[id].completed}
                                onChange={() => handleCheck(id)}
                            />{state.tasks.objects[id].name}
                        </label>
                        <Link key={id} to={`/dashboard/tasks/${id}`}>
                            <img src={editIcon} alt="opt-icon" />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListOfTasks;