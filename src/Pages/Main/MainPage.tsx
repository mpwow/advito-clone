import Header from "../../components/Header/Header.tsx";
import CardsList from "../../components/CardsList/CardsList.tsx";

const MainPage = () => {
    return (
        <>
            <div className="header-container">
                <Header onClick={()=>{console.log("clicked")}} />
            </div>
            <CardsList />
        </>
    )
}

export default MainPage;