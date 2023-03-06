import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import taskListColumns from "../../../containers/col-def/task-list";
import { prepareFormFields } from "../../../helpers/form";
import useApi from "../../../hooks/useApi";

const Task = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const[todos, setTodos] = useState<object[]>([]);
    const [type, setType] = useState<string>('CREATE'); // CREATE, UPDATE
    const [tasks, setTasks] = useState<object[]>([]);
    const [task, setTask] = useState<any>({});

    const api = useApi();

    useEffect(() => {
        getTodoList();
        getTaskList();
    }, [])

    const getTodoList = async () => {
        const response = await api.getTodoList();
        setTodos(response);
    };

    const getTaskList = async () => {
        const response = await api.getTaskList();
        setTasks(response);
    };

    const createTask = async (e: React.FormEvent) => {
        e.preventDefault();
        let form = document.getElementById('createTaskForm');
        let formData = prepareFormFields(form);

        if (formData?.todo_id && formData?.name && formData.hasOwnProperty('status')) {
            const taskCreated = await api.createTask(formData?.todo_id, formData?.name, formData?.status);
            if (taskCreated) {
                getTaskList();
                setShowModal(false);
            }
        }
    };

    const updateTask = async (e: React.FormEvent) => {
        e.preventDefault();
        let form = document.getElementById('updateTaskForm');
        let formData = prepareFormFields(form);

        if (Object.keys(task).length && formData?.name && formData.hasOwnProperty('status')) {
            const taskUpdated = await api.updateTask(task?.id, formData?.name, formData?.status);
            if (taskUpdated) {
                getTaskList();
                setShowModal(false);
                setTask({});
            }
        }
    };

    const deleteTask = async (id: string) => {
        if (confirm('Are you sure?') && id) {
            const taskDeleted = await api.deleteTask(id);
            if (taskDeleted) {
                getTaskList();
            }
        }
    };

    const todoModal = () => {
        return <React.Fragment>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{type === 'CREATE' ? 'Create Task' : 'Update Task'}</Modal.Title>
                </Modal.Header>
                <form onSubmit={type === 'CREATE' ? createTask : updateTask} id={type === 'CREATE' ? 'createTaskForm': 'updateTaskForm'}>
                <Modal.Body>
                        {type === 'CREATE' && <div className="form-group">
                            <label htmlFor="id_todo">Todo</label>
                            <select name="todo_id" id="id_todo" className="form-control" defaultValue={task?.todo?.id} required>
                                <option value="">Select Todo</option>
                                {(todos || []).map((item: any, index: any) => {
                                    return <option key={index} value={item.id}>{item.name}</option>
                                })}
                            </select>
                        </div>}
                        <div className="form-group mb-2">
                            <label htmlFor="id_name">Name</label>
                            <input type="text" className="form-control" name="name" id="id_name" placeholder="Task Name" defaultValue={task?.name} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="id_status">Status</label>
                            <select name="status" id="id_status" className="form-control" defaultValue={task?.status} required>
                                <option value="">Select Status</option>
                                <option value="1">Active</option>
                                <option value="0">Inactive</option>
                            </select>
                        </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {setTask({}); setShowModal(false)}}>Close</Button>
                    <Button type="submit" variant="primary">Submit</Button>
                </Modal.Footer>
                </form>
            </Modal>
        </React.Fragment>
    };

    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                Task List
                                <button type="button" className="btn btn-sm btn-primary" onClick={() => {setTask({}); setType('CREATE'); setShowModal(true);}}>Create New</button>
                            </div>
                            <div className="card-body">
                                <DataTable
                                    columns={taskListColumns(setType, setShowModal, setTask, deleteTask)}
                                    data={tasks}
                                    pagination
                                    paginationPerPage={10}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {todoModal()}
        </React.Fragment>
    );
}
 
export default Task;