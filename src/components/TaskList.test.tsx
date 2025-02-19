import { render, screen, fireEvent } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import TaskList from './TaskList';  
import '@testing-library/jest-dom';
import messages from '../../public/messages/es.json';

jest.mock('./TaskList', () => {
  const OriginalModule = jest.requireActual('./TaskList');
  
  return {
    ...OriginalModule,
    addTask: jest.fn((task) => {
      console.log('Mock de addTask:', task);
    }),
  };
});
describe('Lista de Task', () => {
  test('Renderiza y permite agregar una nueva tarea', async () => {
    render(
        <TaskList isDarkMode={true} token="123456789" />
    );

    const addButton = screen.getByText('AÑADIR');
    const input = screen.getByPlaceholderText('Nueva tarea..'); 

    fireEvent.change(input, { target: { value: 'Esto es una nueva tarea' } });
    fireEvent.click(addButton);

    expect(screen.getByText('Esto es una nueva tarea')).toBeInTheDocument();
  });
});