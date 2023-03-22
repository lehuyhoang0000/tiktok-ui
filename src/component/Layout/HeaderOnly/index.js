import Header from "~/component/Layout/components/Header";

function DefalutLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="container">

                <div className="content">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default DefalutLayout;