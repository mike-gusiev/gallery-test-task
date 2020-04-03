import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
import {
  CardMedia,
  Grid,
  IconButton, Typography
} from "@material-ui/core";
import { MdFileDownload } from "react-icons/md";

import Layout from "../components/layout";

const ImagePage = () => {
  const [imageData, setImageData] = useState(null);
  const [relatedImages, setRelatedImages] = useState(null);

  useEffect(() => {
    const id = window.location.pathname.slice(7);
    getImageData(id);
    const url = `https://picsum.photos/v2/list?page=0&limit=5`;
    fetch(url)
      .then(res => res.json())
      .then(json => setRelatedImages(json));
  }, []);

  const getImageData = id => {
    const url = `https://picsum.photos/id/${id}/info`;
    fetch(url)
        .then(res => res.json())
        .then(json => setImageData(json));
  };

  const getImage = (data) => relatedImages ? relatedImages[data] : '';

  return (
    <Layout>
      <Grid container spacing={2} justify="center">
        <Grid item xs={12}>
          <Grid container justify="center">
            <Grid item>
              <IconButton>
                <MdFileDownload url={imageData && imageData.download_url}/>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={8} >
          <SimpleReactLightbox>
            <SRLWrapper>
              <img width="100%" src={`${imageData && imageData.download_url}`} alt=""/>
            </SRLWrapper>
          </SimpleReactLightbox>
        </Grid>
        <Grid container item xs={4}>
          <div>
            <span><strong>Author: {imageData && imageData.author}</strong></span><br/>
            <span><strong>ID: {imageData && imageData.id}</strong></span><br/>
            <span><strong>Width: {imageData && imageData.width}</strong></span><br/>
            <span><strong>Height: {imageData && imageData.height}</strong></span><br/>
            <span><strong>URL: <a href={imageData && imageData.url} target="_blank">{imageData && imageData.url}></a></strong></span>
          </div>
        </Grid>
      </Grid>
      <div>
        <Typography variant="h5" style={{margin: '50px 0'}}><strong>Related images</strong></Typography>
        <Grid container spacing={2} justify="space-between">
          <Grid item>
            <Link to={`/image/${getImage(0).id}`}  onClick={() => getImageData(getImage(0).id)}>
              <img src={getImage(0).download_url} width='auto' height='150' alt='loading...' />
            </Link>
          </Grid>
          <Grid item>
            <Link to={`/image/${getImage(1).id}`}  onClick={() => getImageData(getImage(1).id)}>
              <img src={getImage(1).download_url} width='auto' height='150' alt='loading...' />
            </Link>
          </Grid>
          <Grid item>
            <Link to={`/image/${getImage(2).id}`}  onClick={() => getImageData(getImage(2).id)}>
              <img src={getImage(2).download_url} width='auto' height='150' alt='loading...' />
            </Link>
          </Grid>
          <Grid item>
            <Link to={`/image/${getImage(3).id}`}  onClick={() => getImageData(getImage(3).id)}>
              <img src={getImage(3).download_url} width='auto' height='150' alt='loading...' />
            </Link>
          </Grid>
          <Grid item>
            <Link to={`/image/${getImage(4).id}`}  onClick={() => getImageData(getImage(4).id)}>
              <img src={getImage(4).download_url} width='auto' height='150' alt='loading...' />
            </Link>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default ImagePage;
