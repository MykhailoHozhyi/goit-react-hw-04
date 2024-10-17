import { Triangle } from 'react-loader-spinner';

export default function Loader() {
  return (
    <Triangle
      visible={true}
      height="50"
      width="50"
      color="#4fa94d"
      ariaLabel="triangle-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
}
