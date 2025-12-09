import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

const PublicLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );
};

export default PublicLayout;
