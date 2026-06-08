import React from 'react';
import './App.css';
import TasksComponent from './Lab1'; 
import { Clock, JobMenuApp } from './Lab2';
import { EmailForm, ProductCatalog } from './Lab3';
import ToDoList from './Lab4';
import ContactForm from './Lab5';    // добавьте

function App() {
  return (
    <div className="App">
      <h1>Лабораторная работа №1</h1>
      <TasksComponent />

      <h1>Лабораторная работа №2</h1>
      <h2>Задание 1: Часы</h2>
      <Clock format="24" timezone="+3:00" />   
      <Clock format="12" timezone="-4:00" />   
      <Clock />                                
      <h2>Задание 2: Меню по профессиям</h2>
      <JobMenuApp />

      <h1>Лабораторная работа №3</h1>
      <h2>Задание 1: Форма email</h2>
      <EmailForm />
      <h2>Задание 2: Каталог товаров</h2>
      <ProductCatalog />

      <h1>Лабораторная работа №4</h1>
      <ToDoList />

      <h1>Лабораторная работа №5</h1>
      <ContactForm />
    </div>
  );
}

export default App;