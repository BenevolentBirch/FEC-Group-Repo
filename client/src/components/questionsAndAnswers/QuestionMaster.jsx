/* eslint-disable */
import React from 'react';
import dummyData from './dummyData.js';
import axios from 'axios';
import styled from 'styled-components';
import QuestionModal from './QuestionModal.jsx';
import Question from './Question.jsx';

//justify content center
//need another outermost container for flex and justiify
const FlexContainer = styled.div`
display: flex;
justify-content: center;
`;

const Container = styled.div`
  border-radius: 10px;
  padding: 5px;
  margin: 5px;
  font-family: Arial;
  max-width: 1280px;
`;

const ButtonA = styled.button`
  height: 60px;
  width: 235px;
  background-color: white;
  padding: 10px;
  margin-left: 25px;

  &:hover {
    background-color: lightgrey;
    border: 1px solid black;
  border-radius: 5px;
  transition: all ease 0.3s;
  }
`;

const ButtonB = styled.button`
  height: 60px;
  width: 175px;
  background-color: white;
  padding: 10px;
  margin-left: 10px;

  &:hover {
    background-color: lightgrey;
    border: 1px solid black;
  border-radius: 5px;
  transition: all ease 0.3s;
  }

`;

const QuestionContainer = styled.div`
  margin: 3px;
  padding: 10px;
  /* border: 3px blue solid; */
  /* box-shadow: 10px 10px 8px grey; */
  position: center;
`;

//search bar here//
const SearchDiv = styled.div`
  width: 60%;
  position: relative;
  display: flex;
`;
const SearchBar = styled.input`
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid #ccc;
    font-size: 16px;
    background-color: none;
    background-position: 10px 10px;
    background-repeat: no-repeat;
    padding: 12px 20px 12px 40px;
    outline: none;
`;

const SearchBtn = styled.button`
  width: 50px;
  height: 50px;
  border: 1px solid grey;
  background:grey;
  text-align: center;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;

  &:hover {
    background-color: lightgrey;
    border: 1px solid black;
  border-radius: 5px;
  transition: all ease 0.3s;
  }
`;


// CLASS STARTS HERE ------------------------//


class QuestionMaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionData: [],
      modal: false,
      itemsToShow: 4,
      expanded: false,
      showAll: false,
      text: '',
    };
    this.selectModal = this.selectModal.bind(this);
    this.showMore = this.showMore.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.filterData = this.filterData.bind(this);
  }

  //make a function when the product id is changed calls axios.get on the new product id

  componentDidMount() {
    axios.get(`qa/questions/?product_id=${this.props.productID}`)
      .then((response) => {
        this.setState({
          questionData: response.data.results,
          showAll: true,
        });
      });
  }

  selectModal() {
    this.setState({
      modal: !this.state.modal
    }) // true/false toggle
  }

  showMore() {
    this.state.itemsToShow === 4 ? (
      this.setState({
        itemsToShow: this.state.questionData.length ,
        expanded: true,
      })
    ) : (
      this.setState({
        itemsToShow: 4,
        expanded: false,
      })
    )
  }

  handleSearch(event) {
    this.setState({
      text: event.target.value,
    });
  }

  filterData(event) {
    if (this.state.text >= 3 ) {
    this.setState({
      questionData: this.state.questionData.filter(e => {
        return e.question === this.state.text;
      })
    })
  }
  }


  render() {
    return (
    <FlexContainer>
      <Container>
        <h1>Question's and Answers</h1>
        <form onSubmit={event => {event.preventDefault(); }}>
          <SearchDiv className='searchBar'>
          <SearchBar placeholder='HAVE A QUESTION? SEARCH FOR ANSWERS...        ' type='text' value={this.state.text}  onChange={this.handleSearch} ></SearchBar>
          <SearchBtn onClick={event => { this.filterData(event); }}>????</SearchBtn>
          </SearchDiv>
        </form>

        <QuestionContainer>
        {this.state.questionData.slice(0, this.state.itemsToShow).map((item, i) => {
          return (
            <Question item={item} key={i} />
          )
        })}
        </QuestionContainer>

        {this.state.questionData.length > 1 && !(this.state.expanded) ? (
          <ButtonA className="Load-button" onClick={this.showMore} > <b> MORE ANSWERED QUESTIONS </b> </ButtonA>
        ) : (
          null
        )}


        <ButtonB className="add-Q-button" onClick={ this.selectModal }> <b>ADD A QUESTION +</b> </ButtonB>
        <QuestionModal displayModal={this.state.modal}
        closeModal={this.selectModal}
        product_id={this.props.productID}/>
      </Container>
    </FlexContainer>
    );
  }
}

export default QuestionMaster;

//  text-decoration: underline;
// background: transparent;
// border: none;
// outline: none;
// cursor: pointer;
