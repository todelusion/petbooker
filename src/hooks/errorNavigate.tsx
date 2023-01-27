import { useNavigate } from "react-router-dom";

const errorNavigate = (isError: boolean): void => {
  const navigae = useNavigate();
  if (!isError) return;
  navigae("/404");
};

export default errorNavigate;
