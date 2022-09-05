import styled, { keyframes } from "styled-components";
import { Logo } from "../components/Logo";
import { ScrollCode } from "../components/ScrollCode";
import { Trinity } from "../layouts/Trinity";
import { query } from "../theme/mediaQueries";

import fakeCode from "../constants/fakeCode";
import { RandomizedLineChart } from "../components/RanomizedLineChart";
import { LoginForm } from "../components/LoginForm";
import FakeCode from "../constants/fakeCode";
import { Gsap } from "../components/GreenSock";
import { Stage } from "../components/Stage";
import { HackingScript } from "../components/HackingScript";
import { useEffect, useState } from "react";
import * as Tone from 'tone'

const animateLogo = keyframes`
  from {
    transform: translate(0%, 50%);
    opacity: 0.1;
  }
  to {
    transform: translate(0%, 0%);
    opacity: 1;
  }
`

export const Login = styled(({className}) => {
  const [playing, setPlaying] = useState<boolean>(false)
  useEffect(() => {
    if(playing) {// create two monophonic synths
      const synth = new Tone.Synth().toMaster()
      const AMinorScale = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
      const addOctaveNumbers = (scale: string[], octaveNumber: number) => scale.map(note => {
        const firstOctaveNoteIndex = scale.indexOf('C') !== -1 ? scale.indexOf('C') : scale.indexOf('C#')
        const noteOctaveNumber = scale.indexOf(note) < firstOctaveNoteIndex ? octaveNumber - 1 : octaveNumber;
        return `${note}${noteOctaveNumber}`
      });
      const AMinorScaleWithOctave = addOctaveNumbers(AMinorScale, 4);
      // Output ['A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4'];

      AMinorScaleWithOctave.forEach((note, index) => {
        synth.triggerAttackRelease(note, '4n', index + 1)
      });
      // const synthA = new Tone.FMSynth().toDestination();
      // const synthB = new Tone.AMSynth().toDestination();
      // //play a note every quarter-note
      let note = 0;
      const loopA = new Tone.Loop(time => {
        synth.triggerAttackRelease(AMinorScaleWithOctave[note], "8n", time);
        if(note < AMinorScaleWithOctave.length) {
          note++
        } else {
          note = 0;
        }
      }, "4n").start(0);
      // //play another note every off quarter-note, by starting it "8n"
      // const loopB = new Tone.Loop(time => {
      //   synthB.triggerAttackRelease("C4", "8n", time);
      // }, "4n").start("8n");
      Tone.Transport.start()
      // all loops start until the Transport is started
    }
    if (!playing) {
      Tone.Transport.stop()
    }
  }, [playing])
  return (
    <Trinity className={className} aria-live="polite">
      <button className="play-button" onClick={() => setPlaying(true)}>Play Music</button>
      <button className="stop-button" onClick={() => setPlaying(false)}>Stop Music</button>
      <Logo />
      <LoginForm />
      <HackingScript />
    </Trinity>
  )}
)`
  ${HackingScript} {
    ${query('md')}{
      grid-area: left;
    }
  }
  ${Logo} {
    // width: 100%;
    height: 100%;
    grid-area: logo;
    margin: 0 auto;
    animation: ${animateLogo} 1.5s ease-in-out forwards;
  }
  ${LoginForm} {
    width: 100%;
    height: 100%;
    grid-area: inputs;
  }
  ${RandomizedLineChart} {
    display: none;
    ${query('md')}{
      display: block;
      &:nth-of-type(1), &:nth-of-type(2),  &:nth-of-type(3) {
        grid-area: right;
      }
      &:nth-of-type(1) {
        grid-row-end: 1;
      }
    }
  }
  .play-button, .stop-button {
    position: absolute;
    top: 40px;
  }
  
  .play-button {
    right: 140px;
  }

  .stop-button {
    right: 40px;
  }
  `