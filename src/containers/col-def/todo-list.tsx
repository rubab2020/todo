import { Badge } from "react-bootstrap";

const todoListColumns = (setType: any, setShowModal: any, setTodo: any, deleteTodo: any, tasksModal: any) => [
    {
        name: '#',
        cell: (row: any, index: number) => Number(index) + 1,
    },
    {
        name: 'Name',
        selector: (row: any) => row.name,
    },
    {
        name: 'Status',
        cell: (row: any) => (
            <Badge bg={row.status ? 'success' : 'warning'}>{row.status ? 'Done' : 'Initiated'}</Badge>
        ),
    },
    {
        name: 'Last Modified',
        selector: (row: any) => row.updated_at,
    },
    {
        name: 'Action',
        cell: (row: any) => (
            <>
                <button type="button" className="btn btn-xs btn-secondary table-action-btn me-1" onClick={() => {setTodo(row); setType('UPDATE'); setShowModal(true);}}>Update</button>
                <button type="button" className="btn btn-xs btn-danger table-action-btn me-1" onClick={() => {deleteTodo(row.id);}}>Delete</button>
                <button type="button" className="btn btn-xs btn-info table-action-btn" onClick={() => {setTodo(row); setType('TASKS'); setShowModal(true);}}>View Tasks</button>
            </>
        )
    }
];

export default todoListColumns;