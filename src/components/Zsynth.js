import React from "react";
import * as Tone from "tone";
import Zkeys from "./Zkeys";
import Zcontrols from "./controlers/Zcontrols";

const Zsynth = (props) => {
  const {
    zNotes,
    zOct,
    setZoct,
    zRel,
    setZrel,
    zVol,
    setZvol,
    setZosc,
    zRev,
    setZrev,
    zDel,
    setZdel,
    zEnv,
    setZenv,
    zOsc,
    zDefault,
    setZdefault,
    modalIsOpen,
    setModalOpen,
    zVib,
    setZvib,
    zPhs,
    setZphs,
  } = props;

  const handleResetParameters = () => {
    const { octave, oscillator, reverb, volume, delay, release } = zDefault;
    setZoct(octave);
    setZosc(oscillator);
    setZrev(reverb);
    setZvol(volume);
    setZdel(delay);
    setZrel(release);
  };

  let zDelay = new Tone.FeedbackDelay({
    maxDelay: zDel.maxDelay,
    feedback: zDel.feedback,
  }).toMaster();

  let zReverb = new Tone.JCReverb({
    roomSize: props.zRev.roomSize,
  }).toMaster();

  let Zphaser = new Tone.Phaser({
    frequency: zPhs.frequency,
    octaves: zPhs.octaves,
    stages: zPhs.stages,
    Q: zPhs.Q,
    baseFrequency: zPhs.baseFrequency,
  }).toMaster();

  let Zvibrato = new Tone.Vibrato({
    frequency: zVib.frequency,
    depth: zVib.depth,
  }).toMaster();

  let zsynth = new Tone.Synth({
    volume: zVol,
    oscillator: { type: zOsc },
    envelope: {
      attack: zEnv.attack,
      decay: zEnv.decay,
      sustain: zEnv.sustain,
      release: zEnv.release,
    },
  }).chain(zDelay, Zvibrato, Zphaser, zReverb);

  return (
    <div className="zsynth" id="zSynth">
      <Zcontrols
        zDel={zDel}
        setZdel={setZdel}
        zVol={zVol}
        setZvol={setZvol}
        zRev={zRev}
        setZrev={setZrev}
        zRel={zRel}
        setZrel={setZrel}
        zOct={zOct}
        setZoct={setZoct}
        setZosc={setZosc}
        zEnv={zEnv}
        setZenv={setZenv}
        zDefault={zDefault}
        setZdefault={setZdefault}
        modalIsOpen={modalIsOpen}
        setModalOpen={setModalOpen}
        zVib={zVib}
        setZvib={setZvib}
        zPhs={zPhs}
        setZphs={setZphs}
      />
      <Zkeys zNotes={zNotes} zsynth={zsynth} zRel={zRel} zOct={zOct} />
      <button onClick={handleResetParameters}>Reset all parameters</button>
    </div>
  );
};

export default Zsynth;
