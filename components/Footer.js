import Link from "next/link";
import Image from "next/image";
import { faArrowRight, faArrowLeft, faPlusCircle, faCheckCircle, faMinusCircle, faPhone, faEnvelope, faMapLocation } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
  return (
    <footer className="text-white body-font">
      <div className="container px-5 pt-10 pb-10 md:pt-20 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col position-relative">
        <div className="lg:w-1/3 md:w-1/2 w-full flex-shrink-0 md:mx-20  mx-auto text-center md:text-left footer-line relative">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
            <Image src={"/images/f-logo.png"} width={250} height={200} className="mb-2"></Image>
          </a>
          <p className="mt-2 text-sm text-white leading-7">
            Pine Book Publishing is a team of passionate book publishers that
            believe in the power of storytelling and the importance of writers'
            ability to tell their tales. Our streamlined process and dedicated
            support make book publishing service a realistic and rewarding goal
            for any author.
          </p>
        </div>

        <div className="flex-grow flex flex-wrap -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <div className="lg:w-1/2 md:w-1/2 w-full px-4">
            <h2 className="title-font text-white tracking-widest text-2xl md:text-2xl mb-3 font-poppins">
              Contact Info
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link
                  href="tel:8668417469"
                  className="text-white text-md hover:text-white flex justify-center md:justify-start"
                >
                  <FontAwesomeIcon icon={faPhone} className="me-3" />
                  (888) 786-7135
                </Link>
              </li>
              <li className="mt-3">
                <Link
                  href="mailto:support@pinebookpublishing.com"
                  className="text-white hover:text-white text-md flex justify-center md:justify-start"
                >
                  <FontAwesomeIcon icon={faEnvelope} className="me-3" />
                  {" "}
                  support@pinebookpublishing.com{" "}
                </Link>
              </li>
              <li className="flex items-center justify-center md:justify-start mt-3 text-md">
                <FontAwesomeIcon icon={faMapLocation} className="me-3" />
                <div>
                  <p className="text-white text-md"><b>CANADA ADDRESS: </b> R-10225 Yonge St, Suite #250, Richmond Hill, ON L4C 3B2</p>
                </div>
              </li>
              <li className="flex items-center justify-center md:justify-start mt-3 text-md">
                <FontAwesomeIcon icon={faMapLocation} className="me-3" />
                <div>
                  <p className="text-white text-md"><b>USA ADDRESS: </b>211 E 43rd St, 7th Floor, Suite #424, New York City, NY 10017</p>
                </div>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/2 md:w-1/2 w-full px-4 payment-card">
            <h2 className="text-white tracking-widest text-2xl mb-3 font-poppins">
              Accepted Payment Methods
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Image
                  src={"/images/visa.webp"}
                  width={250}
                  height={200}
                ></Image>
              </li>
            </nav>
            <div className="flex flex-row">
              <Image
                className="mr-2"
                src={"/images/s2.png"}
                width={100}
                height={150}
              ></Image>
              <Image src={"/images/bage5.png"} width={100} height={200}></Image>
            </div>
            {/* <h2 className="title-font font-medium text-white tracking-widest text-3xl mb-3 font-poppins font-bold	mt-5">
              Brand By
            </h2>
            <Image src={"/images/brand-writing-logo.png"} width={200} height={200}></Image> */}
          </div>
        </div>
      </div>

      <div className="copyright-sec">
        <div className="container text-center mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-white w-full md:text-center text-sm sm:text-left">
            Copyright © 2026 |
            <Link
              href="/terms-and-conditions"
              rel="noopener noreferrer"
              className="text-white ml-1"
              target="_blank"
            >
              Terms & Conditions |
            </Link>
            <Link
              href="/privacy-policy"
              rel="noopener noreferrer"
              className="text-white ml-1"
              target="_blank"
            >
              Privacy Policy {" "}
            </Link>
            Powered by <span className="powered-by-text">Pine Book Writing Inc.</span>
          </p>

        </div>
      </div>
    </footer>
  );
}
