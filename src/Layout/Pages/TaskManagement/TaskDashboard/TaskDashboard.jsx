import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProviderContext } from "../../../../Provider/Provider";
import { useContext, useState } from "react";
import useAllTask from "../../../../hooks/useAllTask";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import useAllOngoing from "../../../../hooks/useAllOngoing";
import DraggableTaskItem from "./DraggableTaskItem/DraggableTaskItem";
import OngoingList from "./OngoingList/OngoingList";
import CompletedList from "./CompletedList/CompletedList";
import useAllCompleted from "../../../../hooks/useAllCompleted";


const TaskDashboard = () => {

    const [allCompleted, completedRefetch] = useAllCompleted()
    const [allOngoing, ongoingRefetch] = useAllOngoing()
    const [allTask, refetch] = useAllTask()
    const { user } = useContext(ProviderContext)
    // console.log(allTask)

    // console.log('new', user?.email);
    const axiosSecure = useAxiosSecure()

    const { register, handleSubmit } = useForm()
    const onSubmit = async (data) => {
        // console.log(data)
        const TodoItem = {
            ...data,
            userEmail: user.email,
        };
        // console.log(TodoItem)
        // const TodoItem = {

        // }

        const todoRes = await axiosSecure.post('/todoList', TodoItem)
        console.log(todoRes.data, 'success')
        if (todoRes.data.insertedId) {
            // show success\
            refetch()
            // console.log('success')
            toast.success('Task Added', {
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
    }


    const [{ isDragging }, drag] = useDrag(() => ({
        // what type of item this to determine if a drop target accepts it
        type: "li",
        // data of the item to be available to the drop methods
        // item: { id: image.id, index },
        // method to collect additional data for drop handling like whether is currently being dragged
        collect: (monitor) => {
            return {
                isDragging: !!monitor.isDragging(),
            };
        },
    }));


    // drop from ongoing
    // droppable
    const [{ isOver }, drop] = useDrop(() => ({
        accept: ["Ongoing", "Completed"], // Specify the accepted drag type
        drop: (item) => {
            // console.log("Dropped item:", item); // Log the dropped item
            handleDrop(item)
            // onDrop(item);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }
    ));
    console.log(isOver, 'isOver');


    // Define an asynchronous function
    const handleDrop = async (item) => {
        // console.log("this is item", item._id); // Log the dropped item
        try {
            const res = await axiosSecure.delete(`/ongoingList/${item._id}`)
            const res3 = await axiosSecure.delete(`/completedList/${item._id}`)
            const ongoingRes = await axiosSecure.post('/todoList', item)
            // console.log(ongoingRes.data, 'success')
            if (ongoingRes.data.insertedId) {
                // show success\
                refetch()
                // console.log(ongoingRes.data)
                toast.success('Task Added to ToDo list', {
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
            // Handle the result of the axios post if needed
            completedRefetch()
            ongoingRefetch()
            // Call the onDrop function after the asynchronous operation is complete
            // onDrop(item);
        } catch (error) {
            console.error("Error while posting todo:", error);
        }
    };
    // console.log(onDrop);

    return (
        <div>
            <div className="max-w-[1280px] mx-auto">
                <ToastContainer />
                <div className="">
                    <div className="p-9 mb-[40px]">
                        <div className="mb-[40px] ">
                            <h3 className="text-[36px] font-bold text-center parisienne-font">Hey, {user.displayName}</h3>
                            <p className="text-center">Here is your task management dashboard, <br />increase your productiveness</p>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-2 gap-3">
                                <label
                                    htmlFor="Title"
                                    className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-[#701a75] focus-within:ring-1 focus-within:ring-[#701a75]"
                                >
                                    <input
                                        type="text"
                                        id="Title"
                                        className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 h-[40px] pl-3"
                                        placeholder="Title"
                                        {...register("Title", {})}
                                    />

                                    <span
                                        className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                                    >
                                        Title of the task
                                    </span>
                                </label>

                                <label
                                    htmlFor="Deadlines"
                                    className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-[#701a75] focus-within:ring-1 focus-within:ring-[#701a75]"
                                >
                                    <input
                                        type="number"
                                        id="Deadlines"
                                        className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 h-[40px] pl-3"
                                        placeholder="Deadlines (Day)"
                                        {...register("Deadlines", {})}
                                    />

                                    <span
                                        className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                                    >
                                        Deadline for your task
                                    </span>
                                </label>

                                <label
                                    htmlFor="Description"
                                    className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-[#701a75] focus-within:ring-1 focus-within:ring-[#701a75]"
                                >
                                    <input
                                        type="text"
                                        id="Description"
                                        className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 h-[40px] pl-3"
                                        placeholder="Description"
                                        {...register("Description", {})}
                                    />

                                    <span
                                        className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                                    >
                                        Description for the task
                                    </span>
                                </label>

                                <label
                                    htmlFor="Title"
                                    className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-[#701a75] focus-within:ring-1 focus-within:ring-[#701a75]"
                                >
                                    <select {...register("Priority")}>
                                        <option value="Not Selected">Priority</option>
                                        <option value="Low">Low</option>
                                        <option value="Moderate">Moderate</option>
                                        <option value="High">High</option>
                                    </select>
                                </label>
                            </div>
                            <div className="flex justify-center pt-5">
                                <input
                                    type="submit"
                                    value={'Add to the ToDo list'}
                                    className="w-[320px] bg-[#701a75] p-2 rounded-md text-white  font-semibold text-[16px]"
                                />
                            </div>
                        </form>
                    </div>
                    <div className="flex items-center flex-col gap-3 px-[10px] md:justify-evenly md:flex-row md:items-start">
                        {/* todolist */}
                        <div ref={drop} className={`w-full md:min-h-[230px] md:w-[384px] rounded-lg p-5 ${isOver ? 'bg-purple-500' : 'bg-[#701a75]'}`}>
                            <div>
                                <h3 className="text-[22px] font-bold text-center mb-4 text-white">ToDo List</h3>
                            </div>

                            <ul className="shadow sm:rounded-md max-w-sm" ref={drag}>
                                {
                                    allTask?.map((task, index) => (
                                        <DraggableTaskItem key={task._id} task={task} onRefetch={refetch} />
                                    ))
                                }
                            </ul>

                        </div>

                        {/* ongoing list */}
                        {/* Render the OngoingList component */}
                        <OngoingList onDrop={allTask} onRefetch={refetch} />

                        {/* ... */}

                        {/* completed list */}
                        <CompletedList onDrop={allTask} onRefetch={refetch}></CompletedList>
                    </div>
                </div>
            </div >
        </div>
    );
};

export default TaskDashboard;