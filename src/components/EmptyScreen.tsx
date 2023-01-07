interface Props {
  text: string;
}

function EmptyScreen(props: Props): JSX.Element {
  const { text } = props;
  return <div className=" mt-[200px] text-5xl text-gray-300">{text}</div>;
}

export default EmptyScreen;
