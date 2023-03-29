import React, { Component } from "react";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Loader from "./components/Loader";
import Button from "./components/Button";
import Modal from "./components/Modal";
import axios from "axios";
import "./App.css";

export default class App extends Component {
  //OPTIMIZE: Состояние!
  state = {
    images: [],
    query: "",
    page: 1,
    per_page: 18,
    isLoading: false,
    showModal: false,
    src: null,
  };

  //OPTIMIZE: Запрос за фото с помощью жизненного цикла CoponentDidMount
  fetchImages = async () => {
    try {
      await axios
        .get(
          `https://pixabay.com/api/?key=34664759-17b49921daf38e4f695fadd68&q=black&
        image_type=photo&pretty=true&per_page=18&page=3`
        )
        .then((response) => {
          const data = response.data.hits;
          this.setState({ images: data });
        });
    } catch (error) {
      console.log("Ошибка при запросе componentDidMount error App.js:" + error);
    }
  };

  componentDidMount() {
    this.fetchImages();
  }
  onSubmit = (query) => {
    this.setState({ query, isLoading: true, images: [] });
  };

  //OPTIMIZE: Запрос на фото с помощью жизненного цикла componentDidUpdate

  loadImages = async () => {
    const { page, per_page, query } = this.state;
    try {
      const { data } = await axios.get(
        `https://pixabay.com/api/?key=28598653-ac578a657988498e7082adc71&q=${query}&image_type=video&per_page=${per_page}&page=${page}`
      );
      this.setState(({ images }) => ({
        images: [...images, ...data.hits],
        isLoading: false,
      }));
    } catch (error) {
      throw new Error(error);
    }
  };

  componentDidUpdate() {
    const { isLoading } = this.state;

    if (isLoading) {
      this.loadImages();
    }
  }

  handleLoadMoreSubmit = () => {
    this.setState(({ page }) => ({
      page: page + 1,
      isLoading: true,
    }));
  };

  handleModal = (src) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      src,
    }));
  };

  render() {
    const { images, src, showModal } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.onSubmit} />
        {images.length > 0 ? (
          <ImageGallery images={images} showModal={this.handleModal} />
        ) : (
          <Loader />
        )}
        <Button onClick={this.handleLoadMoreSubmit} title="Load More" />
        {showModal && (
          <Modal closeModal={this.handleModal}>
            <img className="Modal-image" src={src} />
          </Modal>
        )}
      </div>
    );
  }
}
