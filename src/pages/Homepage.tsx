import styled from "styled-components"
import { Twelve } from "../layouts/Twelve"
import { color } from "../theme/color"

export const Homepage = styled(({className}) => {
  return (
    <Twelve className={className}>
      <div className="dossier-img"><img src="https://www.fillmurray.com/g/200/350" /></div>
      <div className="overview">
        <p>Shawn Mealey is web developer</p>
      </div>
      <div className="facial-recog">
        <ul>
          <li>Requesting CAT4</li>
          <li>Requesting CAT4</li>
        </ul>
      </div>
      <div className="skill">Javascript</div>
      <div className="skill">Node</div>
      <div className="skill">HTML/CSS</div>
      <div className="dossier-status">
      <h2>Dossier Status:</h2>
      <span>Classified</span>
      </div>

    </Twelve>
  )
})`
 .dossier-img {
  background-color: ${color('primary.400')};
  display: block;
  grid-column: 1 / 3;
  grid-row: 1 / 4;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: 100%;
  }
 }
 .facial-recog {
  background-color: ${color('primary.400')};
  grid-column: 3 / 6;
  grid-row: 1 / 3;
 }
 .skill {
  &:nth-of-type(1n) {
    background-color: ${color('primary.400')};
    grid-column: 3 / 4;
    grid-row: 3 / 4;
  }
  &:nth-of-type(2n) {
    background-color: ${color('primary.300')};
    grid-column: 4 / 5;
    grid-row: 3 / 4;
  }
  &:nth-of-type(3n) {
    background-color: ${color('primary.200')};
    grid-column: 5 / 6;
    grid-row: 3 / 4;
  }
 }
 .overview {
    background-color: ${color('primary.400')};
    grid-row: 4 / 7;
    grid-column: 1 / 6;
 }
 .dossier-status {
  background-color: ${color('primary.400')};
    grid-column: 6 / 10;
    grid-row: 1 / 2;
 }
`