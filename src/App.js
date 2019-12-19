import React, {useState, useEffect} from 'react';
import data from './data';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #eee;
`;

const Row = styled.div`
  padding: 10px;
  min-width: 250px;
  padding-left: 20px;
`;

const Header = styled.div`
  position: fixed;
  background-color: #fff;
  left: 0;
  right: 0;
  top: 0;
  height: 50px;
  align-items: center;
  display: flex;
  padding-left: 15px;
  border-bottom: 1px solid #ccc;
  -webkit-backface-visibility: hidden;
`;

const MutedText = styled.span`
  color: #999;
`;

const HeaderSpacer = styled.div`
  height: 50px;
`;

const TextSpacer = styled.div`
  width: 10px;
`;

const Footer = styled.div`
  position: fixed;
  background-color: #fff;
  left: 0;
  right: 0;
  bottom: 0;
  height: 30px;
  align-items: center;
  display: flex;
  padding-left: 15px;
  border-top: 1px solid #ccc;
`;

const FooterSpacer = styled.div`
  height: 30px;
`;

function App() {
  // since data is sorted with most ratings first
  let mostRatings = data[0].ratingCount;
  let sortOptions = [
    'rating (good to bad)',
    'rating (bad to good)',
    'alphabetical',
    'alphabetical (reverse)'
  ];

  const [sortType, setSortType] = useState(sortOptions[0]);
  const [sortedData, setSortedData] = useState(data);

  function getColor(value) {
    const hue = Math.round(value);
    return ["hsl(", hue, ", 50%, 50%)"].join("");
  };

  // sort data
  useEffect(() => {
    let clone = data.slice();
    if(sortType === 'rating (good to bad)') {
      clone.sort((a, b) => {
        return a.rating > b.rating ? -1 : 1;
      });
    } else if(sortType === 'rating (bad to good)') {
      clone.sort((a, b) => {
        return a.rating < b.rating ? -1 : 1;
      });
    } else if(sortType === 'alphabetical') {
      clone.sort((a, b) => {
        return a.professor.match(/[a-z]+/i)[0] < b.professor.match(/[a-z]+/i)[0] ? -1 : 1;
      });
    } else if(sortType === 'alphabetical (reverse)') {
      clone.sort((a, b) => {
        return a.professor.match(/[a-z]+/i)[0] > b.professor.match(/[a-z]+/i)[0] ? -1 : 1;
      });
    }
    setSortedData(clone);
  }, [sortType]);


  return (
    <Container>
      <HeaderSpacer/>
      <Header>
        <b>SIRS</b>
        <TextSpacer/>
        sort:
        <select onChange={e => setSortType(e.target.value)}>
          {sortOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        
      </Header>
      <Footer>
        <MutedText>(color -> rating AND width -> number of ratings)</MutedText>
      </Footer>
      {sortedData.map((prof, i) => (
        <Row 
          key={i} 
          style={{
            width: (prof.ratingCount / mostRatings * 100) + 'vw',
            backgroundColor: getColor((prof.rating-1)*25)
          }}>
            {i+1}) {prof.professor} [{Math.round(prof.rating*10)/10}]
          </Row>
      ))}
      <FooterSpacer/>
    </Container>
  );
}

export default App;
