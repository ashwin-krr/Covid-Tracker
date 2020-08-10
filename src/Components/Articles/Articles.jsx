import React, { Component } from 'react';
import Pusher from 'pusher-js';
import pushid from 'pushid';
import styles from './Articles.module.css';

class Articles extends Component {
  state = {
    newsItems: [],
  }

  componentDidMount() {
    fetch('http://localhost:5000/live')
      .then(response => response.json())
      .then(articles => {
        this.setState({
          newsItems: [...this.state.newsItems, ...articles],
        });
      }).catch(error => console.log(error));

    const pusher = new Pusher('9fbe822e0017ca3faaac', {
      cluster: 'ap2',
      encrypted: true,
    });

    const channel = pusher.subscribe('news-channel');
    channel.bind('update-news', data => {
      this.setState({
        newsItems: [...data.articles, ...this.state.newsItems],
      });
    });
  }

  render() {
    const NewsItem = (article, id) => (
      <li key={id}><a href={`${article.url}`}>{article.title}</a></li>
    );

    const newsItems = this.state.newsItems.map(e => NewsItem(e, pushid()));

    return (
      <div className={styles.App}>
        <h1 className={styles.Apptitle}>Covid-19 Vaccine Updates</h1>
        <ul className={styles.newsitems}>{newsItems}</ul>
      </div>
    );
  }
}

export default Articles;
