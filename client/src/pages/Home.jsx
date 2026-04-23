import Navbar from '../components/Navbar';

console.log("Navbar: ", Navbar)

export default function Home(){
    return(
        <>
            <Navbar />
            <main>
                <h1>This is hte home page</h1>
            </main>
        </>
    );
}