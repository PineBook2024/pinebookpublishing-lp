import BrandFooter from "./components/BrandFooter";
import Footer from "./components/Footer";
import PrimaryHeader from "./components/PrimaryHeader";
import Header from "./components/header";
import Head from "next/head";

export default function Privacy() {

    return (
        <>
            <Head>
                <title>Privacy Policy | Pine Book Publishing</title>
                <link rel="shortcut icon" href="/images/fav.png" />
            </Head>
            <PrimaryHeader
                title="Privacy Policy"
            />
            <div className="container privacy-policy mx-auto w-full px-10 md:px-32 pt-64 md:pt-96 mb-20 width-container">
                <p>
                    The categories of personal information we gather, how we use it, and who we might share it with are described in this privacy statement. It also explains your options for how your data will be used, the security measures in place to safeguard your information, how to fix informational errors, the confidentiality of the services, and the validity of the content.
                </p>
                <h2 className="font-poppins">
                    1. Information Gathering and Utilization
                </h2>
                <p>
                    1.1 We are the only ones responsible for the data gathered on this website. Only the information you voluntarily give us via email or other direct contact methods is accessible to us. This information will never be rented or sold to a third party.
                </p>
                <p>
                    1.2 For your identification and calm cooperation, we may gather the following data:
                </p>
                <ul>
                    <li>Name, company name, and position title.</li>
                    <li>Contact information, such as a website, email address, or phone number.</li>
                </ul>
                <p>
                    1.3 We need this information in order to better understand your needs and serve you, as well as for the following reasons:
                </p>
                <ul>
                    <li>Enhancing our goods and services.</li>
                    <li>Get in touch with you to get your thoughts on our services.</li>
                    <li>Make the website your own by adding your interests.</li>
                </ul>
                <h2 className="font-poppins">
                    2. Your Information Control and Access Rights
                </h2>
                <p>
                    2.1 You are free to stop getting in touch with us in the future. Additionally, you have the right to:
                </p>
                <ul>
                    <li>View the information we may have about you.</li>
                    <li>Update/correct any information we have about you.</li>
                    <li>Request that we delete any information we may have about you.</li>
                    <li>Express any skepticism you may have regarding how we use your data.</li>
                </ul>
                <p>
                    To exercise these rights, kindly get in touch with us at the phone number or email address listed on our website.
                </p>
                <h2 className="font-poppins">
                    3. Security
                </h2>
                <p>
                    3.1 We are devoted to protecting the security of your information. We have put in place the necessary physical, electronic, and managerial safeguards to keep the information we collect online secure in order to prevent unauthorized access or disclosure.
                </p>
                <p>
                    3.2 Access to personally identifiable information is only given to our contractors and employees who require it to carry out a specific task (such as providing the services you have requested or billing for them).
                </p>
                <p>
                    3.3 To maintain the privacy of your information, the servers or computers used to store personally identifiable information are kept in a secure setting. Secure Sockets Layer (SSL) software, which encrypts the information, is used at [name] to keep information extremely secure during transmission.
                </p>
                <p>
                    3.4 Despite the precautions we take to safeguard your personal information, you should be aware that no method of transmission over the Internet or method of electronic storage is 100 percent secure. Your personal information's complete security is not something we can guarantee.
                </p>
                <h2 className="font-poppins">
                    4. Payment
                </h2>
                <p>
                    4.1 We may need to gather personal data about you in order to process your order, including your billing address, phone number, name, and email address. Only our third-party credit card provider handles the credit card data. At the appropriate time, we will give our customer any additional pertinent information.
                </p>
                <h2 className="font-poppins">
                    5. IP Address and Cookies
                </h2>
                <p>
                    5.1 When you visit our website, non-personal information like your IP address is automatically recorded. This information is only used to analyze server issues and manage websites. Cookies are used on this website to improve user experience and compile usage data.
                </p>
                <p>
                    5.2 Cookies, which are alphanumeric identifiers, help our systems recognize customers' browsers and store items in their Shopping Carts over the course of visits.
                </p>
                <p>
                    5.3 While the majority of browsers accept cookies by default, you can change your browser's settings to reject new cookies, disable cookies, or get alerts when a new cookie is received.
                </p>
                <p>
                    5.4 Third parties do not have access to information about the types of browsers used, access times, URLs used to access our site, or URLs that visitors view while on it, unless it is combined with other information.
                </p>
                <h2 className="font-poppins">
                    6. Details about Our Products and Services
                </h2>
                <p>
                    6.1 We make every effort to provide the most accurate descriptions of the services and goods available on our website. Please email or call us right away if you believe the service you received from us differs from the descriptions on this website.
                </p>
                <h2 className="font-poppins">
                    7. Ownership and discretion
                </h2>
                <p>
                    7.1 Despite the fact that some services may need rewards for sales or recognition, our service is completely confidential. Under no circumstances will any communication or content that has been reviewed or created with the intention of collaborating be disclosed to any other party. Regarding the goods and services, we offer you, we make no reservations. Everything we write or edit is regarded as the client's exclusive property. If you come into contact with us, you will only be acknowledged as the material's owner or author.
                </p>
                <h2 className="font-poppins">
                    8. Originality
                </h2>
                <p>
                    8.1 For a client, we ghostwrite all of the original, plagiarism-free content that is not taken verbatim from any other source. To guarantee the material's originality, authenticity, and dependability, all information provided to a client that was drawn from or researched from any other source will be rephrased and properly cited.
                </p>
                <h2 className="font-poppins">
                    9. Sharing with Third Parties
                </h2>
                <p>
                    9.1 We never share your personal information with outside parties.
                </p>
                <p>
                    9.2 Under no circumstances do we give or sell our customers' personal information to outside parties.
                </p>
                <p>
                    9.3 We only use the assistance of credit card processing businesses for billing needs. Exclusive information is not shared, saved, stored, or used for any other purposes by these businesses.
                </p>
                <p>
                    9.4 "INFORMATION COLLECTED VIA SMS OPT-IN WILL NOT BE SOLD, RENTED OR SHARED"
                </p>
                <h2 className="font-poppins">
                    10. Contact Us
                </h2>
                <p>
                    If you believe that we are not abiding by this privacy statement or if you have any questions or complaints about how we have handled your personal information, please get in touch with us right away by email at [enter email here] or by phone at [enter phone number if necessary]. Your question will be answered as soon as possible by our customer support team.
                </p>

            </div>
            {/* <Footer /> */}
            <BrandFooter />
        </>
    );
}