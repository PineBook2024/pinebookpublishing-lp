import Footer from "./components/Footer";
import PrimaryHeader from "./components/PrimaryHeader";
import Header from "./components/header";
import Link from "next/link";
import Head from "next/head";
import BrandFooter from "./components/BrandFooter";
import BrandPrimaryHeader from "./components/BrandPrimaryHeader";
import BrandNavbar from "./components/BrandNavbar";

export default function Privacy() {

    return (
        <>
            <Head>
                <title>Terms and Conditions | Pine Book Publishing</title>
                <meta
                    name="description"
                    content="Explore the whole set of terms and conditions that Pine Book Publishing has to offer. Use our carefully considered rules to ensure protection and compliance."
                />
                <link rel="shortcut icon" href="/images/fav.png" />
            </Head>

            <BrandNavbar />
            <BrandPrimaryHeader
                // subtitle="Enhance Your Book's Readability With"
                title="Terms and Conditions"
            // desc="Are you in search of expert book formatting services to get your manuscript formatted well? If so, then we're here to help. At Pine Book Publishing, we offer professional book formatting services to blow life into your book. Our expert team of book formatters will work together with you to give your book a professional and polished look. Get a free quote now!"
            />
            <div className="container privacy-policy mx-auto w-full px-10 md:px-32 pt-10 md:pt-24 mb-20 width-container">
                {/* <h1 className="font-poppins">Terms and Conditions</h1> */}
                <h2 className="font-poppins">Acceptance of Terms</h2>
                <p>
                    By using the Pine Book Publishing website, you agree to be bound by these Terms and Conditions. If you do not agree to these Terms and Conditions, you are not authorized to use the website.
                </p>
                <h2 className="font-poppins">Intellectual Property Rights</h2>
                <p>
                    All content on the website, including but not limited to text, images, and videos, is the property of Pine Book Publishing or its licensors. You may not use any of the content on the website without the express permission of Pine Book Publishing.
                </p>

                <h2 className="font-poppins">Indemnification</h2>
                <p>
                    You agree to indemnify and hold Pine Book Publishing harmless from any and all claims, losses, damages, liabilities, costs, and expenses (including reasonable attorneys' fees) arising out of or in connection with your use of the website.
                </p>

                <h2 className="font-poppins">Limitation of Liability</h2>
                <p>
                    Pine Book Publishing is not liable for any damages, including but not limited to direct, indirect, incidental, consequential, or punitive damages, arising out of or in connection with your use of the website.
                </p>

                <h2 className="font-poppins">Severability</h2>
                <p>
                    If any provision of these Terms and Conditions is held to be invalid or unenforceable, such provision will be struck from these Terms and Conditions, and the remaining provisions will remain in full force and effect.
                </p>

                <h2 className="font-poppins">Governing Law</h2>
                <p>
                    These Terms and Conditions will be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.
                </p>

                <h2 className="font-poppins">Modification to Terms:</h2>
                <p>
                    Pine Book Publishing reserves the right to modify, amend, or update these Terms and Conditions at any time without notice. It is your responsibility to regularly review and stay informed of changes. By continuing to use the website after modifications to these Terms and Conditions, you indicate your acceptance of the updated terms.
                </p>

                <h2 className="font-poppins">Entire Agreement</h2>
                <p>
                    These Terms and Conditions constitute the entire agreement between you and Pine Book Publishing with respect to your use of the website and supersede all prior or contemporaneous communications, representations, or agreements, whether oral or written.
                </p>

                <h1 className="font-poppins mb-4">BOOK EDITING & PUBLISHING T&CS:</h1>

                <h2 className="font-poppins">Manifesto/Project Proposal,</h2>
                <p>
                    Pine Book Publishing offers a personalized and customized environment for users to submit their project requirements through the convenient "Talk to Us" page. We provide various online and offline contact resources to ensure easy and authentic communication with our support team.
                </p>

                <h2 className="font-poppins">Data Loss and Backup</h2>
                <p>
                    Users must acknowledge that they use the Pine Book Publishing website at their own risk. Pine Book Publishing does not guarantee the prevention of data loss. Users are fully responsible for their use of the website and any associated consequences.
                </p>

                {/* <h2 className="font-poppins">SMS Terms and Conditions</h2>
                <p>
                    By subscribing to text marketing notifications, users agree to receive recurring marketing messages and shopping cart reminder messages. To unsubscribe, users can reply "STOP" at any time. Message and data rates may apply, and message frequency varies.
                </p>

                <p>For Help: <Link href="tel:(866) 841-7469">(866) 841-7469</Link> or <Link href='mailto:support@pinebookpublishing.com'>support@pinebookpublishing.com </Link></p>
                <p>To unsubscribe from the program, reply "STOP" at any time.</p>

                <p className="small-text"><b>*Message and data rates may apply.</b></p>
                <p className="small-text"><b>*Message frequency varies.</b></p> */}

                <h2 class="font-poppins">SMS Terms and Conditions</h2>
                <ol className="terms-condition-bullets">
                    <li className="font-poppins text-2xl font-bold">SMS Consent Communication:</li>
                    <p className="pt-2">The information <Link href={"tel:(866) 841-7469"} className=" hover:text-blue-500 text-blue-500">(866) 841-7469</Link> obtained as part of the SMS consent process will not be shared with third parties for marketing purposes.</p>
                    <li className="font-poppins text-2xl font-bold">Types of SMS Communications:</li>
                    <p className="pt-2">If you have consented to receive text messages from Pine Book Writing inc, you may receive: </p>
                    <div className="terms-condition-bullets-subs pb-2">
                        <p className="flex items-center"> <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z" fill="#000000" />
                        </svg> Follow-Up Messages</p>
                        <p className="flex items-center"> <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z" fill="#000000" />
                        </svg> Appointment Reminders</p>
                    </div>
                    <p>Example: Following up on our conversation yesterday, do you need any additional information from me?</p>
                    <li className="font-poppins text-2xl font-bold">Message Frequency:</li>
                    <p className="pt-2">Message frequency may vary depending on the type of communication. For example, you may receive up to 100 SMS messages per week related to your services. </p>
                    <li className="font-poppins text-2xl font-bold">Potential Fees for SMS Messaging:</li>
                    <p className="pt-2">Please note that standard message and data rates may apply depending on your carrier’s pricing plan. These fees may vary if the message is sent domestically or internationally. </p>
                    <li className="font-poppins text-2xl font-bold">Opt-In Method:</li>
                    <p className="pt-2">You may opt-in to receive SMS messages from Pine Book Publishing in the following ways: </p>
                    <div className="terms-condition-bullets-subs pb-2">
                        <p className="flex items-center"><svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z" fill="#000000" />
                        </svg> By submitting an online form</p>
                    </div>
                    <li className="font-poppins text-2xl font-bold">Opt-Out Method:</li>
                    <p className="pt-2">You can opt-out of receiving SMS messages at any time. To do so, simply reply "STOP" to any SMS message you receive. Alternatively, you can contact us directly to request removal from our messaging list. </p>
                    <li className="font-poppins text-2xl font-bold">Help:</li>
                    <p className="pt-2">If you are experiencing any issues, you can reply with the keyword HELP. Or, you can get help directly from us at <a href="https://pinebookpublishing.com/" target="_blank" className=" hover:text-blue-500 text-blue-500">https://pinebookpublishing.com/</a>  </p>
                    <p className="text-xl font-poppins">Additional Options: </p>
                    <p>If you do not wish to receive SMS messages, you can choose not to check the SMS consent box on our forms.</p>
                    <li className="font-poppins text-2xl font-bold">Standard Messaging Disclosures:</li>
                    <p className="text-xl pt-2">Message and data rates may apply.<br></br>
                        You can opt-out at any time by texting "STOP."<br></br>
                        For assistance, text "HELP" or visit our <Link href={"privacy-policy"} target="_blank" className=" hover:text-blue-500 text-blue-500">Privacy Policy</Link> and <Link href={"terms-and-conditions"} target="_blank" className="text-blue-500 hover:text-blue-500">Terms and Conditions</Link> pages.<br></br>
                        Message frequency may vary.<br></br>
                    </p>
                </ol>

                <h2 className="font-poppins">Endorsement</h2>
                <p>
                    By using this website, users agree to defend Pine Book Publishing and its directors, officers, managers, employees, and representatives against any loss, damage, or expense arising from third-party claims related to their name or its use. Pine Book Publishing does not claim ownership of user-provided content.
                </p>
                <p>
                    If users share their website with Pine Book Publishing for project proposals or work activities, all elements on their website are considered their own publications. Pine Book Publishing assumes no liability for user-posted content on its own domains.
                </p>
                <p>Users retain full ownership of their trademarks, brand names, logos, graphics, design themes, content, words, pictures, images, ideas, visuals, and illustrations. Pine Book Publishing does not claim ownership of these elements.</p>
                <h2 className="font-poppins">
                    Accountability
                </h2>
                <p>
                    Pine Book Publishing does not accept any responsibility for any damages, including incidental and consequential damages, resulting from the downtime or unavailability of Pine Book Publishing's servers. Pine Book Publishing also does not accept any responsibility for any damages resulting from the corruption or removal of any website from one of its servers. The only remedy for any damages is the immediate cancellation of your service.
                    <br></br>
                    Pine Book Publishing will make every effort to keep the website operating smoothly and free of bugs and glitches. However, Pine Book Publishing does not accept any responsibility for any interruptions or delays in access to the website or for any loss or damage resulting from the transfer of data on the website.
                    <br></br>
                    Pine Book Publishing also does not accept any responsibility for any loss or damage caused by someone else using or abusing the primary information provided by users. Pine Book Publishing does not accept any responsibility for any errors, omissions, or misstatements in any information or service provided hereunder. Pine Book Publishing does not accept any responsibility for the deletion or non-storage of email messages. Pine Book Publishing does not accept any responsibility for a user's inability to use our mail service. Pine Book Publishing does not accept any responsibility for any loss or damage that you might suffer as a result of the websites and our processing of your application for our services.
                </p>

                <h2 className="font-poppins">
                    Denial
                </h2>
                <p>
                    Pine Book Publishing reserves the right to determine what constitutes a violation of these acceptable use terms and conditions. Pine Book Publishing may modify or update this statement at any time. Pine Book Publishing also reserves the right, in its sole discretion, to reject, revoke, or suspend service.
                    <br></br>
                    The validity of any provision of this Agreement of Terms and Conditions for Use of Website shall not in any way affect the validity of the remaining provisions of this Agreement on Terms and Conditions. Pine Book Publishing may amend or replace any such invalid provision with one that is entirely valid and that, to the greatest extent possible, achieves the original goals and intentions of Pine Book Publishing as expressed in the relevant original provision.
                    <br></br>
                    The website terms and conditions are subject to change at any time by Pine Book Publishing without prior notice or caution. Pine Book Publishing strongly advises its users to review and read this statement of use of website terms and conditions frequently.
                    <br></br>
                    All prior proposals, agreements, or other communications made to users of Pine Book Publishing's website are superseded by and are governed by this statement of agreement.
                </p>

                <h2 className="font-poppins">
                    Trademarks and Copyrights
                </h2>
                <p>
                    The customer hereby fully declares that all trademark and/or copyright permissions are in full force and effect with respect to all logos, names, graphics, design themes, brand names, trademarks, content, words, pictures, images, ideas, visuals, illustrations, and other data provided to Pine Book Publishing for inclusion in the customer's website or other medium. Such materials will continue to be the customer's property.
                    <br></br>
                    Any original artwork, photographs, or other materials created by Pine Book Publishing for a client will remain the property of Pine Book Publishing and/or its suppliers. The right to use materials (over which Pine Book Publishing has the copyright) in ways other than those for which they were originally provided may be requested in writing by the customer, and Pine Book Publishing may, at its discretion, grant it. Before any of the aforementioned creative work or artwork, images, texts, or other data may be consumed, written permission for its use must be obtained.
                    <br></br>
                    Users consent to indemnify and hold Pine Book Publishing harmless from any and all claims resulting from the customer's failure to first secure all necessary copyright and/or other permissions or grants.
                </p>

                <h1 className="font-poppins mb-4">Cancellation and Refund Policy</h1>

                <h2 className="font-poppins">
                    Refund Policy
                </h2>
                <p>
                    Pine Book Publishing offers a 100% refund for orders placed within one hour of purchase. After one hour, orders are considered final and cannot be canceled. If you are dissatisfied with your order, you may request a refund within 30 days of receiving it. Pine Book Publishing will refund your money minus a 50% early termination fee.
                </p>
                <p>1. You may cancel your order for any reason within one hour of placing it.<br></br>
                    2. After one hour, your order is considered final and cannot be canceled.<br></br>
                    3. If you are dissatisfied with your order, you may request a refund within 30 days of receiving it.<br></br>
                    4. Pine Book Publishing will refund your money minus a 50% early termination fee.<br></br>
                </p>


                <h2 className="font-poppins">
                    Chargebacks and Disputes Policy
                </h2>
                <p>
                    You agree that you will not charge back or dispute any charges made to your credit card or bank account for services provided by Pine Book Publishing. If you do a chargeback or dispute a charge, Pine Book Publishing may charge you a fee and may also take legal action against you.
                </p>

                <h2 className="font-poppins">
                    Supersedence of Agreements
                </h2>
                <p>
                    All prior oral or written agreements and understandings, as well as all contemporaneous oral agreements and understandings between the users and Pine Book Publishing regarding the subject matter of this statement of use of website terms and conditions, are superseded by the provisions of this statement of website terms and conditions and the understanding between Pine Book Publishing and the users therein. Pine Book Publishing reserves the right to modify, amend, or update these Terms and Conditions without notice. You are responsible for regularly reviewing these Terms and Conditions to stay informed of any changes. Your continued use of the website after any changes to these Terms and Conditions will constitute your acceptance of those changes.
                </p>

                <h2 className="font-poppins">
                    Contact Information
                </h2>
                <p>
                    If you have any questions or require further information about the aforementioned terms and conditions, please do not hesitate to contact us at <Link href="mailto:support@pinebookpublishing.com" className=" hover:text-blue-500 text-blue-500">support@pinebookpublishing.com</Link> . We are available to assist you and address any inquiries you may have.
                </p>
            </div>
            {/* <Footer /> */}
            <BrandFooter />
        </>
    );
}