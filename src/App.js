import React from 'react';
import axios from 'axios';
import Movie from './Movie';

class App extends React.Component {
  state = {
    isLoading : true,
    movies : []
  };

  showMovies = (movies) => {
    return movies.map(el=>{
      return <Movie key={el.id} id={el.id} year={el.year} title={el.title} summary={el.summary} poster={el.medium_cover_image} />
    });
  }

  //async : 비동기(좀 기다려야 한다는 걸 의미) await : 어떤걸 기다려야할지 표시하는것
  getMovies = async() => {
    //await axios가 끝날때까지 기다린다
    const { data: { data: { movies }}} = await axios.get('https://yts.lt/api/v2/list_movies.json?genre=Animation&sort_by=download_count'); 
    this.setState({ movies, isLoading: false});
  }

  //처음 render() 함수 호출 뒤 실행
  componentDidMount() {
    this.getMovies();
  }

  render() {
    const { isLoading, movies } = this.state;

    return(
      <div>
        <h1>{isLoading ? 'Loding...' : this.showMovies(movies) }</h1>
      </div>
    )
  }
}

export default App;
