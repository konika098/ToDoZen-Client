import Lottie from "lottie-react";
import devAnni from "../Banner/Dev_lottie.json"
import corporateAnni from "../Banner/Corporate_lottie.json"
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
const Benefit = () => {
    AOS.init();
    return (
        <div className="bg-gray-50 pb-[100px] pt-[60px]">
            <div className="max-w-[1280px] mx-auto">
                <div>
                    <h2 className="text-center text-[42px] font-bold text-[#701a75]">Who are using ToDoZen</h2>
                    <h3 className="text-center">Let's see who are using Todoist, to manage their daily task and how they are getting benefits</h3>
                </div>
                <section className="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2 sm:items-center">
                <div data-aos="fade-up-right">
                        <Lottie animationData={devAnni} loop={true} />
                    </div>
                    {/* <Lottie animationData={corporateAnni} loop={true} /> */}

                    <div className="p-8 md:p-12 lg:px-16 lg:py-24">
                        <div data-aos="fade-up-right" className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
                            <h2 className="text-2xl font-semibold text-gray-900 md:text-3xl">
                                Millions of developers choice to manage their task
                            </h2>

                            <p className="hidden text-gray-500 md:mt-4 md:block">
                                Our platform is meticulously crafted to align with the unique needs of developers. With an intuitive interface and powerful features, we empower developers to streamline their workflow, helping them focus on what they do best – coding. Whether you're a solo developer or part of a collaborative team, our task management tools are designed to enhance productivity and reduce friction in your development process.
                            </p>

                            <div className="mt-4 md:mt-[50px]">
                                <Link
                                    to='pricing'
                                    className="px-8 py-3 text-lg font-semibold rounded bg-[#701a75] text-white hover:bg-transparent hover:text-[#701a75] hover:border hover:border-[#701a75] transition ease-linear duration-300"
                                >
                                    Buy Developer plans
                                </Link>
                            </div>
                        </div>
                    </div>

                </section>
                <section className="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2  sm:items-center">
                    <div className="p-8 md:p-12 lg:px-16 lg:py-24">
                        <div  data-aos="fade-up-right" className="mx-auto max-w-xl text-center  ltr:sm:text-left rtl:sm:text-right">
                            <h2 className="text-2xl font-semibold text-gray-900 md:text-3xl">
                                Elevate Your Corporate Productivity with Todoist
                            </h2>

                            <p className="hidden text-gray-500 md:mt-4 md:block">
                                Thousands of corporate officer's firrst choice is Todoist. In the fast-paced world of corporate operations, effective planning is paramount. Our task management platform provides corporate professionals with a centralized hub to organize and plan tasks strategically. From project timelines to daily workflows, our intuitive tools empower professionals to stay ahead of deadlines and deliver exceptional results.
                            </p>

                            <div className="mt-4 md:mt-[50px]">
                                <Link
                                   
                                    className="px-8 py-3 text-lg font-semibold rounded bg-[#701a75] text-white hover:bg-transparent hover:text-[#701a75] hover:border hover:border-[#701a75] transition ease-linear duration-300"
                                >
                                    Buy Corporate plans
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                        <Lottie animationData={corporateAnni} loop={true} />
                    </div>
                    {/* <img
                        alt="Violin"
                        src="https://images.unsplash.com/photo-1484959014842-cd1d967a39cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                        className="h-full w-full object-cover sm:h-[calc(100%_-_2rem)] sm:self-end sm:rounded-ss-[30px] md:h-[calc(100%_-_4rem)] md:rounded-ss-[60px]"
                    /> */}
                </section>
            </div>
        </div>
    );
};

export default Benefit;