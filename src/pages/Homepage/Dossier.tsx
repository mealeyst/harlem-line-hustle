import styled from "styled-components"
import { Logo } from "../../components/Logo"
import { Oracle } from "../../layouts/Oracle"
import { color } from "../../theme/color"
import { spacing } from "../../theme/spacing"
import { Window } from "../../components/Window"
import { DossierImage } from "../../components/DossierImage"

export const Dossier = styled(({className}) => {
  return (
    <Oracle className={className}>
      <div className="dossier-img"><DossierImage /></div>
      <Window className="mission-details" header={<h2>Mission Details:</h2>}> 
        <p>
          Our objective is to find developers who have an uncanny ability to 
          create exceptional and unique expereiences one the web. We have 
          identified a candidate that we feel posesses the skills needed to 
          build the projects that we require.
        </p>
      </Window>
      <Window className="file-explore">
        <ul>
          <li>Github:</li>
          <li>Previous Employment:</li>
          <li>Education:</li>
        </ul>
      </Window>
      <div className="skill">Frontend:</div>
      <div className="skill">Backend:</div>
      <div className="skill">DevOps:</div>
      <Window className="dossier-status">
        <h2>Dossier Status: <span>Classified</span></h2>
      </Window>
      <Window className="dossier-target">
        <h2>Target Name: Shawn Mealey</h2>
        <h3>Codename: Mealeyst</h3>
        <h3>Location: Pawling, NY</h3>
        <h3>Occupation: Web Developer</h3>
      </Window>
      <Window className="dossier-skills">
        <p>Target Skills:</p>
        <ul>
          <li>HTML</li>
          <li>CSS</li>
          <li>Javascript</li>
          <li>Typescript</li>
          <li>React</li>
          <li>Redux</li>
          <li>Python</li>
          <li>Node.js</li>
          <li>Git</li>
        </ul>
      </Window>
      <Window className="dossier-history">
        <h2>Target History:</h2>
        <p>Shawn has had years of web development expeirience with a number of clients. </p>
      </Window>
      <div className="logo--wrapper"><Logo /></div>
    </Oracle>
  )
})`
 .dossier-img {
  // background-color: ${color('primary.400')};
  display: block;
  grid-area: headshot;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${spacing(4)};
  img {
    max-width: 100%;
  }
 }
 .file-explore {
    grid-area: fileExplorer
 }
 .skill {
  &:nth-of-type(3n-2) {
    background-color: ${color('primary.400')};
    color: ${color('primary.900')};
    grid-area: skill1;
  }
  &:nth-of-type(3n-1) {
    background-color: ${color('primary.300')};
    color: ${color('primary.900')};
    grid-area: skill2;
  }
  &:nth-of-type(3n) {
    background-color: ${color('primary.200')};
    color: ${color('primary.900')};
    grid-area: skill3;
  }
 }
 .mission-details {
    grid-area: mission;
 }
 .dossier-status {
    grid-area: status;
 }
 .dossier-target {
    grid-area: target;
    h2 {
      font-size: clamp(20px, 2vw, 36px);
    }
    h2 {
      font-size: clamp(16px, 1vw, 24px);
    }
 }
 .dossier-history {
  grid-area: history;
}
.dossier-skills {
  grid-area: skillList;
}
.logo--wrapper {
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  padding: ${spacing(4, 0)};
  align-items: center;
  grid-area: logo;
  ${Logo} {
    max-width: 100%;
    height: 100%;
  }
}
`

/**
 * .dossier-img {
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
 */