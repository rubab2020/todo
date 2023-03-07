import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import todoListColumns from "../../../containers/col-def/todo-list";
import { prepareFormFields } from "../../../helpers/form";
import useApi from "../../../hooks/useApi";

const Todo = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [type, setType] = useState<string>('CREATE'); // CREATE, UPDATE
    const [todos, setTodos] = useState<object[]>([]);
    const [todo, setTodo] = useState<any>({});

    const api = useApi();

    useEffect(() => {
        getTodoList();
    }, [])

    const getTodoList = async () => {
        const response = await api.getTodoList();
        setTodos(response);
    };

    const createTodo = async (e: React.FormEvent) => {
        e.preventDefault();
        let form = document.getElementById('createTodoForm');
        let formData = prepareFormFields(form);

        if (formData?.name && formData.hasOwnProperty('status')) {
            const todoCreated = await api.createTodo(formData?.name, formData?.status);
            if (todoCreated) {
                getTodoList();
                setShowModal(false);
            }
        }
    };

    const updateTodo = async (e: React.FormEvent) => {
        e.preventDefault();
        let form = document.getElementById('updateTodoForm');
        let formData = prepareFormFields(form);

        if (Object.keys(todo).length && formData?.name && formData.hasOwnProperty('status')) {
            const todoUpdated = await api.updateTodo(todo?.id, formData?.name, formData?.status);
            if (todoUpdated) {
                getTodoList();
                setShowModal(false);
                setTodo({});
            }
        }
    };

    const deleteTodo = async (id: string) => {
        if (confirm('Are you sure?') && id) {
            const todoDeleted = await api.deleteTodo(id);
            if (todoDeleted) {
                getTodoList();
            }
        }
    };

    const tasksModal = () => {
        return <React.Fragment>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Task List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        {(todo?.tasks || []).map((item: any, index: any) => {
                            return <li key={index}><span className={`text-${item?.status ? 'success' : 'warning'}`}>{item?.name}</span></li>
                        })}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {setTodo({}); setShowModal(false)}}>Close</Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    };

    const todoModal = () => {
        return <React.Fragment>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{type === 'CREATE' ? 'Create Todo' : 'Update Todo'}</Modal.Title>
                </Modal.Header>
                <form onSubmit={type === 'CREATE' ? createTodo : updateTodo} id={type === 'CREATE' ? 'createTodoForm': 'updateTodoForm'}>
                <Modal.Body>
                        <div className="form-group mb-2">
                            <label htmlFor="id_name">Name</label>
                            <input type="text" className="form-control" name="name" id="id_name" placeholder="Todo Name" defaultValue={todo?.name} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="id_status">Status</label>
                            <select name="status" id="id_status" className="form-control" defaultValue={todo?.status} required>
                                <option value="">Select Status</option>
                                <option value="0">Initiated</option>
                                <option value="1">Done</option>
                            </select>
                        </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {setTodo({}); setShowModal(false)}}>Close</Button>
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
                                Todo List
                                <button type="button" className="btn btn-sm btn-primary" onClick={() => {setTodo({}); setType('CREATE'); setShowModal(true);}}>Create New</button>
                            </div>
                            <div className="card-body">
                                <DataTable
                                    columns={todoListColumns(setType, setShowModal, setTodo, deleteTodo, tasksModal)}
                                    data={todos}
                                    pagination
                                    paginationPerPage={10}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {type === 'TASKS' ? tasksModal() : todoModal()}
        </React.Fragment>
    );
}
 
export default Todo;