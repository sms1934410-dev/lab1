import React, { useState } from 'react';

// Компонент формы добавления задачи
const ToDoForm = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Введите новую задачу..."
        className="todo-input"
      />
      <button type="submit" className="todo-add-btn">➕ Добавить</button>
    </form>
  );
};

// Компонент отображения задач с чекбоксами
const ToDoItems = ({ items, onToggle }) => {
  return (
    <ul className="todo-items">
      {items.map((item) => (
        <li key={item.id} className="todo-item">
          <label className="todo-label">
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => onToggle(item.id)}
            />
            <span className={item.completed ? 'completed' : ''}>
              {item.text}
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
};

// Фильтры
const FILTERS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed'
};

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);          // основной список задач
  const [filter, setFilter] = useState(FILTERS.ALL);
  const [submitMessage, setSubmitMessage] = useState(''); // сообщение после отправки

  // Добавление задачи
  const handleAdd = (text) => {
    const newTask = {
      id: Date.now(),
      text: text,
      completed: false
    };
    setTasks([...tasks, newTask]);
    setSubmitMessage(''); // очищаем сообщение при добавлении
  };

  // Переключение чекбокса – обновляем задачу в основном списке
  const handleToggle = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Фильтрация основного списка
  const getFilteredTasks = () => {
    switch (filter) {
      case FILTERS.ACTIVE:
        return tasks.filter(task => !task.completed);
      case FILTERS.COMPLETED:
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  };

  // Имитация отправки на сервер
  const handleSubmit = () => {
    // Готовим данные для отправки (в реальности это был бы fetch)
    const dataToSend = tasks.map(task => ({
      id: task.id,
      text: task.text,
      completed: task.completed
    }));
    console.log('Отправка на сервер:', dataToSend);
    
    // Имитируем асинхронный запрос
    setTimeout(() => {
      setSubmitMessage(`✅ Задачи успешно сохранены! Отправлено ${dataToSend.length} задач.`);
    }, 500);
    
    // Можно также очистить сообщение через какое-то время, но оставим
  };

  const filteredTasks = getFilteredTasks();

  return (
    <div className="todo-container">
      <h3>📝 Список задач (ToDo)</h3>
      <ToDoForm onAdd={handleAdd} />

      <div className="filter-buttons" style={{ margin: '15px 0' }}>
        <button 
          className={filter === FILTERS.ALL ? 'active-filter' : ''} 
          onClick={() => setFilter(FILTERS.ALL)}
        >
          Все
        </button>
        <button 
          className={filter === FILTERS.ACTIVE ? 'active-filter' : ''} 
          onClick={() => setFilter(FILTERS.ACTIVE)}
        >
          Невыполненные
        </button>
        <button 
          className={filter === FILTERS.COMPLETED ? 'active-filter' : ''} 
          onClick={() => setFilter(FILTERS.COMPLETED)}
        >
          Выполненные
        </button>
      </div>

      {filteredTasks.length === 0 ? (
        <p style={{ color: '#888' }}>Нет задач в выбранной категории.</p>
      ) : (
        <ToDoItems items={filteredTasks} onToggle={handleToggle} />
      )}

      <div style={{ marginTop: '20px' }}>
        <button onClick={handleSubmit} className="submit-btn">
          💾 Submit (отправить на сервер)
        </button>
        {submitMessage && <div className="submit-message">{submitMessage}</div>}
      </div>
    </div>
  );
};

export default ToDoList;