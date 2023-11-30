import { useSelector } from "react-redux";
import { preloader } from "../../redux/preloader/selector";
import { PreloaderContainer } from "./Preloader.styled";
//@ts-ignore
import spinner from "../../assets/Spinner/Spinner.gif";

export const Preloader = () => {
  const isLoading = useSelector(preloader);
  return (
    <PreloaderContainer>
      {isLoading && <img  src={spinner}></img>}
    </PreloaderContainer>
  );
};
