import { useDrag } from "react-dnd";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const DraggableTaskItem = ({ task, onRefetch }) => {
    // [allTask, refetch]
    const axiosSecure = useAxiosSecure()
    // useDrag hook to make the component draggable
    const [{ isDragging }, drag] = useDrag(() => ({
        // Specify the drag type as "TASK"
        type: "TASK",
        // Provide item data (task ID) for the drop handling
        item: task,
        // Collect function to get the dragging state
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const handleDelete = (taskID) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res1 = await axiosSecure.delete(`/todoList/${taskID}`)
                const res2 = await axiosSecure.delete(`/todoList2/${taskID}`)
                onRefetch()
                Swal.fire({
                    title: "Deleted!",
                    text: "Task has been deleted successfully",
                    icon: "success"
                });
            }
        });
    }

    // Render the draggable task item
    return (
        // Attach the drag ref to the li element
        <li ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }} className="mb-2 bg-white rounded-md">
            {/* Your task item content goes here */}
            <div className="px-4 py-5 sm:px-6">
                <div className="flex flex-col items-start justify-between">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{task.Title}</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">{task.Description}</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <div className="flex flex-col">
                        <p className="text-sm font-medium text-gray-500">Priority: <span className="text-green-600">{task.Priority}</span></p>
                        <p className="text-sm font-medium text-gray-500">Deadline: <span className="text-green-600">{task.Deadlines}</span></p>
                    </div>

                    <div className="flex gap-2">
                        <FaEdit className="text-[20px] text-indigo-600 hover:text-green-500" />
                        <MdDelete onClick={() => handleDelete(task._id)} className="text-[22px] text-indigo-600 hover:text-red-500" />
                    </div>
                </div>
            </div>
        </li>
    );
};

export default DraggableTaskItem