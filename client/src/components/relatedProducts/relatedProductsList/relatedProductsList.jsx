/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import RelatedProductCard from './relatedProductCard.jsx';
import ListContainer from '../sharedStyledComponents/listContainer.js';

class RelatedProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProducts: this.props.relatedProducts,
      parentProductIDInfo: '',
      imagesToTheLeft: false,
      imagesToTheRight: true
    }
    this.scrollRight = this.scrollRight.bind(this);
    this.scrollLeft = this.scrollLeft.bind(this);
  }

  componentDidMount() {
    axios.get(`/products/?product_id=${this.props.productID}`)
      .then(({ data }) => {
        this.setState({
          parentProductIDInfo: data
        })
      })
  }

  scrollLeft() {
    this.setState({
      imagesToTheRight: true
    })
    const carousel = document.getElementById('productCarousel');
    carousel.scrollLeft -= 316;
    if (carousel.scrollLeft <= 50) {
      this.setState({
        imagesToTheLeft: false,
      });
    }
  }

  scrollRight() {
    this.setState({
      imagesToTheLeft: true
    })
    const carousel = document.getElementById('productCarousel');
    const amountLeftToScroll = carousel.scrollWidth - carousel.clientWidth;
    carousel.scrollLeft += 316;
    if (carousel.scrollLeft >= amountLeftToScroll) {
      this.setState({
        imagesToTheRight: false,
      });
    }
  }

  render() {
    if (this.state.parentProductIDInfo.length === 0) {
      return (
        null
      )
    } else {
      return (
        <div>

          {this.state.imagesToTheRight ?
            <RightButtonWrapper>
              <RightButton onClick={this.scrollRight}>
                &#8250;
          </RightButton>
          </RightButtonWrapper> : null

        }

          <ListContainer id="productCarousel">
            {this.props.relatedProducts.map((product) => {
              return <RelatedProductCard parentProductID={this.props.productID} productID={product}
                parentProductIDInfo={this.state.parentProductIDInfo}
                key={product} />
            })}
          </ListContainer>


            {this.state.imagesToTheLeft ? <LeftButtonWrapper>
              <LeftButton onClick={this.scrollLeft}>
              &#8249;
        </LeftButton>
        </LeftButtonWrapper>: null}



        </div>

      )
    }
  }
}

export default RelatedProductList;

const LeftButtonWrapper = styled.div`
  position: absolute;
  left: -3%;
  top: 0px;
  padding-left: 60px;
  height: 89%;
  background: white;
  backdrop-filter: blur(15px) contrast(70%);
  border: none;
  cursor: pointer;
  z-index: 10;
  outline: 0;
`;

const RightButtonWrapper = styled.div`
  position: absolute;
  right: -3%;
  top: 0px;
  padding-left: 60px;
  height: 89%;
  background: white;
  backdrop-filter: blur(8px) contrast(70%);
  border: none;
  cursor: pointer;
  z-index: 10;
  outline: 0;
`;

const LeftButton = styled.button`
  position: absolute;
  left: 2%;
  top: 25%;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 100;
  font-size: 30px;
  color: black;
  outline: 0;
`;

const RightButton = styled.button`
  position: absolute;
  right: 2%;
  top: 25%;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 100;
  font-size: 30px;
`;