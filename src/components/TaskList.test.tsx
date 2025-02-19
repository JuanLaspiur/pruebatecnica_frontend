import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TaskList from './TaskList';
import * as taskUtils from '@/lib/task';
import { Task } from '@/lib/task';

// Mock de las funciones de API
jest.mock('@/lib/task', () => ({
  getAllMyTask: jest.fn(),
  createTask: jest.fn(),
  deleteTask: jest.fn(),
  updateTask: jest.fn(),
}));

describe('TaskList', () => {
  const mockToken = 'mock-token';
  const mockTasks: Task[] = [
    { _id: '1', title: 'Task 1', dueDate: new Date().toISOString(), completed: false },
    { _id: '2', title: 'Task 2', dueDate: new Date().toISOString(), completed: true },
  ];

  beforeEach(() => {
    // Limpiar todos los mocks antes de cada prueba
    jest.clearAllMocks();
  });

  it('should render the TaskList component', async () => {
    // Simulamos que la función getAllMyTask devuelve tareas
    (taskUtils.getAllMyTask as jest.Mock).mockResolvedValue(mockTasks);

    render(<TaskList isDarkMode={false} token={mockToken} />);

    // Verificamos si el título de las tareas se muestra
    await waitFor(() => expect(screen.getByText('Task 1')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Task 2')).toBeInTheDocument());
  });

  it('should add a new task', async () => {
    (taskUtils.getAllMyTask as jest.Mock).mockResolvedValue(mockTasks);
    (taskUtils.createTask as jest.Mock).mockResolvedValue({ _id: '3', title: 'Task 3', dueDate: new Date().toISOString(), completed: false });

    render(<TaskList isDarkMode={false} token={mockToken} />);

    // Simula la entrada de una nueva tarea
    fireEvent.change(screen.getByPlaceholderText('Add a new task'), { target: { value: 'New Task' } });
    fireEvent.click(screen.getByText('Add'));

    await waitFor(() => expect(screen.getByText('New Task')).toBeInTheDocument());

    // Verifica si la función createTask fue llamada
    expect(taskUtils.createTask).toHaveBeenCalledWith(mockToken, 'New Task');
  });

  it('should toggle a task completion', async () => {
    (taskUtils.getAllMyTask as jest.Mock).mockResolvedValue(mockTasks);
    (taskUtils.updateTask as jest.Mock).mockResolvedValue({ ...mockTasks[0], completed: true });

    render(<TaskList isDarkMode={false} token={mockToken} />);

    // Simula el clic en el botón para marcar la tarea como completada
    fireEvent.click(screen.getByText('Task 1'));

    await waitFor(() => expect(screen.getByText('Task 1')).toHaveClass('completed'));

    // Verifica si la función updateTask fue llamada
    expect(taskUtils.updateTask).toHaveBeenCalledWith(mockToken, '1', { ...mockTasks[0], completed: true });
  });

  it('should delete a task', async () => {
    (taskUtils.getAllMyTask as jest.Mock).mockResolvedValue(mockTasks);
    (taskUtils.deleteTask as jest.Mock).mockResolvedValue({});

    render(<TaskList isDarkMode={false} token={mockToken} />);

    // Simula el clic en el botón de eliminar
    fireEvent.click(screen.getByText('Delete'));

    await waitFor(() => expect(screen.queryByText('Task 1')).not.toBeInTheDocument());

    // Verifica si la función deleteTask fue llamada
    expect(taskUtils.deleteTask).toHaveBeenCalledWith(mockToken, '1');
  });
});
