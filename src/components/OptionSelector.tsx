export default function OptionSelector(): JSX.Element {
  const timeOptions = [10, 15, 20, 30, 45, 60].map((time) => (
    <option>{time} mins</option>
  ));

  const bodyPartOptions = [
    "Full body",
    "Arms",
    "Abs",
    "Legs",
    "Butt",
    "Back",
  ].map((part) => (
    <div>
      <input type="checkbox" id={part} name="bodypart" value="coding" />
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
      <input type="checkbox" id={type} name="workouttype" value="coding" />
      <label>{type}</label>
    </div>
  ));
  return (
    <>
      <label id="timeselector">Select workout time: </label>
      <select id="timeselector">{timeOptions}</select>

      <fieldset>
        <legend>Choose by body part</legend>
        {bodyPartOptions}
      </fieldset>

      <fieldset>
        <legend>Choose by workout type</legend>
        {workoutTypeOptions}
      </fieldset>
    </>
  );
}
