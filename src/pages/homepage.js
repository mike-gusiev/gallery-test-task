import React from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  Button, IconButton
} from "@material-ui/core";
import { MdFavorite } from "react-icons/md";

import Layout from "../components/layout";

class Homepage extends React.Component {
  state = {
    images: [],
    per: 10,
    page: 1,
    scrolling: false
  };

  myRef = React.createRef();

  componentDidMount() {
    this.loadData();
    window.addEventListener('scroll', event => this.handleScroll(event));
  };

  componentWillUnmount() {
    this.setState({images: []});
    window.removeEventListener('scroll', this.handleScroll);
  }

  loadData = () => {
    const { per, page, images } = this.state;
    const url = `https://picsum.photos/v2/list?page=${page}&limit=${per}`;
    fetch(url)
      .then(res => res.json())
      .then(json => json.map(data => {
        data.like = false;
        return data;
      }))
      .then(json => {
        this.setState({
          images: [...images, ...json],
          scrolling: false,
        })
      });
  };

  handleScroll = () => {
    const { scrolling } = this.state;
    if (scrolling) return;
    if (this.myRef.current == null) return;
    const lastLi = this.myRef.current.lastChild;
    const lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
    const pageOffset = window.pageYOffset + window.innerHeight;
    let bottomOffset = 20;
    if (pageOffset > lastLiOffset - bottomOffset) this.loadDataMore();
  };

  loadDataMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      scrolling: true
    }), this.loadData)
  };

  likeImage = (id) => {
    let newArr = this.state.images;
    newArr.map(data => data.id === id ? data.like = !data.like : null);
    this.setState({images: newArr});
  };

  render() {
    return (
      <Layout>
        <Grid container spacing={2} ref={this.myRef}>
          {this.state.images.map(data => (
            <Grid key={data.id} item xs={12}  sm={6} md={4}>
              <Card>
                <CardHeader title={<Link to={`/image/${data.id}`}>{data.author}</Link>}/>
                <Link to="/">
                  <CardMedia
                      onDoubleClick={() => this.likeImage(data.id)}
                      style={{paddingTop: '56.25%'}}
                      image={data.download_url}
                      title={data.author}
                  />
                </Link>
                <CardActions disableSpacing>
                  <Button onClick={() => this.likeImage(data.id)} >
                    <MdFavorite style={{marginRight: '5'}} /> {data.like ? 1 : 0}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Grid container justify="center">
              <Grid item>
                <IconButton>
                  Page {this.state.page}
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Layout>
    );
  }
}

export default Homepage;
