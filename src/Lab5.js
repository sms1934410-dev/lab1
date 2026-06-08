import React, { useState } from 'react';

const ContactForm = () => {
  // Состояния для полей формы
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [gender, setGender] = useState(''); // 'male', 'female', 'other'
  const [errors, setErrors] = useState({});
  const [contacts, setContacts] = useState([]); // массив отправленных контактов

  // Валидация формы
  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Имя обязательно для заполнения';
    if (!email.trim()) {
      newErrors.email = 'Email обязателен';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Введите корректный email (например, name@domain.com)';
    }
    if (!message.trim()) newErrors.message = 'Сообщение не может быть пустым';
    if (!gender) newErrors.gender = 'Выберите пол';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // true, если ошибок нет
  };

  // Обработка отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Создаём новый контакт
      const newContact = {
        id: Date.now(),
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        gender: gender
      };
      // Добавляем в таблицу
      setContacts([...contacts, newContact]);
      // Очищаем поля
      setName('');
      setEmail('');
      setMessage('');
      setGender('');
      setErrors({});
    }
  };

  return (
    <div className="contact-container">
      <div className="form-section">
        <h3>📋 Форма обратной связи</h3>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label>Имя:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={errors.name ? 'error-input' : ''}
            />
            {errors.name && <span className="error-msg">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? 'error-input' : ''}
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Пол:</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === 'male'}
                  onChange={() => setGender('male')}
                /> Мужской
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === 'female'}
                  onChange={() => setGender('female')}
                /> Женский
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={gender === 'other'}
                  onChange={() => setGender('other')}
                /> Другой
              </label>
            </div>
            {errors.gender && <span className="error-msg">{errors.gender}</span>}
          </div>

          <div className="form-group">
            <label>Сообщение:</label>
            <textarea
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={errors.message ? 'error-input' : ''}
            />
            {errors.message && <span className="error-msg">{errors.message}</span>}
          </div>

          <button type="submit" className="submit-contact-btn">Submit</button>
        </form>
      </div>

      <div className="table-section">
        <h3>📋 Отправленные контакты</h3>
        {contacts.length === 0 ? (
          <p>Нет отправленных контактов.</p>
        ) : (
          <table className="contacts-table">
            <thead>
              <tr>
                <th>Имя</th>
                <th>Email</th>
                <th>Пол</th>
                <th>Сообщение</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(contact => (
                <tr key={contact.id}>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.gender === 'male' ? 'Мужской' : contact.gender === 'female' ? 'Женский' : 'Другой'}</td>
                  <td>{contact.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ContactForm;