import { Badge } from "react-bootstrap";

const taskListColumns = (setType: any, setShowModal: any, setTask: any, deleteTask: any) => [
    {
        name: '#',
        cell: (row: any, index: number) => Number(index) + 1,
    },
    {
        name: 'Todo',
        cell: (row: any) => (
            <span className={`text-${row?.todo?.status ? 'success' : 'warning'}`}>{row?.todo?.name}</span>
        ),
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
                <button type="button" className="btn btn-xs btn-secondary table-action-btn me-1" onClick={() => {setTask(row); setType('UPDATE'); setShowModal(true);}}>Update</button>
                <button type="button" className="btn btn-xs btn-danger table-action-btn me-1" onClick={() => {deleteTask(row.id);}}>Delete</button>
            </>
        )
    }
];

export default taskListColumns;