import React, { Component, useState } from 'react';

class EmailForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      message: '',
      success: null // true - успех, false - ошибка
    };
  }

  handleChange = (event) => {
    this.setState({ email: event.target.value });
  };

  validateEmail = (email) => {
    // Простая, но надёжная проверка email
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email } = this.state;

    if (!email) {
      this.setState({
        message: 'Пожалуйста, введите email адрес',
        success: false
      });
      return;
    }

    if (this.validateEmail(email)) {
      this.setState({
        message: `Письмо успешно отправлено на ${email}`,
        success: true
      });
    } else {
      this.setState({
        message: 'Ошибка: неверный формат email адреса',
        success: false
      });
    }
  };

  render() {
    const { email, message, success } = this.state;
    return (
      <div className="email-form-container">
        <h3>Форма подписки</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Введите email"
            value={email}
            onChange={this.handleChange}
            className="email-input"
          />
          <button type="submit" className="submit-btn">Отправить</button>
        </form>
        {message && (
          <div className={`message ${success ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
      </div>
    );
  }
}

// ========== Задание 2: ProductCatalog ==========
// Исходные данные товаров
const initialProducts = [
  { id: 1, name: 'Ноутбук', price: 1200.5, quantity: 5 },
  { id: 2, name: 'Мышь', price: 15.99, quantity: 0 },
  { id: 3, name: 'Клавиатура', price: 45.0, quantity: 2 },
  { id: 4, name: 'Монитор', price: 320.0, quantity: 0 },
  { id: 5, name: 'Наушники', price: 89.9, quantity: 7 },
  { id: 6, name: 'Веб-камера', price: 55.0, quantity: 3 },
  { id: 7, name: 'Коврик для мыши', price: 10.0, quantity: 1 }
];

class ProductCatalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [...initialProducts],
      sortConfig: { key: null, direction: 'asc' }
    };
  }

  // Функция сортировки
  sortProducts = (key) => {
    let direction = 'asc';
    if (this.state.sortConfig.key === key && this.state.sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    const sortedProducts = [...this.state.products].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    this.setState({ products: sortedProducts, sortConfig: { key, direction } });
  };

  // Получить класс для строки в зависимости от количества товара
  getRowClassName = (quantity) => {
    if (quantity === 0) return 'row-zero';
    if (quantity < 3) return 'row-low';
    return '';
  };

  // Подсчёт общего количества и стоимости
  calculateTotals = () => {
    const totalQuantity = this.state.products.reduce((sum, p) => sum + p.quantity, 0);
    const totalCost = this.state.products.reduce((sum, p) => sum + p.price * p.quantity, 0);
    return { totalQuantity, totalCost };
  };

  render() {
    const { products, sortConfig } = this.state;
    const { totalQuantity, totalCost } = this.calculateTotals();

    // Индикатор направления сортировки
    const getSortIndicator = (key) => {
      if (sortConfig.key !== key) return '';
      return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
    };

    return (
      <div className="product-catalog">
        <h3>Каталог товаров</h3>
        <table className="catalog-table">
          <thead>
            <tr>
              <th onClick={() => this.sortProducts('id')} style={{ cursor: 'pointer' }}>
                № строки{getSortIndicator('id')}
              </th>
              <th onClick={() => this.sortProducts('name')} style={{ cursor: 'pointer' }}>
                Название{getSortIndicator('name')}
              </th>
              <th onClick={() => this.sortProducts('price')} style={{ cursor: 'pointer' }}>
                Цена{getSortIndicator('price')}
              </th>
              <th onClick={() => this.sortProducts('quantity')} style={{ cursor: 'pointer' }}>
                Количество{getSortIndicator('quantity')}
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id} className={this.getRowClassName(product.quantity)}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.price.toFixed(2)}</td>
                <td>{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="totals">
          <p>Общее количество товаров: {totalQuantity}</p>
          <p>Общая стоимость: {totalCost.toFixed(2)} руб.</p>
        </div>
      </div>
    );
  }
}

// Можно экспортировать оба компонента
export { EmailForm, ProductCatalog };