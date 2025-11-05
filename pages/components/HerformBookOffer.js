import useHubspotForm from "@/hooks/hubspot";
import "intl-tel-input/build/css/intlTelInput.css";
import intlTelInput from 'intl-tel-input';
import React, { useEffect, useRef, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import FadeIn from "./FadeIn";

const countryCodes = [
  { name: "United States", code: "1", countryCode: "US", flag: "https://flagcdn.com/us.svg" },
  { name: "United Kingdom", code: "44", countryCode: "GB", flag: "https://flagcdn.com/gb.svg" },
  { name: "Canada", code: "1", countryCode: "CA", flag: "https://flagcdn.com/ca.svg" },
  { name: "Afghanistan", code: "93", countryCode: "AF", flag: "https://flagcdn.com/af.svg" },
  { name: "Albania", code: "355", countryCode: "AL", flag: "https://flagcdn.com/al.svg" },
  { name: "Algeria", code: "213", countryCode: "DZ", flag: "https://flagcdn.com/dz.svg" },
  { name: "American Samoa", code: "1684", countryCode: "AS", flag: "https://flagcdn.com/as.svg" },
  { name: "Andorra", code: "376", countryCode: "AD", flag: "https://flagcdn.com/ad.svg" },
  { name: "Angola", code: "244", countryCode: "AO", flag: "https://flagcdn.com/ao.svg" },
  { name: "Anguilla", code: "1264", countryCode: "AI", flag: "https://flagcdn.com/ai.svg" },
  { name: "Antarctica", code: "672", countryCode: "AQ", flag: "https://flagcdn.com/aq.svg" },
  { name: "Antigua & Barbuda", code: "1268", countryCode: "AG", flag: "https://flagcdn.com/ag.svg" },
  { name: "Argentina", code: "54", countryCode: "AR", flag: "https://flagcdn.com/ar.svg" },
  { name: "Armenia", code: "374", countryCode: "AM", flag: "https://flagcdn.com/am.svg" },
  { name: "Aruba", code: "297", countryCode: "AW", flag: "https://flagcdn.com/aw.svg" },
  { name: "Australia", code: "61", countryCode: "AU", flag: "https://flagcdn.com/au.svg" },
  { name: "Austria", code: "43", countryCode: "AT", flag: "https://flagcdn.com/at.svg" },
  { name: "Azerbaijan", code: "994", countryCode: "AZ", flag: "https://flagcdn.com/az.svg" },
  { name: "Bahamas", code: "1242", countryCode: "BS", flag: "https://flagcdn.com/bs.svg" },
  { name: "Bahrain", code: "973", countryCode: "BH", flag: "https://flagcdn.com/bh.svg" },
  { name: "Bangladesh", code: "880", countryCode: "BD", flag: "https://flagcdn.com/bd.svg" },
  { name: "Barbados", code: "1246", countryCode: "BB", flag: "https://flagcdn.com/bb.svg" },
  { name: "Belarus", code: "375", countryCode: "BY", flag: "https://flagcdn.com/by.svg" },
  { name: "Belgium", code: "32", countryCode: "BE", flag: "https://flagcdn.com/be.svg" },
  { name: "Belize", code: "501", countryCode: "BZ", flag: "https://flagcdn.com/bz.svg" },
  { name: "Benin", code: "229", countryCode: "BJ", flag: "https://flagcdn.com/bj.svg" },
  { name: "Bermuda", code: "1441", countryCode: "BM", flag: "https://flagcdn.com/bm.svg" },
  { name: "Bhutan", code: "975", countryCode: "BT", flag: "https://flagcdn.com/bt.svg" },
  { name: "Bolivia", code: "591", countryCode: "BO", flag: "https://flagcdn.com/bo.svg" },
  { name: "Bosnia & Herzegovina", code: "387", countryCode: "BA", flag: "https://flagcdn.com/ba.svg" },
  { name: "Botswana", code: "267", countryCode: "BW", flag: "https://flagcdn.com/bw.svg" },
  { name: "Brazil", code: "55", countryCode: "BR", flag: "https://flagcdn.com/br.svg" },
  { name: "British Indian Ocean Territory", code: "246", countryCode: "IO", flag: "https://flagcdn.com/io.svg" },
  { name: "British Virgin Islands", code: "1284", countryCode: "VG", flag: "https://flagcdn.com/vg.svg" },
  { name: "Brunei", code: "673", countryCode: "BN", flag: "https://flagcdn.com/bn.svg" },
  { name: "Bulgaria", code: "359", countryCode: "BG", flag: "https://flagcdn.com/bg.svg" },
  { name: "Burkina Faso", code: "226", countryCode: "BF", flag: "https://flagcdn.com/bf.svg" },
  { name: "Burundi", code: "257", countryCode: "BI", flag: "https://flagcdn.com/bi.svg" },
  { name: "Cambodia", code: "855", countryCode: "KH", flag: "https://flagcdn.com/kh.svg" },
  { name: "Cameroon", code: "237", countryCode: "CM", flag: "https://flagcdn.com/cm.svg" },
  { name: "Cape Verde Islands", code: "238", countryCode: "CV", flag: "https://flagcdn.com/cv.svg" },
  { name: "Cayman Islands", code: "1345", countryCode: "KY", flag: "https://flagcdn.com/ky.svg" },
  { name: "Central African Republic", code: "236", countryCode: "CF", flag: "https://flagcdn.com/cf.svg" },
  { name: "Chad", code: "235", countryCode: "TD", flag: "https://flagcdn.com/td.svg" },
  { name: "Chile", code: "56", countryCode: "CL", flag: "https://flagcdn.com/cl.svg" },
  { name: "China", code: "86", countryCode: "CN", flag: "https://flagcdn.com/cn.svg" },
  { name: "Christmas Island", code: "61", countryCode: "CX", flag: "https://flagcdn.com/cx.svg" },
  { name: "Cocos Islands", code: "61", countryCode: "CC", flag: "https://flagcdn.com/cc.svg" },
  { name: "Colombia", code: "57", countryCode: "CO", flag: "https://flagcdn.com/co.svg" },
  { name: "Comoros", code: "269", countryCode: "KM", flag: "https://flagcdn.com/km.svg" },
  { name: "Cook Islands", code: "682", countryCode: "CK", flag: "https://flagcdn.com/ck.svg" },
  { name: "Costa Rica", code: "506", countryCode: "CR", flag: "https://flagcdn.com/cr.svg" },
  { name: "Croatia", code: "385", countryCode: "HR", flag: "https://flagcdn.com/hr.svg" },
  { name: "Cuba", code: "53", countryCode: "CU", flag: "https://flagcdn.com/cu.svg" },
  { name: "Curacao", code: "599", countryCode: "CW", flag: "https://flagcdn.com/cw.svg" },
  { name: "Cyprus - North", code: "90", countryCode: "CY", flag: "https://flagcdn.com/cy.svg" },
  { name: "Cyprus - South", code: "357", countryCode: "CY", flag: "https://flagcdn.com/cy.svg" },
  { name: "Czech Republic", code: "420", countryCode: "CZ", flag: "https://flagcdn.com/cz.svg" },
  { name: "Democratic Republic of Congo", code: "243", countryCode: "CD", flag: "https://flagcdn.com/cd.svg" },
  { name: "Denmark", code: "45", countryCode: "DK", flag: "https://flagcdn.com/dk.svg" },
  { name: "Djibouti", code: "253", countryCode: "DJ", flag: "https://flagcdn.com/dj.svg" },
  { name: "Dominica", code: "1809", countryCode: "DM", flag: "https://flagcdn.com/dm.svg" },
  { name: "Dominican Republic", code: "1809", countryCode: "DO", flag: "https://flagcdn.com/do.svg" },
  { name: "East Timor", code: "670", countryCode: "TL", flag: "https://flagcdn.com/tl.svg" },
  { name: "Ecuador", code: "593", countryCode: "EC", flag: "https://flagcdn.com/ec.svg" },
  { name: "Egypt", code: "20", countryCode: "EG", flag: "https://flagcdn.com/eg.svg" },
  { name: "El Salvador", code: "503", countryCode: "SV", flag: "https://flagcdn.com/sv.svg" },
  { name: "Equatorial Guinea", code: "240", countryCode: "GQ", flag: "https://flagcdn.com/gq.svg" },
  { name: "Eritrea", code: "291", countryCode: "ER", flag: "https://flagcdn.com/er.svg" },
  { name: "Estonia", code: "372", countryCode: "EE", flag: "https://flagcdn.com/ee.svg" },
  { name: "Ethiopia", code: "251", countryCode: "ET", flag: "https://flagcdn.com/et.svg" },
  { name: "Falkland Islands", code: "500", countryCode: "FK", flag: "https://flagcdn.com/fk.svg" },
  { name: "Faroe Islands", code: "298", countryCode: "FO", flag: "https://flagcdn.com/fo.svg" },
  { name: "Fiji", code: "679", countryCode: "FJ", flag: "https://flagcdn.com/fj.svg" },
  { name: "Finland", code: "358", countryCode: "FI", flag: "https://flagcdn.com/fi.svg" },
  { name: "France", code: "33", countryCode: "FR", flag: "https://flagcdn.com/fr.svg" },
  { name: "French Guiana", code: "594", countryCode: "GF", flag: "https://flagcdn.com/gf.svg" },
  { name: "French Polynesia", code: "689", countryCode: "PF", flag: "https://flagcdn.com/pf.svg" },
  { name: "Gabon", code: "241", countryCode: "GA", flag: "https://flagcdn.com/ga.svg" },
  { name: "Gambia", code: "220", countryCode: "GM", flag: "https://flagcdn.com/gm.svg" },
  { name: "Georgia", code: "7880", countryCode: "GE", flag: "https://flagcdn.com/ge.svg" },
  { name: "Germany", code: "49", countryCode: "DE", flag: "https://flagcdn.com/de.svg" },
  { name: "Ghana", code: "233", countryCode: "GH", flag: "https://flagcdn.com/gh.svg" },
  { name: "Gibraltar", code: "350", countryCode: "GI", flag: "https://flagcdn.com/gi.svg" },
  { name: "Greece", code: "30", countryCode: "GR", flag: "https://flagcdn.com/gr.svg" },
  { name: "Greenland", code: "299", countryCode: "GL", flag: "https://flagcdn.com/gl.svg" },
  { name: "Grenada", code: "1473", countryCode: "GD", flag: "https://flagcdn.com/gd.svg" },
  { name: "Guadeloupe", code: "590", countryCode: "GP", flag: "https://flagcdn.com/gp.svg" },
  { name: "Guam", code: "671", countryCode: "GU", flag: "https://flagcdn.com/gu.svg" },
  { name: "Guatemala", code: "502", countryCode: "GT", flag: "https://flagcdn.com/gt.svg" },
  { name: "Guernsey", code: "44", countryCode: "GG", flag: "https://flagcdn.com/gg.svg" },
  { name: "Guinea", code: "224", countryCode: "GN", flag: "https://flagcdn.com/gn.svg" },
  { name: "Guinea-Bissau", code: "245", countryCode: "GW", flag: "https://flagcdn.com/gw.svg" },
  { name: "Guyana", code: "592", countryCode: "GY", flag: "https://flagcdn.com/gy.svg" },
  { name: "Haiti", code: "509", countryCode: "HT", flag: "https://flagcdn.com/ht.svg" },
  { name: "Honduras", code: "504", countryCode: "HN", flag: "https://flagcdn.com/hn.svg" },
  { name: "Hong Kong", code: "852", countryCode: "HK", flag: "https://flagcdn.com/hk.svg" },
  { name: "Hungary", code: "36", countryCode: "HU", flag: "https://flagcdn.com/hu.svg" },
  { name: "Iceland", code: "354", countryCode: "IS", flag: "https://flagcdn.com/is.svg" },
  { name: "India", code: "91", countryCode: "IN", flag: "https://flagcdn.com/in.svg" },
  { name: "Indonesia", code: "62", countryCode: "ID", flag: "https://flagcdn.com/id.svg" },
  { name: "Iran", code: "98", countryCode: "IR", flag: "https://flagcdn.com/ir.svg" },
  { name: "Iraq", code: "964", countryCode: "IQ", flag: "https://flagcdn.com/iq.svg" },
  { name: "Ireland", code: "353", countryCode: "IE", flag: "https://flagcdn.com/ie.svg" },
  { name: "Isle of Man", code: "44", countryCode: "IM", flag: "https://flagcdn.com/im.svg" },
  { name: "Israel", code: "972", countryCode: "IL", flag: "https://flagcdn.com/il.svg" },
  { name: "Italy", code: "39", countryCode: "IT", flag: "https://flagcdn.com/it.svg" },
  { name: "Ivory Coast", code: "225", countryCode: "CI", flag: "https://flagcdn.com/ci.svg" },
  { name: "Jamaica", code: "1876", countryCode: "JM", flag: "https://flagcdn.com/jm.svg" },
  { name: "Japan", code: "81", countryCode: "JP", flag: "https://flagcdn.com/jp.svg" },
  { name: "Jersey", code: "44", countryCode: "JE", flag: "https://flagcdn.com/je.svg" },
  { name: "Jordan", code: "962", countryCode: "JO", flag: "https://flagcdn.com/jo.svg" },
  { name: "Kazakhstan", code: "7", countryCode: "KZ", flag: "https://flagcdn.com/kz.svg" },
  { name: "Kenya", code: "254", countryCode: "KE", flag: "https://flagcdn.com/ke.svg" },
  { name: "Kiribati", code: "686", countryCode: "KI", flag: "https://flagcdn.com/ki.svg" },
  { name: "Kosovo", code: "383", countryCode: "XK", flag: "https://flagcdn.com/xk.svg" },
  { name: "Kuwait", code: "965", countryCode: "KW", flag: "https://flagcdn.com/kw.svg" },
  { name: "Kyrgyzstan", code: "996", countryCode: "KG", flag: "https://flagcdn.com/kg.svg" },
  { name: "Laos", code: "856", countryCode: "LA", flag: "https://flagcdn.com/la.svg" },
  { name: "Latvia", code: "371", countryCode: "LV", flag: "https://flagcdn.com/lv.svg" },
  { name: "Lebanon", code: "961", countryCode: "LB", flag: "https://flagcdn.com/lb.svg" },
  { name: "Lesotho", code: "266", countryCode: "LS", flag: "https://flagcdn.com/ls.svg" },
  { name: "Liberia", code: "231", countryCode: "LR", flag: "https://flagcdn.com/lr.svg" },
  { name: "Libya", code: "218", countryCode: "LY", flag: "https://flagcdn.com/ly.svg" },
  { name: "Liechtenstein", code: "417", countryCode: "LI", flag: "https://flagcdn.com/li.svg" },
  { name: "Lithuania", code: "370", countryCode: "LT", flag: "https://flagcdn.com/lt.svg" },
  { name: "Luxembourg", code: "352", countryCode: "LU", flag: "https://flagcdn.com/lu.svg" },
  { name: "Macao", code: "853", countryCode: "MO", flag: "https://flagcdn.com/mo.svg" },
  { name: "Macedonia", code: "389", countryCode: "MK", flag: "https://flagcdn.com/mk.svg" },
  { name: "Madagascar", code: "261", countryCode: "MG", flag: "https://flagcdn.com/mg.svg" },
  { name: "Malawi", code: "265", countryCode: "MW", flag: "https://flagcdn.com/mw.svg" },
  { name: "Malaysia", code: "60", countryCode: "MY", flag: "https://flagcdn.com/my.svg" },
  { name: "Mali", code: "223", countryCode: "ML", flag: "https://flagcdn.com/ml.svg" },
  { name: "Malta", code: "356", countryCode: "MT", flag: "https://flagcdn.com/mt.svg" },
  { name: "Marshall Islands", code: "692", countryCode: "MH", flag: "https://flagcdn.com/mh.svg" },
  { name: "Mauritania", code: "222", countryCode: "MR", flag: "https://flagcdn.com/mr.svg" },
  { name: "Mayotte", code: "269", countryCode: "YT", flag: "https://flagcdn.com/yt.svg" },
  { name: "Mexico", code: "52", countryCode: "MX", flag: "https://flagcdn.com/mx.svg" },
  { name: "Micronesia", code: "691", countryCode: "FM", flag: "https://flagcdn.com/fm.svg" },
  { name: "Moldova", code: "373", countryCode: "MD", flag: "https://flagcdn.com/md.svg" },
  { name: "Monaco", code: "377", countryCode: "MC", flag: "https://flagcdn.com/mc.svg" },
  { name: "Mongolia", code: "976", countryCode: "MN", flag: "https://flagcdn.com/mn.svg" },
  { name: "Montenegro", code: "382", countryCode: "ME", flag: "https://flagcdn.com/me.svg" },
  { name: "Montserrat", code: "1664", countryCode: "MS", flag: "https://flagcdn.com/ms.svg" },
  { name: "Morocco", code: "212", countryCode: "MA", flag: "https://flagcdn.com/ma.svg" },
  { name: "Mozambique", code: "258", countryCode: "MZ", flag: "https://flagcdn.com/mz.svg" },
  { name: "Myanmar", code: "95", countryCode: "MM", flag: "https://flagcdn.com/mm.svg" },
  { name: "Namibia", code: "264", countryCode: "NA", flag: "https://flagcdn.com/na.svg" },
  { name: "Nauru", code: "674", countryCode: "NR", flag: "https://flagcdn.com/nr.svg" },
  { name: "Nepal", code: "977", countryCode: "NP", flag: "https://flagcdn.com/np.svg" },
  { name: "Netherlands", code: "31", countryCode: "NL", flag: "https://flagcdn.com/nl.svg" },
  { name: "Netherlands Antilles", code: "599", countryCode: "AN", flag: "https://flagcdn.com/an.svg" },
  { name: "New Caledonia", code: "687", countryCode: "NC", flag: "https://flagcdn.com/nc.svg" },
  { name: "New Zealand", code: "64", countryCode: "NZ", flag: "https://flagcdn.com/nz.svg" },
  { name: "Nicaragua", code: "505", countryCode: "NI", flag: "https://flagcdn.com/ni.svg" },
  { name: "Niger", code: "227", countryCode: "NE", flag: "https://flagcdn.com/ne.svg" },
  { name: "Nigeria", code: "234", countryCode: "NG", flag: "https://flagcdn.com/ng.svg" },
  { name: "Niue", code: "683", countryCode: "NU", flag: "https://flagcdn.com/nu.svg" },
  { name: "North Korea", code: "850", countryCode: "KP", flag: "https://flagcdn.com/kp.svg" },
  { name: "Norfolk Islands", code: "672", countryCode: "NF", flag: "https://flagcdn.com/nf.svg" },
  { name: "Northern Marianas", code: "670", countryCode: "MP", flag: "https://flagcdn.com/mp.svg" },
  { name: "Norway", code: "47", countryCode: "NO", flag: "https://flagcdn.com/no.svg" },
  { name: "Oman", code: "968", countryCode: "OM", flag: "https://flagcdn.com/om.svg" },
  { name: "Pakistan", code: "92", countryCode: "PK", flag: "https://flagcdn.com/pk.svg" },
  { name: "Palau", code: "680", countryCode: "PW", flag: "https://flagcdn.com/pw.svg" },
  { name: "Palestine", code: "970", countryCode: "PS", flag: "https://flagcdn.com/ps.svg" },
  { name: "Panama", code: "507", countryCode: "PA", flag: "https://flagcdn.com/pa.svg" },
  { name: "Papua New Guinea", code: "675", countryCode: "PG", flag: "https://flagcdn.com/pg.svg" },
  { name: "Paraguay", code: "595", countryCode: "PY", flag: "https://flagcdn.com/py.svg" },
  { name: "Peru", code: "51", countryCode: "PE", flag: "https://flagcdn.com/pe.svg" },
  { name: "Philippines", code: "63", countryCode: "PH", flag: "https://flagcdn.com/ph.svg" },
  { name: "Pitcairn", code: "64", countryCode: "PN", flag: "https://flagcdn.com/pn.svg" },
  { name: "Poland", code: "48", countryCode: "PL", flag: "https://flagcdn.com/pl.svg" },
  { name: "Portugal", code: "351", countryCode: "PT", flag: "https://flagcdn.com/pt.svg" },
  { name: "Puerto Rico", code: "1787", countryCode: "PR", flag: "https://flagcdn.com/pr.svg" },
  { name: "Qatar", code: "974", countryCode: "QA", flag: "https://flagcdn.com/qa.svg" },
  { name: "Republic of the Congo", code: "242", countryCode: "CG", flag: "https://flagcdn.com/cg.svg" },
  { name: "Reunion", code: "262", countryCode: "RE", flag: "https://flagcdn.com/re.svg" },
  { name: "Romania", code: "40", countryCode: "RO", flag: "https://flagcdn.com/ro.svg" },
  { name: "Russia", code: "7", countryCode: "RU", flag: "https://flagcdn.com/ru.svg" },
  { name: "Rwanda", code: "250", countryCode: "RW", flag: "https://flagcdn.com/rw.svg" },
  { name: "Saint Barthelemy", code: "590", countryCode: "BL", flag: "https://flagcdn.com/bl.svg" },
  { name: "Saint Helena", code: "290", countryCode: "SH", flag: "https://flagcdn.com/sh.svg" },
  { name: "Saint Kitts & Nevis", code: "1869", countryCode: "KN", flag: "https://flagcdn.com/kn.svg" },
  { name: "Saint Lucia", code: "1758", countryCode: "LC", flag: "https://flagcdn.com/lc.svg" },
  { name: "Suriname", code: "597", countryCode: "SR", flag: "https://flagcdn.com/sr.svg" },
  { name: "Saint Martin", code: "590", countryCode: "MF", flag: "https://flagcdn.com/mf.svg" },
  { name: "Saint Pierre and Miquelon", code: "508", countryCode: "PM", flag: "https://flagcdn.com/pm.svg" },
  { name: "Saint Vincent and the Grenadines", code: "1784", countryCode: "VC", flag: "https://flagcdn.com/vc.svg" },
  { name: "Samoa", code: "685", countryCode: "WS", flag: "https://flagcdn.com/ws.svg" },
  { name: "San Marino", code: "378", countryCode: "SM", flag: "https://flagcdn.com/sm.svg" },
  { name: "Sao Tome & Principe", code: "239", countryCode: "ST", flag: "https://flagcdn.com/st.svg" },
  { name: "Saudi Arabia", code: "966", countryCode: "SA", flag: "https://flagcdn.com/sa.svg" },
  { name: "Senegal", code: "221", countryCode: "SN", flag: "https://flagcdn.com/sn.svg" },
  { name: "Serbia", code: "381", countryCode: "CS", flag: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Flag_of_Serbia.svg" },
  { name: "Seychelles", code: "248", countryCode: "SC", flag: "https://flagcdn.com/sc.svg" },
  { name: "Sierra Leone", code: "232", countryCode: "SL", flag: "https://flagcdn.com/sl.svg" },
  { name: "Singapore", code: "65", countryCode: "SG", flag: "https://flagcdn.com/sg.svg" },
  { name: "Sint Maarten", code: "1721", countryCode: "SX", flag: "https://flagcdn.com/sx.svg" },
  { name: "Slovakia", code: "421", countryCode: "SK", flag: "https://flagcdn.com/sk.svg" },
  { name: "Slovenia", code: "386", countryCode: "SI", flag: "https://flagcdn.com/si.svg" },
  { name: "Solomon Islands", code: "677", countryCode: "SB", flag: "https://flagcdn.com/sb.svg" },
  { name: "Somalia", code: "252", countryCode: "SO", flag: "https://flagcdn.com/so.svg" },
  { name: "South Africa", code: "27", countryCode: "ZA", flag: "https://flagcdn.com/za.svg" },
  { name: "South Korea", code: "82", countryCode: "KR", flag: "https://flagcdn.com/kr.svg" },
  { name: "South Sudan", code: "211", countryCode: "SS", flag: "https://flagcdn.com/ss.svg" },
  { name: "Spain", code: "34", countryCode: "ES", flag: "https://flagcdn.com/es.svg" },
  { name: "Sri Lanka", code: "94", countryCode: "LK", flag: "https://flagcdn.com/lk.svg" },
  { name: "Sudan", code: "249", countryCode: "SD", flag: "https://flagcdn.com/sd.svg" },
  { name: "Svalbard & Jan Mayen", code: "47", countryCode: "SJ", flag: "https://flagcdn.com/sj.svg" },
  { name: "Swaziland", code: "268", countryCode: "SZ", flag: "https://flagcdn.com/sz.svg" },
  { name: "Sweden", code: "46", countryCode: "SE", flag: "https://flagcdn.com/se.svg" },
  { name: "Switzerland", code: "41", countryCode: "CH", flag: "https://flagcdn.com/ch.svg" },
  { name: "Syria", code: "963", countryCode: "SY", flag: "https://flagcdn.com/sy.svg" },
  { name: "Taiwan", code: "886", countryCode: "TW", flag: "https://flagcdn.com/tw.svg" },
  { name: "Tajikistan", code: "992", countryCode: "TJ", flag: "https://flagcdn.com/tj.svg" },
  { name: "Tanzania", code: "255", countryCode: "TZ", flag: "https://flagcdn.com/tz.svg" },
  { name: "Thailand", code: "66", countryCode: "TH", flag: "https://flagcdn.com/th.svg" },
  { name: "Togo", code: "228", countryCode: "TG", flag: "https://flagcdn.com/tg.svg" },
  { name: "Tonga", code: "676", countryCode: "TO", flag: "https://flagcdn.com/to.svg" },
  { name: "Trinidad & Tobago", code: "1868", countryCode: "TT", flag: "https://flagcdn.com/tt.svg" },
  { name: "Tunisia", code: "216", countryCode: "TN", flag: "https://flagcdn.com/tn.svg" },
  { name: "Turkey", code: "90", countryCode: "TR", flag: "https://flagcdn.com/tr.svg" },
  { name: "Turkmenistan", code: "993", countryCode: "TM", flag: "https://flagcdn.com/tm.svg" },
  { name: "Turks & Caicos Islands", code: "1649", countryCode: "TC", flag: "https://flagcdn.com/tc.svg" },
  { name: "Tuvalu", code: "688", countryCode: "TV", flag: "https://flagcdn.com/tv.svg" },
  { name: "Uganda", code: "256", countryCode: "UG", flag: "https://flagcdn.com/ug.svg" },
  { name: "Ukraine", code: "380", countryCode: "UA", flag: "https://flagcdn.com/ua.svg" },
  { name: "United Arab Emirates", code: "971", countryCode: "AE", flag: "https://flagcdn.com/ae.svg" },
  { name: "Uruguay", code: "598", countryCode: "UY", flag: "https://flagcdn.com/uy.svg" },
  { name: "Uzbekistan", code: "998", countryCode: "UZ", flag: "https://flagcdn.com/uz.svg" },
  { name: "Vanuatu", code: "678", countryCode: "VU", flag: "https://flagcdn.com/vu.svg" },
  { name: "Vatican City", code: "379", countryCode: "VA", flag: "https://flagcdn.com/va.svg" },
  { name: "Venezuela", code: "58", countryCode: "VE", flag: "https://flagcdn.com/ve.svg" },
  { name: "Vietnam", code: "84", countryCode: "VN", flag: "https://flagcdn.com/vn.svg" },
  { name: "Wallis & Futuna", code: "681", countryCode: "WF", flag: "https://flagcdn.com/wf.svg" },
  { name: "Yemen (North)", code: "969", countryCode: "YE", flag: "https://flagcdn.com/ye.svg" },
  { name: "Yemen (South)", code: "967", countryCode: "YE", flag: "https://flagcdn.com/ye.svg" },
  { name: "Zambia", code: "260", countryCode: "ZM", flag: "https://flagcdn.com/zm.svg" },
  { name: "Zimbabwe", code: "263", countryCode: "ZW", flag: "https://flagcdn.com/zw.svg" },

];



export default function HeroFormBookOffer() {
  const { submitMainContactFormLP } = useHubspotForm();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get user location info
  const [userInfo, setUserInfo] = useState({
    ip: '',
    city: '',
    region: '',
    country: ''
  });

  const fetchUserRegion = async () => {
    try {
      const response = await fetch("https://ipwhois.app/json/");
      const data = await response.json();
      console.log("IP API Response:", data);

      // Store user info for email
      setUserInfo({
        ip: data.ip || '',
        city: data.city || '',
        region: data.region || '',
        country: data.country || ''
      });

      const detectedCountry = countryCodes.find((c) => c.countryCode === data.country_code);
      if (detectedCountry) {
        setSelectedCountry(detectedCountry);
      } else {
        console.warn("Region not detected. Defaulting to Canada.");
        setSelectedCountry(countryCodes.find((c) => c.countryCode === "CA"));
      }
    } catch (error) {
      console.error("Failed to fetch user region:", error);
      setSelectedCountry(countryCodes.find((c) => c.countryCode === "CA"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserRegion();
  }, []);

  const handleCountryChange = (e) => {
    const selectedCountryCode = e.target.value;
    const country = countryCodes.find((c) => c.countryCode === selectedCountryCode);
    console.log("Selected Country: ", country);
    if (country) {
      setSelectedCountry(country);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const setters = {
      firstName: setFirstName,
      email: setEmail,
      message: setMessage,
      category: setCategory,
      phone: setPhone,
    };

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

  const sendEmailNotification = async (formData) => {
    try {
      const response = await fetch('/api/send-signup-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          email: formData.email,
          phone: formData.phone,
          category: formData.category,
          message: formData.message,
          countryCode: formData.countryCode,
          currentPage: window.location.href,
          referringPage: document.referrer || 'Direct visit',
          userIP: userInfo.ip,
          userCity: userInfo.city,
          userRegion: userInfo.region,
          userCountry: userInfo.country
        }),
      });

      const result = await response.json();

      if (!result.success) {
        console.error('Email sending failed:', result.message);
      } else {
        console.log('Email sent successfully');
      }

      return result;
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, error: error.message };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (phone.length < 9) {
      setPhoneError("Phone number must be at least 9 digits");
      return;
    }

    setIsSubmitting(true);

    // Combine phone number and country code
    const combinedPhoneNumber = `+${selectedCountry.code} ${phone}`;

    const formData = {
      firstName,
      email,
      phone: combinedPhoneNumber,
      category,
      message,
      countryCode: selectedCountry.countryCode,
    };

    try {
      // Send to both email and HubSpot in parallel
      const [emailResult, hubspotResponse] = await Promise.all([
        // Send email notification
        sendEmailNotification(formData),

        // Submit to HubSpot
        submitMainContactFormLP(
          firstName,
          email,
          combinedPhoneNumber,
          category,
          message
        )
      ]);

      // Check if both submissions were successful
      if (emailResult.success && hubspotResponse) {
        console.log('Both email and HubSpot submissions successful');
        setShowSuccess(true);

        // Redirect to thank you page
        setTimeout(() => {
          window.location.href = "/thankyou-offer";
        }, 1500);

        // Clear form after delay
        setTimeout(() => {
          setShowSuccess(false);
          setEmail("");
          setFirstName("");
          setPhone("");
          setCategory("");
          setMessage("");
        }, 3000);
      } else {
        // Handle partial failure
        if (!emailResult.success) {
          console.error('Email submission failed:', emailResult.message);
        }
        if (!hubspotResponse) {
          console.error('HubSpot submission failed');
        }

        // Still show success if at least one succeeded
        if (emailResult.success || hubspotResponse) {
          setShowSuccess(true);
          setTimeout(() => {
            window.location.href = "/thankyou-offer";
          }, 1500);
        } else {
          alert('There was an error submitting your form. Please try again.');
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const categoryPublishing = [
    "Book Publishing",
    "Book Editing",
    "Proofreading",
    "Book Formatting",
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
    // {
    //   href: "https://www.yelp.com/biz/pine-book-writing-richmond-hill",
    //   src: "/images/s4.png",
    //   alt: "LOGO",
    //   width: 130,
    //   height: 60
    // },
    {
      href: "https://clutch.co/profile/pine-book-writing",
      src: "/images/s6.png",
      alt: "LOGO",
      width: 130,
      height: 60
    }
  ];



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
              <h1 className="font-poppins text-3xl md:text-3xl text-white font-bold">
                DO YOU HAVE A MANUSCRIPT READY TO BE PUBLISHED?
              </h1>
            </FadeIn>
            <p className="text-xl text-white pt-4">
              Pine Book Publishing has made it much easier to self-publish a book, with hands-on support from the first word to the final cover. Our process involves Proofreading, Editing, Formatting, Book Cover Design, Publishing, and print-on-demand through a vast network of global outlets.
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
              <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
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
                      <div className='tel-box'>
                        {/* new code */}
                        <div className="country-input-wrapper">
                          <div className="select-box">
                            {loading ? (
                              <p>Loading...</p>
                            ) : (
                              <div className="select-box flex items-center">
                                <select
                                  className="country-select pl-2 pr-2 py-2 cursor-pointer"
                                  // onChange={handleCountryChange}
                                  // value={selectedCountry ? selectedCountry.code : ""}
                                  onChange={handleCountryChange}
                                  value={selectedCountry ? selectedCountry.countryCode : ""}
                                >
                                  <option value="" disabled>
                                    Select your country
                                  </option>
                                  {countryCodes.map((country) => (
                                    <option key={country.countryCode} value={country.countryCode}>
                                      {country.name} (+{country.code})
                                    </option>
                                  ))}
                                </select>
                                {selectedCountry && (
                                  <img
                                    src={selectedCountry.flag}
                                    alt={`Flag of ${selectedCountry.name}`}
                                    className="flag-img w-6 h-4 ml-2"
                                  />
                                )}
                              </div>
                            )}
                          </div>
                          <div className="country-input-wrapper flex items-center mt-2">
                            <span className="country-code text-lg font-semibold">
                              +{selectedCountry ? selectedCountry.code : ""}
                            </span>

                            <input
                              type="tel"
                              placeholder="Enter your Phone"
                              className="tel pl-4 pr-4 py-2 border rounded-xl w-full text-sm shadow-xl"
                              onChange={(e) => setPhone(e.target.value)}
                              value={phone}
                              required
                            />
                          </div>
                        </div>


                      </div>
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
                        <option value="" className="text-sm text-muted" disabled>Our Services
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
                      className="w-full p-4 py-2 text-white uppercase header-submit-btn rounded rounded-xl shadow-xl text-xl disabled:opacity-50"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
