import React, { Component } from 'react';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date()
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({ time: new Date() });
  }

  // Преобразование времени с учётом часового пояса
  getTimeInTimezone() {
    const { timezone } = this.props;
    const now = this.state.time;

    // Если часовой пояс не указан, используем локальное время
    if (!timezone) {
      return now;
    }

    // Разбираем смещение вида "+3:00" или "-4:00"
    const match = timezone.match(/([+-])(\d{1,2}):(\d{2})/);
    if (!match) return now;

    const sign = match[1] === '+' ? 1 : -1;
    const hoursOffset = parseInt(match[2], 10);
    const minutesOffset = parseInt(match[3], 10);
    const totalOffsetMinutes = sign * (hoursOffset * 60 + minutesOffset);

    // Получаем UTC время и прибавляем смещение
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const targetTime = new Date(utc + totalOffsetMinutes * 60000);
    return targetTime;
  }

  // Форматирование времени (12 или 24 часа)
  formatTime(date) {
    const { format = '24' } = this.props;
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    if (format === '12') {
      const period = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${period}`;
    }
    // 24-часовой формат
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  render() {
    const timeInZone = this.getTimeInTimezone();
    const formattedTime = this.formatTime(timeInZone);
    const { format, timezone } = this.props;

    return (
      <div className="clock">
        <div className="clock-display">{formattedTime}</div>
        <div className="clock-info">
          Формат: {format === '12' ? '12-часовой' : '24-часовой'} | Пояс: {timezone || 'локальный'}
        </div>
      </div>
    );
  }
}

// Список профессий и соответствующих ссылок
const professions = {
  developer: {
    name: 'Разработчик',
    links: [
      { title: 'GitHub', url: 'https://github.com' },
      { title: 'Stack Overflow', url: 'https://stackoverflow.com' },
      { title: 'React Docs', url: 'https://reactjs.org' },
      { title: 'MDN Web Docs', url: 'https://developer.mozilla.org' },
      { title: 'LeetCode', url: 'https://leetcode.com' },
      { title: 'CodeSandbox', url: 'https://codesandbox.io' },
      { title: 'Dev.to', url: 'https://dev.to' }
    ]
  },
  designer: {
    name: 'Дизайнер',
    links: [
      { title: 'Figma', url: 'https://figma.com' },
      { title: 'Behance', url: 'https://behance.net' },
      { title: 'Dribbble', url: 'https://dribbble.com' },
      { title: 'Adobe Color', url: 'https://color.adobe.com' },
      { title: 'Coolors', url: 'https://coolors.co' },
      { title: 'Unsplash', url: 'https://unsplash.com' },
      { title: 'Pexels', url: 'https://pexels.com' }
    ]
  },
  marketer: {
    name: 'Маркетолог',
    links: [
      { title: 'Google Analytics', url: 'https://analytics.google.com' },
      { title: 'Яндекс.Метрика', url: 'https://metrika.yandex.ru' },
      { title: 'Google Trends', url: 'https://trends.google.com' },
      { title: 'SimilarWeb', url: 'https://similarweb.com' },
      { title: 'Ahrefs', url: 'https://ahrefs.com' },
      { title: 'Canva', url: 'https://canva.com' },
      { title: 'Mailchimp', url: 'https://mailchimp.com' }
    ]
  },
  manager: {
    name: 'Менеджер',
    links: [
      { title: 'Trello', url: 'https://trello.com' },
      { title: 'Jira', url: 'https://atlassian.com/software/jira' },
      { title: 'Asana', url: 'https://asana.com' },
      { title: 'Slack', url: 'https://slack.com' },
      { title: 'Zoom', url: 'https://zoom.us' },
      { title: 'Notion', url: 'https://notion.so' },
      { title: 'Miro', url: 'https://miro.com' }
    ]
  },
  data_scientist: {
    name: 'Data Scientist',
    links: [
      { title: 'Kaggle', url: 'https://kaggle.com' },
      { title: 'Google Colab', url: 'https://colab.research.google.com' },
      { title: 'TensorFlow', url: 'https://tensorflow.org' },
      { title: 'PyTorch', url: 'https://pytorch.org' },
      { title: 'Towards Data Science', url: 'https://towardsdatascience.com' },
      { title: 'OpenCV', url: 'https://opencv.org' },
      { title: 'Hugging Face', url: 'https://huggingface.co' }
    ]
  }
};

// Компонент выбора профессии (радиокнопки)
class JobSelector extends Component {
  render() {
    const { selectedJob, onSelect } = this.props;
    return (
      <div className="job-selector">
        <h3>Выберите профессию:</h3>
        {Object.keys(professions).map(jobKey => (
          <label key={jobKey} className="job-radio">
            <input
              type="radio"
              name="profession"
              value={jobKey}
              checked={selectedJob === jobKey}
              onChange={() => onSelect(jobKey)}
            />
            {professions[jobKey].name}
          </label>
        ))}
      </div>
    );
  }
}

// Компонент меню ссылок для выбранной профессии
class JobMenu extends Component {
  render() {
    const { jobKey } = this.props;
    const job = professions[jobKey];
    if (!job) return <div>Выберите профессию</div>;

    return (
      <div className="job-menu">
        <h3>Полезные ссылки для {job.name}:</h3>
        <ul>
          {job.links.map((link, idx) => (
            <li key={idx}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

// Главный компонент для задания 2, объединяет выбор и меню
class JobMenuApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedJob: 'developer' // профессия по умолчанию
    };
  }

  handleJobSelect = (jobKey) => {
    this.setState({ selectedJob: jobKey });
  };

  render() {
    return (
      <div className="job-section">
        <JobSelector selectedJob={this.state.selectedJob} onSelect={this.handleJobSelect} />
        <JobMenu jobKey={this.state.selectedJob} />
      </div>
    );
  }
}

// Экспортируем всё, что нужно для использования в App
export { Clock, JobMenuApp };