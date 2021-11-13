import { useState } from "react";
import MaxCheckMessage from "./MaxCheckMessage";

export default function OptionSelector(): JSX.Element {
  const [tags, setTags] = useState<string[]>([]);
  const times = [10, 15, 20, 30, 45, 60];
  const timeOptions = times.map((time) => (
    <option key={time} value={time}>
      {time} mins
    </option>
  ));
  const [duration, setDuration] = useState<number>(times[0]);

  const handleClickCheckbox = (newTag: string) => {
    if (tags.includes(newTag)) {
      let currentTags = [...tags];
      currentTags.splice(tags.indexOf(newTag), 1);
      setTags(currentTags);
    } else {
      setTags([...tags, newTag]);
    }
  };

  const bodyPartOptions = [
    "Full body",
    "Arms",
    "Abs",
    "Legs",
    "Butt",
    "Back",
  ].map((part) => (
    <div>
      <input
        type="checkbox"
        onChange={() => handleClickCheckbox(part)}
        // onChange={(event) => !tags.includes(event.target.value)? setTags([...tags, part]):setTags(tags.splice(tags.indexOf(event.target.value),1))}
        id={part}
        name="bodypart"
        value="coding"
      />
      <label>{part}</label>
    </div>
  ));

  const workoutTypeOptions = [
    "HIIT",
    "yoga",
    "pilates",
    "cardio",
    "stretches",
    "dance",
  ].map((type) => (
    <div>
      <input
        type="checkbox"
        onChange={() => handleClickCheckbox(type)}
        id={type}
        name="workouttype"
        value="coding"
      />
      <label>{type}</label>
    </div>
  ));
  return (
    <>
      <label id="timeselector">Select workout time: </label>
      <select
        id="timeselector"
        value={duration}
        onChange={(e) => setDuration(parseInt(e.target.value))}
      >
        {timeOptions}
      </select>
      <MaxCheckMessage duration={duration} />
      <fieldset>
        <legend>Choose by body part</legend>
        {bodyPartOptions}
        <legend>Choose by workout type</legend>
        {workoutTypeOptions}
      </fieldset>

      <button onClick={() => console.log(duration, tags)}>
        Give me some vids!
      </button>
    </>
  );
}
