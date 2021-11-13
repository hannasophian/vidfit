interface MaxCheckMessageProps {
  duration: number;
}
export default function MaxCheckMessage(
  props: MaxCheckMessageProps
): JSX.Element {
  switch (props.duration) {
    case 10:
      return <p>Select 1 box</p>;
      break;
    case 15:
      return <p>Select 1 box</p>;
      break;
    case 20:
      return <p>Select 1-2 boxes</p>;
      break;
    case 30:
      return <p>Select 1-2 boxes</p>;
      break;
    case 45:
      return <p>Select 1-2 boxes</p>;
      break;
    case 60:
      return <p>Select 1-3 boxes</p>;
      break;
    default:
      return <></>;
  }
}
