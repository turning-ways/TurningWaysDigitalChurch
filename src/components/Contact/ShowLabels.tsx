import Modal from '../../ui/Modal/Modal';
import { useAddLabel } from '../../hooks/useContact';

const ShowLabels = ({onClose}:{onClose: () => void}) => {
    const addLabelQuery = useAddLabel(onClose);
  return (
    <Modal onClose={onClose}>
            <div
              className={`w-[400px] bg-white px-6 py-6 border rounded-2xl flex flex-col space-y-4`}
            >
              {labels.map((item) => (
                <ul className="text-[#555555]">
                  <li
                    className="cursor-pointer"
                    onClick={() => {
                      const colors = [
                        "red",
                        "green",
                        "yellow",
                        "blue",
                        "purple",
                        "orange",
                        "grey",
                      ];
                      const randomIndex = Math.floor(
                        Math.random() * colors.length
                      );
                      const color = colors[randomIndex];
                      addLabelQuery.mutate({ label: item, labelType: color });
                    }}
                  >
                    {item}
                  </li>
                </ul>
              ))}
              <button
                className="px-10 w-fit bg-[#F3F3F3] text-[#7A7A7A] self-center rounded-[14px] py-2"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </Modal>
  )
}

export default ShowLabels

export const labels = [
    "Undefined",
    "Will attend service",
    "Unreachable",
    "Wrong number",
    "Visiting"
  ];