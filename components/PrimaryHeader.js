export default function PrimaryHeader(props) {
    return (
        <>
            <header class="header-bg py-5">
                <div class="container">
                    <div class="row py-5">
                        <div class="col-12">
                            <h3 class="fs-0 text-gradient ps-10 md:ps-64 font-poppins">
                                {props.title}</h3>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}