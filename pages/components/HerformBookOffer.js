import useHubspotForm from "@/hooks/hubspot";
import "intl-tel-input/build/css/intlTelInput.css";
import intlTelInput from 'intl-tel-input';
import React, { useEffect, useRef, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import FadeIn from "./FadeIn";
// import 'react-phone-number-input/style.css';
// import PhoneInput from 'react-phone-number-input';


export default function HeroFormBookOffer() {
  const router = useRouter();
  const { submitMainContactForm } = useHubspotForm();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [budgets, setBudget] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState("");



  const [flagImg, setFlagImg] = useState(
    'https://flagpedia.net/data/flags/h80/us.webp'
  );
  const [countryCodeValue, setCountryCodeValue] = useState('1');

  const selectCountryHandler = (e) => {
    setCountryCodeValue(e.target.value);
  };

  const phoneHandler = (e) => {
    setPhone(e.target.value);
  };

  const countryFlagHandler = (e) => {
    const selectedOption = e.target.selectedOptions[0];
    setFlagImg(
      `https://flagpedia.net/data/flags/h80/${selectedOption.dataset.countrycode.toLowerCase()}.webp`
    );
  };

  const categoryPublishing = [
    "Self-Publishing",
    "Traditional Publishing",
    "Hybrid Publishing",
  ];



  const clientLogos = [
    {
      href: "https://goo.gl/maps/D6kJBoXBJYwcZWkP7",
      src: "/images/Google Partner.png",
      alt: "LOGO",
      width: 130,
      height: 60
    },
    {
      href: "https://www.bbb.org/ca/on/richmond-hill/profile/publishers-book/pine-book-writing-inc-0107-1406919",
      src: "/images/BBB.png",
      alt: "LOGO",
      width: 130,
      height: 60
    },
    {
      href: "https://www.trustpilot.com/review/pinebookwriting.com",
      src: "/images/s3.png",
      alt: "LOGO",
      width: 130,
      height: 60
    },
    {
      href: "https://www.yelp.com/biz/pine-book-writing-richmond-hill",
      src: "/images/s4.png",
      alt: "LOGO",
      width: 130,
      height: 60
    },
    {
      href: "https://clutch.co/profile/pine-book-writing",
      src: "/images/s6.png",
      alt: "LOGO",
      width: 130,
      height: 60
    }
  ];


  const handleChange = (e) => {
    const { name, value } = e.target;
    const setters = {
      firstName: setFirstName,
      email: setEmail,
      message: setMessage,
      category: setCategory,
      phone: setPhone,
    };

    console.log(value);

    const setter = setters[name];
    if (setter) {
      if (name === 'phone') {
        const phoneRegex = /^\d{0,}$/;
        if (phoneRegex.test(value)) {
          setter(value);
          if (value.length < 9) {
            setPhoneError("Phone number must be at least 9 digits");
          } else {
            setPhoneError("");
          }
        } else {
          setPhoneError("Invalid phone number format");
        }
      } else {
        setter(value);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phone.length < 9) {
      setPhoneError("Phone number must be at least 9 digits");
    }
    // const combinedPhoneNumber = `+${countryCodeValue} ${phone}`;

    const response = await submitMainContactForm(
      firstName,
      email,
      // combinedPhoneNumber, 
      phone,
      category,
      message
    );
    if (response) {
      setShowSuccess(true);
      // router.push('/thank-you'); 
      // router.push('/thankyou-offer')
      window.location.href = "thankyou-offer";
      setTimeout(() => {
        setShowSuccess(false);
        setEmail("");
        setFirstName("");
        setPhone("");
        setCategory("");
        setMessage("");
      }, 3000);
    }

    console.log("response", response);
  };

  return (

    <div className="relative overflow-hidden w-full" style={{ zIndex: 1 }}>
      {/* <SnowFall /> */}
      <div className="container px-4 pt-20 tablet-margin-banner mx-auto max-w-screen-xl brand-hero-section relative z-10">
        <div className="grid grid-cols-1 sm:gap-8 sm:py-0 md:grid-cols-2 text-left items-center justify-between md:gap-8 md:py-36">
          <div className="mb-4">
            <h3 className="font-poppins text-2xl mb-4 aos-init aos-animate text-white">
              <span className="px-2 py-0">#1 Self</span> Publishing Company
            </h3>
            <FadeIn>
              <h1 className="font-poppins text-3xl md:text-5xl text-white font-bold">
                DO YOU HAVE A MANUSCRIPT READY TO BE PUBLISHED?
              </h1>
            </FadeIn>
            <p className="text-xl text-white pt-4">
              Pine Book Publishing has made it much more easier to self-publish a
              book, with hands-on support from the first word to the final cover.
              Our process involves Proofreading, Editing, Formatting, Book Cover
              Design and print-on-demand through a vast network of global outlets.
            </p>
            <h4 className="font-poppins text-2xl mt-8 text-white uppercase font-bold">
              Our Credibility
            </h4>
            <div className="flex justify-start items-center mt-8 gap-2 md:gap-x-8 client-logo-sec">
              {clientLogos.map((logo, index) => (
                <Link key={index} href={logo.href} target="_blank">
                  <Image
                    alt={logo.alt}
                    src={logo.src}
                    width={logo.width}
                    height={logo.height}
                  />
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="px-4 py-3 w-full rounded-2xl px-8 py-8 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 border-gray-100 relative">
              <Image
                className="text-center header-form-off-badge"
                src={"/brand-img/christmas-tag.png"}
                width={140}
                height={180}
                loading="lazy"
              ></Image>
              <Image
                className="text-center christmas-cap-form"
                src={"/brand-img/christmas-cap.png"}
                width={300}
                height={300}
                loading="lazy"
              ></Image>
              <div className="text-start">
                <h4 className="font-poppins text-white text-2xl md:text-4xl font-bold christmas-banner-title">
                  Avail Discount
                </h4>
                <h5 className="font-poppins text-white text-lg mb-3 christmas-banner-desc">
                  Holiday Season Sale: Expert Book Publishing at{" "}
                  <span className="text-blink">50% Off</span> – <br />
                  Your Story Deserves to be Heard!
                </h5>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-2 w-full relative">

                  <form className="flex flex-col gap-4 justify-start items-start" onSubmit={handleSubmit}>
                    <div className="relative w-full">
                      <input
                        type="text"
                        name="firstName"
                        onChange={handleChange}
                        value={firstName}
                        required
                        className="pl-4 pr-4 py-2 border rounded-xl w-full text-sm shadow-xl"
                        placeholder="Enter your Name"
                      />
                    </div>
                    <div className="relative w-full">
                      <input
                        type="text"
                        onChange={handleChange}
                        value={phone}
                        name="phone"
                        required
                        className="pl-4 pr-4 py-2 border rounded-xl w-full text-sm shadow-xl"
                        placeholder="Enter your Phone"
                      />
                      {/* <div className='tel-box'>
                        <div className='select-box'>
                          <img src={flagImg} alt="country-flag" className='flag-img' />
                          <select
                            id="country"
                            onChange={(e) => {
                              const selectedOption = e.target.selectedOptions[0];
                              setCountryCodeValue(e.target.value); // Update country code
                              setFlagImg(
                                `https://flagpedia.net/data/flags/h80/${selectedOption.dataset.countrycode.toLowerCase()}.webp` // Update flag
                              );
                            }}
                            defaultValue="1"
                          >
                            <option value="" hidden>Select Country</option>
                            <option data-countryCode="US" value="1">United States (+1)</option>
                            <option data-countryCode="GB" value="44">United Kingdom (+44)</option>
                            <option data-countryCode="CA" value="1">Canada (+1)</option>
                            <hr></hr>
                            <option data-countryCode="AF" value="93">Afghanistan (+93)</option>
                            <option data-countryCode="AL" value="355">Albania (+355)</option>
                            <option data-countryCode="DZ" value="213">Algeria (+213)</option>
                            <option data-countryCode="AS" value="1684">American Samoa (+1684)</option>
                            <option data-countryCode="AD" value="376">Andorra (+376)</option>
                            <option data-countryCode="AO" value="244">Angola (+244)</option>
                            <option data-countryCode="AI" value="1264">Anguilla (+1264)</option>
                            <option data-countryCode="AQ" value="672">Antartica (+672)</option>
                            <option data-countryCode="AG" value="1268">Antigua &amp; Barbuda (+1268)</option>
                            <option data-countryCode="AR" value="54">Argentina (+54)</option>
                            <option data-countryCode="AM" value="374">Armenia (+374)</option>
                            <option data-countryCode="AW" value="297">Aruba (+297)</option>
                            <option data-countryCode="AU" value="61">Australia (+61)</option>
                            <option data-countryCode="AT" value="43">Austria (+43)</option>
                            <option data-countryCode="AZ" value="994">Azerbaijan (+994)</option>
                            <option data-countryCode="BS" value="1242">Bahamas (+1242)</option>
                            <option data-countryCode="BH" value="973">Bahrain (+973)</option>
                            <option data-countryCode="BD" value="880">Bangladesh (+880)</option>
                            <option data-countryCode="BB" value="1246">Barbados (+1246)</option>
                            <option data-countryCode="BY" value="375">Belarus (+375)</option>
                            <option data-countryCode="BE" value="32">Belgium (+32)</option>
                            <option data-countryCode="BZ" value="501">Belize (+501)</option>
                            <option data-countryCode="BJ" value="229">Benin (+229)</option>
                            <option data-countryCode="BM" value="1441">Bermuda (+1441)</option>
                            <option data-countryCode="BT" value="975">Bhutan (+975)</option>
                            <option data-countryCode="BO" value="591">Bolivia (+591)</option>
                            <option data-countryCode="BA" value="387">Bosnia &amp; Herzegovina (+387)</option>
                            <option data-countryCode="BW" value="267">Botswana (+267)</option>
                            <option data-countryCode="BR" value="55">Brazil (+55)</option>
                            <option data-countryCode="IO" value="246">British India Ocean Terrirory (+246)</option>
                            <option data-countryCode="VG" value="1284">British Virgin Islands (+1284)</option>
                            <option data-countryCode="BN" value="673">Brunei (+673)</option>
                            <option data-countryCode="BG" value="359">Bulgaria (+359)</option>
                            <option data-countryCode="BF" value="226">Burkina Faso (+226)</option>
                            <option data-countryCode="BI" value="257">Burundi (+257)</option>
                            <option data-countryCode="KH" value="855">Cambodia (+855)</option>
                            <option data-countryCode="CM" value="237">Cameroon (+237)</option>
                            <option data-countryCode="CV" value="238">Cape Verde Islands (+238)</option>
                            <option data-countryCode="KY" value="1345">Cayman Islands (+1345)</option>
                            <option data-countryCode="CF" value="236">Central African Republic (+236)</option>
                            <option data-countryCode="TD" value="235">Chad (+235)</option>
                            <option data-countryCode="CL" value="56">Chile (+56)</option>
                            <option data-countryCode="CN" value="86">China (+86)</option>
                            <option data-countryCode="CX" value="61">Christmas Island (+61)</option>
                            <option data-countryCode="CC" value="61">Cocos Islands (+61)</option>
                            <option data-countryCode="CO" value="57">Colombia (+57)</option>
                            <option data-countryCode="KM" value="269">Comoros (+269)</option>
                            <option data-countryCode="CK" value="682">Cook Islands (+682)</option>
                            <option data-countryCode="CR" value="506">Costa Rica (+506)</option>
                            <option data-countryCode="HR" value="385">Croatia (+385)</option>
                            <option data-countryCode="CU" value="53">Cuba (+53)</option>
                            <option data-countryCode="CW" value="599">Curacao (+599)</option>
                            <option data-countryCode="CY" value="90">Cyprus - North (+90)</option>
                            <option data-countryCode="CY" value="357">Cyprus - South (+357)</option>
                            <option data-countryCode="CZ" value="420">Czech Republic (+420)</option>
                            <option data-countryCode="CD" value="243">Democratic Republic of Congo (+243)</option>
                            <option data-countryCode="DK" value="45">Denmark (+45)</option>
                            <option data-countryCode="DJ" value="253">Djibouti (+253)</option>
                            <option data-countryCode="DM" value="1809">Dominica (+1809)</option>
                            <option data-countryCode="DO" value="1809">Dominican Republic (+1809)</option>
                            <option data-countryCode="TL" value="670">East Timor (+670)</option>
                            <option data-countryCode="EC" value="593">Ecuador (+593)</option>
                            <option data-countryCode="EG" value="20">Egypt (+20)</option>
                            <option data-countryCode="SV" value="503">El Salvador (+503)</option>
                            <option data-countryCode="GQ" value="240">Equatorial Guinea (+240)</option>
                            <option data-countryCode="ER" value="291">Eritrea (+291)</option>
                            <option data-countryCode="EE" value="372">Estonia (+372)</option>
                            <option data-countryCode="ET" value="251">Ethiopia (+251)</option>
                            <option data-countryCode="FK" value="500">Falkland Islands (+500)</option>
                            <option data-countryCode="FO" value="298">Faroe Islands (+298)</option>
                            <option data-countryCode="FJ" value="679">Fiji (+679)</option>
                            <option data-countryCode="FI" value="358">Finland (+358)</option>
                            <option data-countryCode="FR" value="33">France (+33)</option>
                            <option data-countryCode="GF" value="594">French Guiana (+594)</option>
                            <option data-countryCode="PF" value="689">French Polynesia (+689)</option>
                            <option data-countryCode="GA" value="241">Gabon (+241)</option>
                            <option data-countryCode="GM" value="220">Gambia (+220)</option>
                            <option data-countryCode="GE" value="7880">Georgia (+7880)</option>
                            <option data-countryCode="DE" value="49">Germany (+49)</option>
                            <option data-countryCode="GH" value="233">Ghana (+233)</option>
                            <option data-countryCode="GI" value="350">Gibraltar (+350)</option>
                            <option data-countryCode="GR" value="30">Greece (+30)</option>
                            <option data-countryCode="GL" value="299">Greenland (+299)</option>
                            <option data-countryCode="GD" value="1473">Grenada (+1473)</option>
                            <option data-countryCode="GP" value="590">Guadeloupe (+590)</option>
                            <option data-countryCode="GU" value="671">Guam (+671)</option>
                            <option data-countryCode="GT" value="502">Guatemala (+502)</option>
                            <option data-countryCode="GG" value="44">Guernsey (+44)</option>
                            <option data-countryCode="GN" value="224">Guinea (+224)</option>
                            <option data-countryCode="GW" value="245">Guinea-Bissau (+245)</option>
                            <option data-countryCode="GY" value="592">Guyana (+592)</option>
                            <option data-countryCode="HT" value="509">Haiti (+509)</option>
                            <option data-countryCode="HN" value="504">Honduras (+504)</option>
                            <option data-countryCode="HK" value="852">Hong Kong (+852)</option>
                            <option data-countryCode="HU" value="36">Hungary (+36)</option>
                            <option data-countryCode="IS" value="354">Iceland (+354)</option>
                            <option data-countryCode="IN" value="91">India (+91)</option>
                            <option data-countryCode="ID" value="62">Indonesia (+62)</option>
                            <option data-countryCode="IR" value="98">Iran (+98)</option>
                            <option data-countryCode="IQ" value="964">Iraq (+964)</option>
                            <option data-countryCode="IE" value="353">Ireland (+353)</option>
                            <option data-countryCode="IM" value="44">Isle of Man (+44)</option>
                            <option data-countryCode="IL" value="972">Israel (+972)</option>
                            <option data-countryCode="IT" value="39">Italy (+39)</option>
                            <option data-countryCode="CI" value="225">Ivory Coast (+225)</option>
                            <option data-countryCode="JM" value="1876">Jamaica (+1876)</option>
                            <option data-countryCode="JP" value="81">Japan (+81)</option>
                            <option data-countryCode="JE" value="44">Jersey (+44)</option>
                            <option data-countryCode="JO" value="962">Jordan (+962)</option>
                            <option data-countryCode="KZ" value="7">Kazakhstan (+7)</option>
                            <option data-countryCode="KE" value="254">Kenya (+254)</option>
                            <option data-countryCode="KI" value="686">Kiribati (+686)</option>
                            <option data-countryCode="XK" value="383">Kosovo (+383)</option>
                            <option data-countryCode="KW" value="965">Kuwait (+965)</option>
                            <option data-countryCode="KG" value="996">Kyrgyzstan (+996)</option>
                            <option data-countryCode="LA" value="856">Laos (+856)</option>
                            <option data-countryCode="LV" value="371">Latvia (+371)</option>
                            <option data-countryCode="LB" value="961">Lebanon (+961)</option>
                            <option data-countryCode="LS" value="266">Lesotho (+266)</option>
                            <option data-countryCode="LR" value="231">Liberia (+231)</option>
                            <option data-countryCode="LY" value="218">Libya (+218)</option>
                            <option data-countryCode="LI" value="417">Liechtenstein (+417)</option>
                            <option data-countryCode="LT" value="370">Lithuania (+370)</option>
                            <option data-countryCode="LU" value="352">Luxembourg (+352)</option>
                            <option data-countryCode="MO" value="853">Macao (+853)</option>
                            <option data-countryCode="MK" value="389">Macedonia (+389)</option>
                            <option data-countryCode="MG" value="261">Madagascar (+261)</option>
                            <option data-countryCode="MW" value="265">Malawi (+265)</option>
                            <option data-countryCode="MY" value="60">Malaysia (+60)</option>
                            <option data-countryCode="MV" value="960">Maldives (+960)</option>
                            <option data-countryCode="ML" value="223">Mali (+223)</option>
                            <option data-countryCode="MT" value="356">Malta (+356)</option>
                            <option data-countryCode="MH" value="692">Marshall Islands (+692)</option>
                            <option data-countryCode="MQ" value="596">Martinique (+596)</option>
                            <option data-countryCode="MR" value="222">Mauritania (+222)</option>
                            <option data-countryCode="YT" value="269">Mayotte (+269)</option>
                            <option data-countryCode="MX" value="52">Mexico (+52)</option>
                            <option data-countryCode="FM" value="691">Micronesia (+691)</option>
                            <option data-countryCode="MD" value="373">Moldova (+373)</option>
                            <option data-countryCode="MC" value="377">Monaco (+377)</option>
                            <option data-countryCode="MN" value="976">Mongolia (+976)</option>
                            <option data-countryCode="ME" value="382">Montengro (+382)</option>
                            <option data-countryCode="MS" value="1664">Montserrat (+1664)</option>
                            <option data-countryCode="MA" value="212">Morocco (+212)</option>
                            <option data-countryCode="MZ" value="258">Mozambique (+258)</option>
                            <option data-countryCode="MN" value="95">Myanmar (+95)</option>
                            <option data-countryCode="NA" value="264">Namibia (+264)</option>
                            <option data-countryCode="NR" value="674">Nauru (+674)</option>
                            <option data-countryCode="NP" value="977">Nepal (+977)</option>
                            <option data-countryCode="NL" value="31">Netherlands (+31)</option>
                            <option data-countryCode="AN" value="599">Netherlands Antilles (+599)</option>
                            <option data-countryCode="NC" value="687">New Caledonia (+687)</option>
                            <option data-countryCode="NZ" value="64">New Zealand (+64)</option>
                            <option data-countryCode="NI" value="505">Nicaragua (+505)</option>
                            <option data-countryCode="NE" value="227">Niger (+227)</option>
                            <option data-countryCode="NG" value="234">Nigeria (+234)</option>
                            <option data-countryCode="NU" value="683">Niue (+683)</option>
                            <option data-countryCode="KP" value="850">North Korea (+850)</option>
                            <option data-countryCode="NF" value="672">Norfolk Islands (+672)</option>
                            <option data-countryCode="NP" value="670">Northern Marianas (+670)</option>
                            <option data-countryCode="NO" value="47">Norway (+47)</option>
                            <option data-countryCode="OM" value="968">Oman (+968)</option>
                            <option data-countryCode="PK" value="92">Pakistan (+92)</option>
                            <option data-countryCode="PW" value="680">Palau (+680)</option>
                            <option data-countryCode="PS" value="970">Palestine (+970)</option>
                            <option data-countryCode="PA" value="507">Panama (+507)</option>
                            <option data-countryCode="PG" value="675">Papua New Guinea (+675)</option>
                            <option data-countryCode="PY" value="595">Paraguay (+595)</option>
                            <option data-countryCode="PE" value="51">Peru (+51)</option>
                            <option data-countryCode="PH" value="63">Philippines (+63)</option>
                            <option data-countryCode="PN" value="64">Pitcairn (+64)</option>
                            <option data-countryCode="PL" value="48">Poland (+48)</option>
                            <option data-countryCode="PT" value="351">Portugal (+351)</option>
                            <option data-countryCode="PR" value="1787">Puerto Rico (+1787)</option>
                            <option data-countryCode="QA" value="974">Qatar (+974)</option>
                            <option data-countryCode="CG" value="242">Republic of the Congo (+242)</option>
                            <option data-countryCode="RE" value="262">Reunion (+262)</option>
                            <option data-countryCode="RO" value="40">Romania (+40)</option>
                            <option data-countryCode="RU" value="7">Russia (+7)</option>
                            <option data-countryCode="RW" value="250">Rwanda (+250)</option>
                            <option data-countryCode="BL" value="590">Saint Barthelemy (+590)</option>
                            <option data-countryCode="SH" value="290">Saint Helena (+290)</option>
                            <option data-countryCode="KN" value="1869">Saint Kitts &amp; Nevis (+1869)</option>
                            <option data-countryCode="SC" value="1758">Saint Lucia (+1758)</option>
                            <option data-countryCode="SR" value="597">Suriname (+597)</option>
                            <option data-countryCode="MF" value="590">Saint Martin (+590)</option>
                            <option data-countryCode="PM" value="508">Saint Saint Pierre and Miquelon (+508)</option>
                            <option data-countryCode="VC" value="1784">Saint Vincent and the Grenadines (+1784)</option>
                            <option data-countryCode="WS" value="685">Samoa (+685)</option>
                            <option data-countryCode="SM" value="378">San Marino (+378)</option>
                            <option data-countryCode="ST" value="239">Sao Tome &amp; Principe (+239)</option>
                            <option data-countryCode="SA" value="966">Saudi Arabia (+966)</option>
                            <option data-countryCode="SN" value="221">Senegal (+221)</option>
                            <option data-countryCode="CS" value="381">Serbia (+381)</option>
                            <option data-countryCode="SC" value="248">Seychelles (+248)</option>
                            <option data-countryCode="SL" value="232">Sierra Leone (+232)</option>
                            <option data-countryCode="SG" value="65">Singapore (+65)</option>
                            <option data-countryCode="SX" value="1721">Sint Maarten (+1721)</option>
                            <option data-countryCode="SK" value="421">Slovakia (+421)</option>
                            <option data-countryCode="SI" value="386">Slovenia (+386)</option>
                            <option data-countryCode="SB" value="677">Solomon Islands (+677)</option>
                            <option data-countryCode="SO" value="252">Somalia (+252)</option>
                            <option data-countryCode="ZA" value="27">South Africa (+27)</option>
                            <option data-countryCode="KR" value="82">South Korea (+82)</option>
                            <option data-countryCode="SS" value="211">South Sudan (+211)</option>
                            <option data-countryCode="ES" value="34">Spain (+34)</option>
                            <option data-countryCode="LK" value="94">Sri Lanka (+94)</option>
                            <option data-countryCode="SD" value="249">Sudan (+249)</option>
                            <option data-countryCode="SR" value="597">Suriname (+597)</option>
                            <option data-countryCode="SJ" value="47">Svalbard &amp; Jan Mayen (+47)</option>
                            <option data-countryCode="SZ" value="268">Swaziland (+268)</option>
                            <option data-countryCode="SE" value="46">Sweden (+46)</option>
                            <option data-countryCode="CH" value="41">Switzerland (+41)</option>
                            <option data-countryCode="SY" value="963">Syria (+963)</option>
                            <option data-countryCode="TW" value="886">Taiwan (+886)</option>
                            <option data-countryCode="TJ" value="992">Tajikistan (+992)</option>
                            <option data-countryCode="TZ" value="255">Tanzania (+255)</option>
                            <option data-countryCode="TH" value="66">Thailand (+66)</option>
                            <option data-countryCode="TG" value="228">Togo (+228)</option>
                            <option data-countryCode="TO" value="676">Tonga (+676)</option>
                            <option data-countryCode="TT" value="1868">Trinidad &amp; Tobago (+1868)</option>
                            <option data-countryCode="TN" value="216">Tunisia (+216)</option>
                            <option data-countryCode="TR" value="90">Turkey (+90)</option>
                            <option data-countryCode="TM" value="993">Turkmenistan (+993)</option>
                            <option data-countryCode="TC" value="1649">Turks &amp; Caicos Islands (+1649)</option>
                            <option data-countryCode="TV" value="688">Tuvalu (+688)</option>
                            <option data-countryCode="UG" value="256">Uganda (+256)</option>
                            <option data-countryCode="UA" value="380">Ukraine (+380)</option>
                            <option data-countryCode="AE" value="971">United Arab Emirates (+971)</option>
                        
                            
                            <option data-countryCode="UY" value="598">Uruguay (+598)</option>
                            <option data-countryCode="UZ" value="998">Uzbekistan (+998)</option>
                            <option data-countryCode="VU" value="678">Vanuatu (+678)</option>
                            <option data-countryCode="VA" value="379">Vatican City (+379)</option>
                            <option data-countryCode="VE" value="58">Venezuela (+58)</option>
                            <option data-countryCode="VN" value="84">Vietnam (+84)</option>
                            <option data-countryCode="WF" value="681">Wallis &amp; Futuna (+681)</option>
                            <option data-countryCode="YE" value="969">Yemen (North)(+969)</option>
                            <option data-countryCode="YE" value="967">Yemen (South)(+967)</option>
                            <option data-countryCode="ZM" value="260">Zambia (+260)</option>
                            <option data-countryCode="ZW" value="263">Zimbabwe (+263)</option>
                          </select>
                        </div>
                        <div className="country-input-wrapper">
                          <span>
                            +{countryCodeValue}
                          </span>
                          <input
                            type="tel"
                            placeholder="Enter your Phone"
                            className='tel pl-4 pr-4 py-2 border rounded-xl w-full text-sm shadow-xl'
                            onChange={phoneHandler}
                            defaultValue={phone}
                          />
                        </div>

                      </div> */}
                    </div>
                    <div className="relative w-full">
                      <input
                        type="text"
                        name="email"
                        onChange={handleChange}
                        value={email}
                        required
                        className="pl-4 pr-4 py-2 border rounded-xl w-full text-sm shadow-xl"
                        placeholder="Enter your Email"
                      />
                    </div>
                    <div className="relative w-full">
                      <select name="category" value={category} onChange={handleChange} className="text-grey outline-0 pl-4 pr-4 py-2 border text-sm rounded-lg shadow-xl w-full header-form-input">
                        <option value="" className="text-sm text-muted" disabled>Publishing Category
                        </option>
                        {categoryPublishing.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>

                    <div className="relative w-full">
                      <textarea
                        className="pl-4 pr-4 py-2 border rounded-xl w-full text-sm shadow-xl"
                        rows={3}
                        onChange={handleChange}
                        value={message}
                        required
                        placeholder="Enter your Message"
                        name="message"
                      ></textarea>
                      <div
                        className="absolute inset-y-0 left-0 pl-3 pt-3 
                   flex items-start  
                   pointer-events-none"
                      ></div>
                    </div>
                    {showSuccess && (
                      <p className="px-1 py-2 text-green-700">
                        Form submitted Successfully!
                      </p>
                    )}
                    <button
                      className="w-full p-4 py-2 text-white uppercase header-submit-btn rounded rounded-xl shadow-xl text-xl"
                      type="submit"
                    >
                      Submit
                    </button>
                  </form>
                </div>
                <div className="col-span-1 flex justify-center items-center">
                  <Image
                    className="text-center christmas-banner-img"
                    src={"/brand-img/crishtmis-img.png"}
                    width={250}
                    height={500}
                    loading="lazy"
                  ></Image>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
