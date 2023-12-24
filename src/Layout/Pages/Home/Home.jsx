import Footer from "./Footer";
import Banner from "./HomeComponents/Banner/Banner";
import Benefit from "./HomeComponents/Banner/Benefit";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Benefit/>
            <Footer/>
        </div>
    );
};

export default Home;