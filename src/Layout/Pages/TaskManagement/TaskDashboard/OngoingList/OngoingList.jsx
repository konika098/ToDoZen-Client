import { useContext } from "react";
import { ProviderContext } from "../../../../../Provider/Provider";
import useAllOngoing from "../../../../../hooks/useAllOngoing";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import { useDrag, useDrop } from "react-dnd";
import { toast } from "react-toastify";
import useAllCompleted from "../../../../../hooks/useAllCompleted";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const OngoingList = ({ onDrop, onRefetch }) => {
    const [allCompleted, completedRefetch] = useAllCompleted()
    const [allOngoing, ongoingRefetch] = useAllOngoing()
    const { user } = useContext(ProviderContext)
    const axiosSecure = useAxiosSecure()


    // droppable
    const [{ isOver }, drop] = useDrop(() => ({
        accept: ["TASK", "Completed"], // Specify the accepted drag type
        drop: (item) => {
            // console.log("Dropped item:", item); // Log the dropped item
            handleDrop(item)
            onDrop(item);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }
    ));


    // Define an asynchronous function
    const handleDrop = async (item) => {
        console.log("this is item", item._id); // Log the dropped item
        try {
            const res = await axiosSecure.delete(`/todoList/${item._id}`)
            const res2 = await axiosSecure.delete(`/todoList2/${item._id}`)
            const res3 = await axiosSecure.delete(`/completedList/${item._id}`)
            const ongoingRes = await axiosSecure.post('/ongoingList', item)
            // console.log(ongoingRes.data, 'success')
            if (ongoingRes.data.insertedId) {
                // show success\
                ongoingRefetch()
                // console.log(ongoingRes.data)
                toast.success('Task Added to Ongoing list', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            // console.log(res.data);
            // console.log(res2.data);
            // Handle the result of the axios post if needed
            completedRefetch()
            onRefetch()
            // Call the onDrop function after the asynchronous operation is complete
            onDrop(item);
        } catch (error) {
            console.error("Error while posting todo:", error);
        }
    };
    // console.log(onDrop);



    const OngoingDrag = ({ task }) => {
        // useDrag hook to make the component draggable
        const [{ isDragging }, drag] = useDrag(() => ({
            // Specify the drag type as "TASK"
            type: "Ongoing",
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
                    const res1 = await axiosSecure.delete(`/ongoingList/${taskID}`)
                    ongoingRefetch()
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

    return (
        <div ref={drop} className={`w-full md:min-h-[230px] md:w-[384px] rounded-lg p-5 ${isOver ? 'bg-purple-500' : 'bg-[#701a75]'}`}>
            <h3 className="text-[22px] font-bold text-center mb-4 text-white">Ongoing task</h3>
            <ul className="shadow sm:rounded-md max-w-sm">
                {
                    allOngoing.map(ongoing => (
                        <OngoingDrag key={ongoing._id} task={ongoing}></OngoingDrag>
                    ))
                }

            </ul>
        </div>
    );
};

export default OngoingList