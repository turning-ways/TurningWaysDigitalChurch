import Modal from "../../ui/Modal/Modal";
import { useAddLabel } from "../../hooks/useContact";
import { useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

const ShowLabels = ({ onClose }: { onClose: () => void }) => {
  const { contact_id } = useParams();
  const addLabelQuery = useAddLabel(onClose, contact_id ?? "");
  return (
    <Modal onClose={onClose}>
      <div
        className={`sm:w-[400px]  bg-white px-6 py-6 border rounded-2xl flex flex-col space-y-4`}
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
                const randomIndex = Math.floor(Math.random() * colors.length);
                const color = colors[randomIndex];
                addLabelQuery.mutate({ label: item, labelType: color });
              }}
            >
              {item}
            </li>
          </ul>
        ))}
        <button
          className=" bg-[#F3F3F3] w-32 text-[#7A7A7A] self-center flex justify-center rounded-[14px] py-2"
          onClick={onClose}
          disabled={addLabelQuery.isPending}
        >
          {!addLabelQuery.isPending ? (
            <p>Cancel</p>
          ) : (
            <ThreeDots width={24} height={24} color="black" />
          )}
        </button>
      </div>
    </Modal>
  );
};

export default ShowLabels;

export const labels = [
  "Undefined",
  "Will attend service",
  "Unreachable",
  "Wrong number",
  "Visiting, not a member",
  "Visiting from another branch",
  "Attends another church",
  "Did not pick up",
  "Number owned by a different person",
  "Others",
];
