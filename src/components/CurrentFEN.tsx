import useGetPosition from "../hooks/useGetPosition";
import { convertObjToFen } from "../utils/fenConverter";

export default function CurrentFEN() {
  const getPosition = useGetPosition();

  return <p className="mb-2 text-sm">{convertObjToFen(getPosition())}</p>;
}
